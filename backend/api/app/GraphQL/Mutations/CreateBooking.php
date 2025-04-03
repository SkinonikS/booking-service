<?php

namespace App\GraphQL\Mutations;

use App\Models\Booking;
use App\Models\ServiceSchedule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class CreateBooking
{
    /** @param array{serviceId: int, date: string, timeSlot: int} $args */
    public function __invoke(null $_, array $args)
    {
        $validated = $this->validate($args['input'] ?? []);

        $booking = Booking::query()->create([
            'service_schedule_id' => $validated['serviceScheduleId'],
            'user_id' => Auth::id(),
            'date' => $validated['date'],
            'time_slot' => $validated['timeSlot'],
        ]);

        return $booking;
    }

    public function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'serviceScheduleId' => ['required', 'string', 'uuid'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'timeSlot' => ['required', 'integer', 'min:0', 'max:1440'],
        ])->after(function (ValidationValidator $validator) {
            if ($validator->errors()->hasAny(['serviceScheduleId', 'date', 'timeSlot'])) {
                return;
            }

            $validated = $validator->safe();

            $serviceSchedule = ServiceSchedule::query()->find($validated['serviceScheduleId']);

            if (! $serviceSchedule) {
                $validator->errors()->add('serviceScheduleId', 'Service schedule not found.');

                return;
            }

            if ($validated['timeSlot'] < $serviceSchedule->openTime || $validated['timeSlot'] >= $serviceSchedule->closeTime) {
                $validator->errors()->add('timeSlot', "Time slot must be within service schedule hours ({$serviceSchedule->openTime} to {$serviceSchedule->closeTime}).");

                return;
            }

            if ($serviceSchedule->timeSpan > 0) {
                $validSlot = false;
                for ($slot = $serviceSchedule->openTime; $slot < $serviceSchedule->closeTime; $slot += $serviceSchedule->timeSpan) {
                    if ($validated['timeSlot'] === $slot) {
                        $validSlot = true;
                        break;
                    }
                }

                if (! $validSlot) {
                    $validator->errors()->add('timeSlot', "Time slot must be aligned with service intervals of {$serviceSchedule->timeSpan} minutes starting from {$serviceSchedule->openTime}.");

                    return;
                }
            }

            $currentBookings = Booking::where('service_schedule_id', $validated['serviceScheduleId'])
                ->whereDate('date', $validated['date'])
                ->where('time_slot', $validated['timeSlot'])
                ->whereNull('cancelled_at')
                ->count();

            if ($currentBookings >= $serviceSchedule->maxBookings) {
                $validator->errors()->add('timeSlot', 'Maximum number of bookings reached for this time slot.');
            }
        });

        return $validator->validate();
    }
}
