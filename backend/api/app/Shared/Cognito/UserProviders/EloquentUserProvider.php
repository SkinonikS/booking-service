<?php

namespace App\Shared\Cognito\UserProviders;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class EloquentUserProvider implements UserProviderInterface
{
    public function retrieveByCognitoId(string $cognitoId): ?Authenticatable
    {
        return User::query()
            ->where('cognito_id', $cognitoId)
            ->first();
    }

    public function create(array $attributes): Authenticatable
    {
        return User::query()
            ->create($attributes);
    }
}
