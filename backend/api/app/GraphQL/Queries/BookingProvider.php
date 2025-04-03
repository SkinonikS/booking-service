<?php

namespace App\GraphQL\Queries;

use App\Models\BookingProvider as BookingProviderModels;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Nuwave\Lighthouse\Execution\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class BookingProvider
{
    public function __invoke(null $_, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): EloquentBuilder
    {
        $query = BookingProviderModels::query();

        if (empty($args['categories'])) {
            return $query;
        }

        return $query->whereHas('category', function (EloquentBuilder $query) use ($args) {
            $query->whereIn('id', $args['categories']);
        });
    }
}
