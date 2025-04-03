<?php

namespace App\GraphQL\Mutations;

use App\Models\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeleteServiceMutation
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $service = Service::query()
            ->with(['bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('delete', $service->bookingProvider);

        $service->delete();

        return $service;
    }
}
