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
        /**
         * @var \App\Models\ServiceSchedule
         */
        $serviceSchedule = ServiceSchedule::factory()->create();

        $date = Carbon::instance(fake()->dateTimeBetween('now', '+14 days'))->weekday(
            $serviceSchedule->weekdaySchedule->weekday_id
        );

        return [
            'service_schedule_id' => $serviceSchedule->getKey(),
            'user_id' => User::factory(),
            'date' => $date,
            'time_slot' => $serviceSchedule->open_time,
        ];
    }
}
