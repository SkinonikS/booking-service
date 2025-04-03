<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeleteBookingProvider
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $bookingProvider = BookingProvider::query()
            ->findOrFail($args['id']);

        $this->authorize('delete', $bookingProvider);

        $bookingProvider->delete();

        return $bookingProvider;
    }
}
