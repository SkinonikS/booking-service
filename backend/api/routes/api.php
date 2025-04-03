<?php

use App\Http\Controllers\Api\V1\BookingProviderCoverController;
use App\Http\Controllers\Api\V1\BookingProviderGalleryController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::post('/booking-providers/{booking_provider}/cover-image/upload', BookingProviderCoverController::class)->middleware('auth:cognito');
    Route::post('/booking-providers/{booking_provider}/gallery-images/upload', BookingProviderGalleryController::class)->middleware('auth:cognito');
});
