<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider as ModelsBookingProvider;
use App\Models\Service;
use App\Models\ServiceSchedule;
use App\Models\WeekdaySchedule;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class CreateServiceScheduleMutation
{
    use Authorizable;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $validated = $this->validate($args['input']);

        $serviceSchedule = ServiceSchedule::query()->create([
            'weekday_schedule_id' => $validated['weekdayScheduleId'],
            'service_id' => $validated['serviceId'],
            'open_time' => $validated['openTime'],
            'close_time' => $validated['closeTime'],
            'max_bookings' => $validated['maxBookings'],
            'time_span' => $validated['timeSpan'],
        ]);

        return $serviceSchedule;
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'weekdayScheduleId' => ['required', 'string', 'uuid'],
            'serviceId' => ['required', 'string', 'uuid'],
            'openTime' => ['required', 'integer', 'min:0', 'max:24'],
            'closeTime' => ['required', 'integer', 'min:0', 'max:24', 'gte:openTime'],
            'maxBookings' => ['required', 'integer', 'min:1', 'max:255'],
            'timeSpan' => ['required', 'integer', 'min:1', 'max:1440'],
        ])->after(function (ValidationValidator $validator) {
            if ($validator->errors()->has(['openTime', 'closeTime', 'weekdayScheduleId', 'serviceId', 'timeSpan'])) {
                return;
            }

            $validated = $validator->safe();

            $weekdaySchedule = WeekdaySchedule::query()->find($validated['weekdayScheduleId']);

            if (! $weekdaySchedule) {
                $validator->errors()->add('weekdayScheduleId', 'Invalid weekday schedule ID');

                return;
            }

            $service = Service::query()->find($validated['serviceId']);

            if (! $service) {
                $validator->errors()->add('serviceId', 'Invalid service ID');

                return;
            }

            if ($service->booking_provider_id !== $weekdaySchedule->booking_provider_id) {
                $validator->errors()->add('weekdayScheduleId', 'Service and weekday schedule must belong to the same booking provider');
                $validator->errors()->add('serviceId', 'Service and weekday schedule must belong to the same booking provider');

                return;
            }

            $bookingProvider = ModelsBookingProvider::query()->find($weekdaySchedule->booking_provider_id);

            if (! $bookingProvider || ! $this->can('update', $bookingProvider)) {
                $validator->errors()->add('weekdayScheduleId', 'Invalid booking provider ID');
                $validator->errors()->add('serviceId', 'Invalid booking provider ID');

                return;
            }

            $openTime = $validated['openTime'];
            $closeTime = $validated['closeTime'];
            $timeSpan = $validated['timeSpan'];

            if ($openTime < $weekdaySchedule->openTime || $openTime > $weekdaySchedule->closeTime) {
                $validator->errors()->add('openTime', 'Open time must be within weekdaySchedule time range');
                $validator->errors()->add('closeTime', 'Close time must be within weekdaySchedule time range');

                return;
            }

            if ($closeTime <= $openTime) {
                $validator->errors()->add('openTime', 'Close time must be after open time');
                $validator->errors()->add('closeTime', 'Close time must be after open time');

                return;
            }

            if ($timeSpan > ($closeTime - $openTime)) {
                $validator->errors()->add('timeSpan', 'Time span cannot be greater than the available time between open and close times');

                return;
            }
        });

        return $validator->validate();
    }
}
