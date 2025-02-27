<?php

namespace App\Shared\Cognito\UserInfoProviders;

interface UserInfoProviderInterface
{
    public function retrieve(string $accessToken): UserInfo;
}
