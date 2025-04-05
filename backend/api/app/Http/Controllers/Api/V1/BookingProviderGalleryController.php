<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BookingProviderGalleryController extends Controller
{
    use AuthorizesRequests;

    public function __invoke(Request $request, BookingProvider $bookingProvider)
    {
        $this->authorize('update', $bookingProvider);

        $galleryCount = $bookingProvider->media()
            ->where('tag', 'gallery')
            ->count();

        if ($galleryCount >= 12) {
            throw new HttpException(422, 'Booking provider already has a gallery image.');
        }

        $request->validate([
            'image' => 'required|image',
        ]);

        $media = MediaUploader::fromSource($request->file('image'))
            ->onDuplicateReplace()
            ->setAllowedAggregateTypes(['image'])
            ->useHashForFilename()
            ->toDestination('public', "booking-providers/gallery/{$bookingProvider->getKey()}")
            ->upload();

        $bookingProvider->attachMedia($media, 'gallery');

        return [
            'id' => $media->getKey(),
            'fullUrl' => $media->getUrl(),
        ];
    }
}
