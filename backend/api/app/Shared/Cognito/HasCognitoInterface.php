<?php

namespace App\Shared\Cognito;

use App\Shared\Cognito\AccessTokenValidators\AccessToken;

interface HasCognitoInterface
{
    public ?AccessToken $cognitoAccessToken { get; set; }
}
