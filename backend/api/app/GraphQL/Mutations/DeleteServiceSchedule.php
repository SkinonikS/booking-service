<?php

namespace App\GraphQL\Mutations;

use App\Models\ServiceSchedule;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeleteServiceSchedule
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $serviceSchedule = ServiceSchedule::query()
            ->with(['weekdaySchedule.bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('update', $serviceSchedule->weekdaySchedule->bookingProvider);

        $serviceSchedule->delete();

        return $serviceSchedule;
    }
}
