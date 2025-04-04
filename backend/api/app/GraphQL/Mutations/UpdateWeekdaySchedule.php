<?php

namespace App\GraphQL\Mutations;

use App\Models\ServiceSchedule;
use App\Models\WeekdaySchedule;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class UpdateWeekdaySchedule
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $weekdaySchedule = WeekdaySchedule::query()
            ->with(['bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('update', $weekdaySchedule->bookingProvider);

        $validated = $this->validate($weekdaySchedule, $args['input']);

        $weekdaySchedule->update([
            'open_time' => $validated['openTime'],
            'close_time' => $validated['closeTime'],
            'is_active' => $validated['isActive'],
        ]);

        return $weekdaySchedule;
    }

    protected function validate(WeekdaySchedule $weekdaySchedule, array $input): array
    {
        $validator = Validator::make($input, [
            'openTime' => ['required', 'integer', 'min:0', 'max:1440'],
            'closeTime' => ['required', 'integer', 'min:0', 'max:1440', 'gte:openTime'],
            'isActive' => ['required', 'boolean'],
        ]);

        $validator->after(function (ValidationValidator $validator) use ($weekdaySchedule) {
            if ($validator->errors()->hasAny(['openTime', 'closeTime'])) {
                return;
            }

            $validated = $validator->safe();

            $hasOutOfBoundsSchedules = ServiceSchedule::query()
                ->where('is_active', true)
                ->where('weekday_schedule_id', $weekdaySchedule->getKey())
                ->where(function ($query) use ($validated) {
                    $query->where('open_time', '<', $validated['openTime'])
                        ->orWhere('close_time', '>', $validated['closeTime']);
                })
                ->exists();

            if ($hasOutOfBoundsSchedules) {
                $validator->errors()->add('openTime', 'All service schedules must be within the bounds of the weekday schedule times.');
                $validator->errors()->add('closeTime', 'All service schedules must be within the bounds of the weekday schedule times.');
            }
        });

        return $validator->validate();
    }
}
