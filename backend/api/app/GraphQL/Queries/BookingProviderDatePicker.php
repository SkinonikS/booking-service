<?php

namespace App\GraphQL\Queries;

use App\Models\Booking;
use App\Models\Service;
use App\Models\WeekdaySchedule;
use Illuminate\Support\Facades\DB;

class BookingProviderDatePicker
{
    public function __invoke(null $_, array $args)
    {
        $service = Service::query()->findOrFail($args['serviceId']);

        /**
         * @var \Carbon\CarbonImmutable
         */
        $date = $args['date'];

        $weekdaySchedule = WeekdaySchedule::query()
            ->where('booking_provider_id', $service->booking_provider_id)
            ->where('weekday_id', $date->dayOfWeek)
            ->first();

        $serviceSchedules = $weekdaySchedule->serviceSchedules()
            ->where('service_id', $service->getKey())
            ->get();

        $bookings = Booking::query()
            ->whereHas('serviceSchedule', function ($query) use ($serviceSchedules) {
                $query->whereIn('id', $serviceSchedules->pluck('id'));
            })
            ->whereNull('cancelled_at')
            ->whereDate('date', $date->toDateString())
            ->addSelect('service_schedule_id', 'time_slot', DB::raw('COUNT(*) as current_bookings'))
            ->groupBy('service_schedule_id', 'time_slot')
            ->get()
            ->groupBy('service_schedule_id');

        $results = [];
        foreach ($serviceSchedules as $serviceSchedule) {
            $bookedTimeSlots = $bookings->get($serviceSchedule->getKey(), fn () => collect());

            $results[] = [
                'serviceSchedule' => $serviceSchedule,
                'bookedTimeSlots' => $bookedTimeSlots->map(fn ($booking) => [
                    'timeSlot' => $booking->time_slot,
                    'currentBookings' => $booking->current_bookings,
                ]),
            ];
        }

        return $results;
    }
}
