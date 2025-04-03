<?php

namespace App\GraphQL\Mutations;

use App\Models\ServiceSchedule;
use App\Models\WeekdaySchedule;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class UpdateWeekdayScheduleMutation
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $weekdaySchedule = WeekdaySchedule::query()
            ->with(['bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('update', $weekdaySchedule->bookingProvider);

        $weekdaySchedule->update(
            $this->validate($weekdaySchedule, $args)
        );

        return $weekdaySchedule;
    }

    protected function validate(WeekdaySchedule $weekdaySchedule, array $input): array
    {
        $validator = Validator::make($input['input'], [
            'openTime' => 'required|integer|min:0',
            'closeTime' => 'required|integer|min:0|gte:openTime',
        ]);

        $validator->after(function (ValidationValidator $validator) use ($weekdaySchedule) {
            if ($validator->errors()->has('openTime') || $validator->errors()->has('closeTime')) {
                return;
            }

            $validated = $validator->safe();

            $hasOutOfBoundsSchedules = ServiceSchedule::query()
                ->where('is_active', true)
                ->where('weekday_schedule_id', $weekdaySchedule->getKey())
                ->where('openTime', '<', $validated['openTime'])
                ->orWhere('closeTime', '>', $validated['closeTime'])
                ->exists();

            if ($hasOutOfBoundsSchedules) {
                $validator->errors()->add('openTime', 'All service schedules must be within the bounds of the weekday schedule times.');
                $validator->errors()->add('closeTime', 'All service schedules must be within the bounds of the weekday schedule times.');
            }
        });

        return $validator->validate();
    }
}
