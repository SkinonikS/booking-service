<?php

use App\Shared\Cognito\JwkSetProviders\HttpJwkSetProvider;
use Illuminate\Http\Client\Factory as HttpClientFactory;
use Jose\Component\Core\JWKSet;
use Illuminate\Http\Client\Request;

it('retrieves JWKSet from the HTTP endpoint', function () {
    $baseUrl = 'http://example.com';

    $httpClient = new HttpClientFactory();
    $httpClient->fake([
        "{$baseUrl}/.well-known/jwks.json" => $httpClient->response(['keys' => []], 200),
    ]);

    $jwkSetProvider = new HttpJwkSetProvider(
        $baseUrl,
        $httpClient,
    );

    $jwkSet = $jwkSetProvider->retrieve();

    $httpClient->assertSent(function (Request $request) use ($baseUrl) {
        return $request->url() === "{$baseUrl}/.well-known/jwks.json";
    });

    expect($jwkSet)->toBeInstanceOf(JWKSet::class);
});
