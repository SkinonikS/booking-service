<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

class UpdateBookingProvider
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $bookingProvider = BookingProvider::query()
            ->findOrFail($args['id']);

        $this->authorize('update', $bookingProvider);

        $validated = $this->validate($args['input'] ?? []);

        $bookingProvider->update([
            'is_active' => $validated['isActive'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'website' => $validated['website'],
            'about_us' => $validated['aboutUs'],
        ]);

        return $bookingProvider;
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input, [
            'isActive' => ['required', 'boolean'],
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'email' => ['required', 'email', 'max:64'],
            'phone' => ['required', 'string', 'min:10', 'max:15'],
            'address' => ['required', 'string', 'min:4', 'max:64'],
            'website' => ['nullable', 'string', 'url'],
            'aboutUs' => ['required', 'string', 'min:4', 'max:2048'],
        ]);

        return $validator->validate();
    }
}
