<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BookingProviderCoverController extends Controller
{
    use AuthorizesRequests;

    public function __invoke(Request $request, BookingProvider $bookingProvider)
    {
        $this->authorize('update', $bookingProvider);

        $coversCount = $bookingProvider->media()
            ->where('tag', 'cover')
            ->count();

        if ($coversCount >= 1) {
            throw new HttpException(422, 'Booking provider already has a cover image.');
        }

        $request->validate([
            'image' => 'required|image',
        ]);

        $media = MediaUploader::fromSource($request->file('image'))
            ->onDuplicateReplace()
            ->setAllowedAggregateTypes(['image'])
            ->useHashForFilename()
            ->toDestination('public', 'booking-providers/covers')
            ->upload();

        $bookingProvider->attachMedia($media, 'cover');

        return [
            'id' => $media->getKey(),
            'fullUrl' => $media->getUrl(),
        ];
    }
}
