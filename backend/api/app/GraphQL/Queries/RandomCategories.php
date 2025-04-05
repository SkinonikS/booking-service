<?php

namespace App\GraphQL\Queries;

use App\Models\Category;
use InvalidArgumentException;

class RandomCategories
{
    public function __invoke(null $_, array $args)
    {
        if ($args['limit'] && $args['limit'] > 10) {
            throw new InvalidArgumentException('Limit cannot be greater than 10.');
        }

        return Category::query()
            ->inRandomOrder()
            ->take($args['limit'] ?? 4);
    }
}
