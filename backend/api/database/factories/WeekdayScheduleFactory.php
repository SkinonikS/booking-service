<?php

namespace Database\Factories;

use App\Models\BookingProvider;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeekdaySchedule>
 */
class WeekdayScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_provider_id' => BookingProvider::factory(),
            'weekday_id' => $this->faker->numberBetween(0, 6),
            'open_time' => $this->faker->numberBetween(0, 1440),
            'close_time' => function (array $attributes) {
                return $this->faker->numberBetween($attributes['open_time'], 1440);
            },
            'is_active' => $this->faker->boolean(),
        ];
    }
}
