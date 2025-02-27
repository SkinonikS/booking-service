<?php

namespace App\Shared\Cognito\JwkSetProviders;

use Carbon\CarbonInterval;
use DateInterval;
use Illuminate\Contracts\Cache\Repository;
use Jose\Component\Core\JWKSet;

class CachedJwkSetProvider implements JwkSetProviderInterface
{
    public function __construct(
        protected JwkSetProviderInterface $jwkSetProvider,
        protected Repository $cache,
        protected string $cacheKey = 'cognito.jwks',
        protected DateInterval|int $expiresIn = new CarbonInterval(days: 1),
    ) {
        //
    }

    public function retrieve(): JWKSet
    {
        return $this->cache->remember($this->cacheKey, $this->expiresIn, function () {
            return $this->jwkSetProvider->retrieve();
        });
    }
}
