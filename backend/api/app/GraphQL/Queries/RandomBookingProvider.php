<?php

namespace App\GraphQL\Queries;

use App\Models\BookingProvider as BookingProviderModels;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use InvalidArgumentException;

class RandomBookingProvider
{
    public function __invoke(null $_, array $args): EloquentBuilder
    {
        if ($args['limit'] && $args['limit'] > 10) {
            throw new InvalidArgumentException('Limit cannot be greater than 10.');
        }

        return BookingProviderModels::query()
            ->inRandomOrder()
            ->where('is_active', true)
            ->limit($args['limit'] ?? 4);
    }
}
