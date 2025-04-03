<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BookingProvider;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;

class BookingProviderGalleryController extends Controller
{
    public function __invoke(Request $request, BookingProvider $bookingProvider)
    {
        $request->validate([
            'images' => 'required|array|max:6',
            'images.*' => 'image|max:2048',
        ]);

        $images = [];
        foreach ($request->file('images') as $file) {
            $media = MediaUploader::fromSource($file)
                ->onDuplicateReplace()
                ->setAllowedAggregateTypes(['image'])
                ->useHashForFilename()
                ->toDestination('public', "booking-providers/gallery/{$bookingProvider->getKey()}")
                ->upload();

            $images[] = $media->getKey();
        }

        $bookingProvider->attachMedia($images, 'gallery');

        return response()->noContent();
    }
}
