<?php

namespace App\Shared\Cognito;

use App\Shared\Cognito\AccessTokenValidators\AccessToken;

trait HasCognitoTrait
{
    public ?AccessToken $cognitoAccessToken = null;
}
