<?php

namespace App\GraphQL\Resolvers;

use App\Models\BookingProvider as BookingProviderModel;
use App\Models\Media;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class BookingProvider
{
    public function __invoke(null $_, array $args): EloquentBuilder
    {
        $query = BookingProviderModel::query();

        if (empty($args['categories'])) {
            return $query;
        }

        return $query->whereHas('category', function (EloquentBuilder $query) use ($args) {
            $query->whereIn('id', $args['categories']);
        });
    }

    public function galleryImages(BookingProviderModel $root): EloquentCollection
    {
        return $root->getMedia(['gallery']);
    }

    public function coverImage(BookingProviderModel $root): ?Media
    {
        return $root->getMedia(['cover'])->first();
    }
}
