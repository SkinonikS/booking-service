<?php

namespace App\Shared\Cognito\AccessTokenValidators;

readonly class AccessToken
{
    public function __construct(
        public string $sub,
        public string $userName,
    ) {
        //
    }
}
