<?php

// use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::get('/me/profile', function () {
        return Response::json([
            'data' => Auth::user(),
        ]);
    });
});
