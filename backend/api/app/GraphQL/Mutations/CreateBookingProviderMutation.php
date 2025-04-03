<?php

namespace App\GraphQL\Mutations;

use App\Models\BookingProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

class CreateBookingProviderMutation
{
    use AuthorizesRequests;

    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $this->authorize('update', BookingProvider::class);

        $validated = $this->validate($args['input']);

        return BookingProvider::query()->create([
            'isActive' => $validated['isActive'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'website' => $validated['website'],
            'about_us' => $validated['aboutUs'],
            'category_id' => $validated['categoryId'],
        ]);
    }

    protected function validate(array $input): array
    {
        $validator = Validator::make($input['input'], [
            'isActive' => ['required', 'boolean'],
            'name' => ['required', 'string', 'min:4', 'max:32'],
            'email' => ['required', 'email', 'max:64'],
            'phone' => ['required', 'string', 'min:10', 'max:15'],
            'address' => ['required', 'string', 'min:4', 'max:64'],
            'website' => ['required', 'string', 'min:4', 'max:32'],
            'aboutUs' => ['required', 'string', 'min:4', 'max:2048'],
            'categoryId' => ['required', 'string', 'uuid', 'exists:App\\Models\\Category,id'],
        ]);

        return $validator->validate();
    }
}
