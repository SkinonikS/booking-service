<?php

namespace Database\Factories;

use App\Models\ServiceSchedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $serviceSchedule = ServiceSchedule::query()
            ->with(['weekdaySchedule'])
            ->inRandomOrder()
            ->first();

        $randomDate = Carbon::instance(fake()->dateTimeBetween('now', '+90 days'))->weekday(
            $serviceSchedule->weekdaySchedule->weekday->value
        );

        return [
            'service_schedule_id' => $serviceSchedule->getKey(),
            'user_id' => User::query()->inRandomOrder()->first()->getKey(),
            'date' => $randomDate,
            'time_slot' => fake()->numberBetween(1, 1440),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
