<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\Service;
use App\Models\ServiceSchedule;
use App\Models\User;
use Carbon\Carbon;
use Carbon\WeekDay;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create a main test user
        $user = User::query()
            ->create([
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'cognito_id' => 'google_114298490895200972234',
                'is_verified' => true,
            ]);

        // Create a few more users for variety
        $additionalUsers = Collection::times(3, function ($index) {
            return User::query()->create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'cognito_id' => 'google_'.Str::random(21),
                'is_verified' => true,
            ]);
        });

        // All users including the main one
        $allUsers = collect([$user])->merge($additionalUsers);

        // Create categories
        $categories = new Collection(['Travel', 'Health', 'Beauty', 'Fitness', 'Entertainment', 'Food', 'Education', 'Other'])
            ->map(function ($categoryName) {
                return Category::query()
                    ->create([
                        'name' => $categoryName,
                        'description' => fake()->paragraph(2),
                    ]);
            });

        // Create 3-5 booking providers per category
        foreach ($categories as $category) {
            $providersCount = rand(3, 5);

            for ($i = 0; $i < $providersCount; $i++) {
                // Choose a random user as the owner
                $owner = $allUsers->random();

                // Create booking provider
                $bookingProvider = BookingProvider::query()
                    ->create([
                        'user_id' => $owner->getKey(),
                        'category_id' => $category->getKey(),
                        'name' => fake()->company(),
                        'is_active' => true,
                        'email' => fake()->companyEmail(),
                        'phone' => fake()->phoneNumber(),
                        'address' => fake()->address(),
                        'website' => fake()->url(),
                        'about_us' => fake()->paragraphs(3, true),
                    ]);

                // Create weekday schedules
                $weekdaySchedules = [];
                foreach (WeekDay::cases() as $weekday) {
                    // Make some days inactive for variety
                    $isActive = rand(0, 10) > 2; // 80% chance of being active

                    // Random business hours (between 7-10 AM opening, 5-9 PM closing)
                    $openTime = rand(420, 600); // 7-10 AM in minutes
                    $closeTime = rand(1020, 1260); // 5-9 PM in minutes

                    $weekdaySchedule = $bookingProvider
                        ->weekdaySchedules()
                        ->create([
                            'weekday_id' => $weekday->value,
                            'is_active' => $isActive,
                            'open_time' => $openTime,
                            'close_time' => $closeTime,
                        ]);

                    $weekdaySchedules[] = $weekdaySchedule;
                }

                // Create 2-4 services for this provider
                $servicesCount = rand(2, 4);
                for ($j = 0; $j < $servicesCount; $j++) {
                    $service = Service::query()
                        ->create([
                            'name' => fake()->words(rand(2, 4), true),
                            'booking_provider_id' => $bookingProvider->getKey(),
                            'description' => fake()->paragraph(),
                        ]);

                    // Create service schedules for each active weekday
                    foreach ($weekdaySchedules as $weekdaySchedule) {
                        // Only create service schedules for active weekday schedules
                        if ($weekdaySchedule->is_active) {
                            // Service hours should be within provider hours
                            $serviceOpenTime = $weekdaySchedule->open_time + rand(0, 120); // 0-2 hours after provider opens
                            $serviceCloseTime = $weekdaySchedule->close_time - rand(0, 120); // 0-2 hours before provider closes

                            // Ensure valid times (open < close)
                            if ($serviceOpenTime >= $serviceCloseTime) {
                                $serviceCloseTime = $serviceOpenTime + 240; // At least 4 hours open
                                if ($serviceCloseTime > $weekdaySchedule->close_time) {
                                    $serviceCloseTime = $weekdaySchedule->close_time;
                                }
                            }

                            $serviceSchedule = ServiceSchedule::query()
                                ->create([
                                    'is_active' => rand(0, 10) > 1, // 90% chance of being active
                                    'service_id' => $service->getKey(),
                                    'weekday_schedule_id' => $weekdaySchedule->getKey(),
                                    'max_bookings' => rand(1, 8), // Random capacity
                                    'time_span' => [15, 30, 45, 60][rand(0, 3)], // Common time spans
                                    'open_time' => $serviceOpenTime,
                                    'close_time' => $serviceCloseTime,
                                ]);

                            // Create some bookings for this service schedule
                            $this->createBookingsForServiceSchedule($serviceSchedule, $allUsers);
                        }
                    }
                }
            }
        }
    }

    private function createBookingsForServiceSchedule($serviceSchedule, $users)
    {
        // Determine number of bookings to create (0-5)
        $bookingsCount = rand(0, 5);

        // Get next 14 days for bookings
        $dates = collect();
        $today = Carbon::today();

        for ($i = 0; $i < 14; $i++) {
            $date = $today->copy()->addDays($i);
            // Only include dates matching the weekday of this schedule
            if ($date->dayOfWeekIso == $serviceSchedule->weekdaySchedule->weekday_id) {
                $dates->push($date);
            }
        }

        // Create bookings if we have valid dates
        if ($dates->isNotEmpty()) {
            // Track user IDs that have been used for each date
            $usedUsers = [];

            for ($i = 0; $i < $bookingsCount; $i++) {
                $randomDate = $dates->random();
                $dateString = $randomDate->format('Y-m-d');

                // Initialize tracking array for this date if it doesn't exist
                if (! isset($usedUsers[$dateString])) {
                    $usedUsers[$dateString] = [];
                }

                // Get unused users for this date
                $availableUsers = $users->whereNotIn('id', $usedUsers[$dateString])->values();

                // If no more available users for this date, skip
                if ($availableUsers->isEmpty()) {
                    continue;
                }

                // Get a random unused user
                $randomUser = $availableUsers->random();

                // Add this user to the used list for this date
                $usedUsers[$dateString][] = $randomUser->id;

                // Calculate available time slots
                $openMinutes = $serviceSchedule->open_time;
                $closeMinutes = $serviceSchedule->close_time;
                $timeSpan = $serviceSchedule->time_span;

                $availableSlots = [];
                for ($time = $openMinutes; $time < $closeMinutes; $time += $timeSpan) {
                    $availableSlots[] = $time;
                }

                if (count($availableSlots) > 0) {
                    $timeSlot = $availableSlots[array_rand($availableSlots)];

                    Booking::create([
                        'user_id' => $randomUser->id,
                        'service_schedule_id' => $serviceSchedule->id,
                        'date' => $dateString,
                        'time_slot' => $timeSlot,
                        'cancelled_at' => rand(0, 10) < 2 ? Carbon::now() : null,
                        'cancellation_reason' => rand(0, 10) < 2 ? fake()->sentence() : null,
                    ]);
                }
            }
        }
    }
}
