<?php

namespace App\Shared\Cognito\JwkSetProviders;

use Jose\Component\Core\JWKSet;

interface JwkSetProviderInterface
{
    public function retrieve(): JWKSet;
}
