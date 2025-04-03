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

        return Service::query()
            ->create($this->validate($args));
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input['input'], [
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'description' => ['nullable', 'string', 'max:2048'],
            'bookingProviderId' => ['required', 'string', 'uuid'],
        ])->after(function ($validator) {
            if ($validator->errors()->has('bookingProviderId')) {
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
