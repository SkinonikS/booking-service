<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\WeekdaySchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceSchedule>
 */
class ServiceScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'service_id' => Service::factory(),
            'weekday_schedule_id' => WeekdaySchedule::factory(),
            'open_time' => $this->faker->numberBetween(0, 1440),
            'close_time' => function (array $attributes) {
                return $this->faker->numberBetween($attributes['open_time'], 1440);
            },
            'max_bookings' => $this->faker->numberBetween(1, 10),
            'time_span' => $this->faker->numberBetween(1, 60),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
