<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeleteBookingProviderCoverImage
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $bookingProvider = BookingProvider::query()->findOrFail($args['bookingProviderId']);

        $this->authorize('delete', $bookingProvider);

        $coverImage = $bookingProvider->media()
            ->where('tag', 'cover')
            ->where('id', $args['id'])
            ->first();

        if ($coverImage) {
            $bookingProvider->detachMedia($coverImage);
        }

        return $coverImage;
    }
}
