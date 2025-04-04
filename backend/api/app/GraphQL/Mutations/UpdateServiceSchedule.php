<?php

namespace App\GraphQL\Mutations;

use App\Models\ServiceSchedule;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class UpdateServiceSchedule
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $serviceSchedule = ServiceSchedule::query()
            ->with(['weekdaySchedule.bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('update', $serviceSchedule->weekdaySchedule->bookingProvider);

        $validated = $this->validate($serviceSchedule, $args['input']);

        $serviceSchedule->update([
            'open_time' => $validated['openTime'],
            'close_time' => $validated['closeTime'],
            'max_bookings' => $validated['maxBookings'],
            'time_span' => $validated['timeSpan'],
        ]);

        return $serviceSchedule;
    }

    protected function validate(ServiceSchedule $serviceSchedule, array $input): array
    {
        $validator = Validator::make($input, [
            'openTime' => ['required', 'integer', 'min:0', 'max:1440'],
            'closeTime' => ['required', 'integer', 'min:0', 'max:1440', 'gte:openTime'],
            'maxBookings' => ['required', 'integer', 'min:1', 'max:255'],
            'timeSpan' => ['required', 'integer', 'min:1', 'max:1440'],
        ])->after(function (ValidationValidator $validator) use ($serviceSchedule) {
            if ($validator->errors()->hasAny(['openTime', 'closeTime', 'timeSpan'])) {
                return;
            }

            $validated = $validator->safe();

            $openTime = $validated['openTime'];
            $closeTime = $validated['closeTime'];
            $timeSpan = $validated['timeSpan'];

            $weekdaySchedule = $serviceSchedule->weekdaySchedule;

            if ($openTime < $weekdaySchedule->open_time || $openTime > $weekdaySchedule->close_time) {
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

        return $validator->validated();
    }
}
