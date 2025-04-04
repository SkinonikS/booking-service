<?php

namespace App\GraphQL\Mutations;

use App\Models\Booking;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CancelBooking
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $booking = Booking::query()
            ->with(['serviceSchedule.weekdaySchedule.bookingProvider'])
            ->findOrFail($args['id']);

        $validated = $this->validate($args['input'] ?? []);

        $bookingProvider = $booking
            ->serviceSchedule
            ->weekdaySchedule
            ->bookingProvider;

        /**
         * @var \App\Models\User
         */
        $user = Auth::user();

        if (! $user->can('cancel', $booking) || ! $user->can('update', $bookingProvider)) {
            throw new NotFoundHttpException;
        }

        if ($booking->canceled_at) {
            throw new BadRequestHttpException('Booking already canceled.');
        }

        $booking->update([
            'cancelled_at' => now(),
            'cancellation_reason' => $validated['cancellationReason'],
        ]);

        return $booking;
    }

    public function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'cancellationReason' => ['required', 'string', 'min:4', 'max:32'],
        ]);

        return $validator->validate();
    }
}
