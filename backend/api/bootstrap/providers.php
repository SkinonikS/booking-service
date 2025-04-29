<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Shared\Cognito\CognitoServiceProvider::class,
    App\Shared\AWS\CognitoIdentityProviderClient\CognitoIdentityProviderClientServiceProvider::class,
];
