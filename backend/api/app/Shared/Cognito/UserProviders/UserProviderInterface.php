<?php

namespace App\Shared\Cognito\UserProviders;

use \Illuminate\Contracts\Auth\Authenticatable;

interface UserProviderInterface
{
    public function retrieveByCognitoId(string $cognitoId): ?Authenticatable;

    public function create(array $attributes): Authenticatable;
}
