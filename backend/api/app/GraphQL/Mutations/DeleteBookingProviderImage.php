<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeleteBookingProviderImage
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        //
    }
}
