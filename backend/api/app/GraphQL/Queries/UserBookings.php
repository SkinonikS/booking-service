<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class UserBookings
{
    public function __invoke(EloquentBuilder $query)
    {
        return $query->orderByDesc('created_at');
    }
}
