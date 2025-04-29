<?php

namespace App\GraphQL\Queries;

use App\Models\BookingProvider as BookingProviderModels;
use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Nuwave\Lighthouse\Execution\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class BookingProviders
{
    public function __invoke(null $_, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): EloquentBuilder
    {
        $query = BookingProviderModels::query();

        if (! empty($args['categories'])) {
            $query->whereHas('category', function (EloquentBuilder $query) use ($args) {
                $query->whereIn('id', $args['categories']);
            });
        }

        if (! empty($args['address'])) {
            $query->where('address', 'LIKE', '%'.$args['address'].'%');
        }

        if (! empty($args['date'])) {
            $date = $args['date'] instanceof DateTimeInterface
                ? $args['date']
                : Carbon::createFromFormat('Y-m-d', $args['date']);

            $weekday = $date->dayOfWeek;

            $query->whereHas('weekdaySchedules', function (EloquentBuilder $query) use ($weekday, $date) {
                $query
                    ->where('weekday_id', $weekday)
                    ->where('is_active', true)
                    ->whereHas('serviceSchedules', function (EloquentBuilder $query) use ($date) {
                        $query
                            ->where('is_active', true)

                            ->whereRaw('
                                    (SELECT COUNT(*)
                                     FROM bookings
                                     WHERE bookings.service_schedule_id = service_schedules.id
                                     AND bookings.date = ?
                                     AND bookings.cancelled_at IS NULL
                                     GROUP BY bookings.time_slot) < service_schedules.max_bookings
                                     OR NOT EXISTS (
                                        SELECT 1
                                        FROM bookings
                                        WHERE bookings.service_schedule_id = service_schedules.id
                                        AND bookings.date = ?
                                     )
                                ', [$date->format('Y-m-d'), $date->format('Y-m-d')]);
                    });
            });
        }

        return $query->where('is_active', true);
    }
}
