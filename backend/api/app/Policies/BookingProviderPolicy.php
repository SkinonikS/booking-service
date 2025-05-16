<?php

namespace App\Policies;

use App\Models\BookingProvider;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookingProviderPolicy
{
    public function create(?User $user)
    {
        if (! $user) {
            return Response::deny('You must be logged in to create a booking provider.');
        }

        if (! $user->is_verified) {
            return Response::deny('You must verify your account to create a booking provider.');
        }

        return Response::allow();
    }

    public function view(?User $user, BookingProvider $bookingProvider)
    {
        if (! $user) {
            return Response::deny('You must be logged in to view the booking provider.');
        }

        if (! $user->is_verified) {
            return Response::deny('You must verify your account to view the booking provider.');
        }

        if ($bookingProvider->user_id === $user->getKey()) {
            return Response::allow();
        }

        return Response::denyAsNotFound();
    }

    public function update(?User $user, BookingProvider $bookingProvider)
    {
        if (! $user) {
            return Response::deny('You must be logged in to update the booking provider.');
        }

        if (! $user->is_verified) {
            return Response::deny('You must verify your account to view the booking provider.');
        }

        if ($bookingProvider->user_id === $user->getKey()) {
            return Response::allow();
        }

        return Response::denyAsNotFound();
    }

    public function delete(?User $user, BookingProvider $bookingProvider)
    {
        if (! $user) {
            return Response::deny('You must be logged in to delete the booking provider.');
        }

        if (! $user->is_verified) {
            return Response::deny('You must verify your account to view the booking provider.');
        }

        if ($bookingProvider->user_id === $user->getKey()) {
            return Response::allow();
        }

        return Response::denyAsNotFound();
    }
}
