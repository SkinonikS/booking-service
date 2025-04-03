<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BookingProvider;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;

class BookingProviderCoverController extends Controller
{
    public function __invoke(Request $request, BookingProvider $bookingProvider)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $media = MediaUploader::fromSource($request->file('image'))
            ->onDuplicateReplace()
            ->setAllowedAggregateTypes(['image'])
            ->useHashForFilename()
            ->toDestination('public', 'booking-providers/covers')
            ->upload();

        $bookingProvider->attachMedia($media, 'cover');

        return response()->noContent();
    }
}
