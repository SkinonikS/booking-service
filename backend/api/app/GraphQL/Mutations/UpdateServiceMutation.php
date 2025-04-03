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

        $this->authorize('update', $service);

        $validated = $this->validate($args['input'] ?? []);

        $service->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return $service;
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'description' => ['nullable', 'string', 'max:2048'],
        ]);

        return $validator->validate();
    }
}
