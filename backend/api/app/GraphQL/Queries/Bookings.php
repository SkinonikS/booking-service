<?php

namespace App\GraphQL\Queries;

use App\Models\Booking;
use App\Models\BookingProvider;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Bookings
{
    use AuthorizesRequests;

    public function __invoke(null $_, array $args)
    {
        $bookingProvider = BookingProvider::query()
            ->where('id', $args['bookingProviderId'])
            ->firstOrFail();

        $this->authorize('view', $bookingProvider);

        return Booking::query()
            ->whereHas('serviceSchedule.weekdaySchedule', function (Builder $query) use ($args) {
                $query->where('booking_provider_id', $args['bookingProviderId']);
            })
            ->orderBy('date')
            ->orderBy('time_slot')
            ->get();
    }
}
