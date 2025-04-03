<?php

namespace App\GraphQL\Mutations;

use App\Models\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

class UpdateServiceMutation
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $service = Service::query()
            ->with(['bookingProvider'])
            ->findOrFail($args['id']);

        $this->authorize('update', $service->bookingProvider);

        return $service
            ->update($this->validate($args));
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input['input'], [
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'description' => ['nullable', 'string', 'max:2048'],
        ]);

        return $validator->validate();
    }
}
