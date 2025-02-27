<?php

namespace App\Shared\Cognito\AccessTokenValidators;

use Jose\Component\Core\JWKSet;

interface AccessTokenValidatorInterface
{
    public function validate(string $accessToken, JWKSet $jwkSet): false|AccessToken;
}
