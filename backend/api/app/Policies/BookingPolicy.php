<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookingPolicy
{
    public function cancel(?User $user, Booking $booking)
    {
        if (! $user || $user->getKey() !== $booking->user_id) {
            return Response::denyAsNotFound();
        }

        return Response::allow();
    }
}
