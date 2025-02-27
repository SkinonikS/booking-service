<?php

namespace App\Shared\Cognito\UserInfoProviders;

readonly class UserInfo
{
    public function __construct(
        public string $sub,
        public string $name,
        public string $email,
    ) {
        //
    }
}
