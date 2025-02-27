<?php

namespace App\Shared\Cognito\JwkSetProviders;

use Illuminate\Support\Facades\Http;
use Jose\Component\Core\JWKSet;
use Illuminate\Http\Client\Factory as HttpClientFactory;

class HttpJwkSetProvider implements JwkSetProviderInterface
{
    public function __construct(
        protected string $baseUrl,
        protected HttpClientFactory $httpClientFactory,
    ) {
        //
    }

    public function retrieve(): JWKSet
    {
        $response = $this->httpClientFactory->get(
            $this->buildJwksUrl()
        );

        if ($response->failed()) {
            throw new FailedToRetrieveJwkSetException('Failed to retrieve JWKSet');
        }

        return JWKSet::createFromKeyData(
            $response->json()
        );
    }

    protected function buildJwksUrl(): string
    {
        return "{$this->baseUrl}/.well-known/jwks.json";
    }
}
