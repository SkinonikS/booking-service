<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider;
use App\Models\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CreateServiceMutation
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $this->authorize('create', Service::class);

        $validated = $this->validate($args['input'] ?? []);

        return Service::query()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'booking_provider_id' => $validated['bookingProviderId'],
        ]);
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'description' => ['nullable', 'string', 'max:2048'],
            'bookingProviderId' => ['required', 'string', 'uuid'],
        ])->after(function ($validator) {
            if ($validator->errors()->hasAny(['bookingProviderId'])) {
                return;
            }

            $validated = $validator->safe();

            $bookingProvider = BookingProvider::query()
                ->find($validated['bookingProviderId']);

            if (! $bookingProvider || $bookingProvider->user_id !== Auth::id()) {
                $validator->errors()->add('bookingProviderId', 'The booking provider does not exist.');
            }
        });

        return $validator->validate();
    }
}
