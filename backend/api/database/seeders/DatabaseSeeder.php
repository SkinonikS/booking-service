<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\BookingProvider;
use App\Models\Category;
use App\Models\Service;
use App\Models\ServiceSchedule;
use App\Models\User;
use Carbon\WeekDay;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()
            ->create([
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'cognito_id' => 'google_114298490895200972234',
            ]);

        $category = Category::query()
            ->create([
                'name' => 'Category 1',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
            ]);

        $bookingProvider = BookingProvider::query()
            ->create([
                'user_id' => $user->getKey(),
                'category_id' => $category->getKey(),
                'name' => 'Provider 1',
                'email' => 'info@example.com',
                'phone' => '+38123456789',
                'address' => '1234 Example St, Example City, EX 12345',
                'about_us' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatem magni alias at suscipit nam ex quisquam, labore, neque perferendis, quidem natus odit minus praesentium amet et eligendi voluptas in? Voluptas quasi totam sunt ut praesentium, architecto doloribus temporibus consequatur quia? Ipsum optio odio praesentium voluptatibus iusto. Recusandae mollitia nihil accusantium ad, eos temporibus iure dolorem dignissimos laboriosam natus tempora asperiores laudantium incidunt cum aut nesciunt veritatis accusamus nisi modi minima, amet repellendus similique itaque? Asperiores alias ut quod in assumenda dolorum laboriosam explicabo quisquam autem ipsam iusto nam, animi deleniti, velit consectetur ipsum aliquam incidunt. Veritatis debitis beatae delectus!',
            ]);

        foreach (WeekDay::cases() as $weekday) {
            $bookingProvider
                ->weekdaySchedules()
                ->create([
                    'weekday_id' => $weekday->value,
                    'is_active' => true,
                    'open_time' => 420, // 07:00
                    'close_time' => 1020, // 17:00
                ]);
        }

        $service = Service::query()
            ->create([
                'name' => 'Service 1',
                'booking_provider_id' => $bookingProvider->getKey(),
                'description' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, facilis!',
            ]);

        foreach (WeekDay::cases() as $weekday) {
            $weekdaySchedule = $bookingProvider
                ->weekdaySchedules()
                ->where('weekday_id', $weekday->value)
                ->first();

            ServiceSchedule::query()
                ->create([
                    'is_active' => true,
                    'service_id' => $service->getKey(),
                    'weekday_schedule_id' => $weekdaySchedule->getKey(),
                    'max_bookings' => 4,
                    'time_span' => 30, // 30 minutes
                    'open_time' => 480, // 08:00
                    'close_time' => 960, // 16:00
                ]);
        }
    }
}
