<?php

namespace App\Shared\Cognito\UserInfoProviders;

use Illuminate\Http\Client\Factory as HttpClientFactory;

class HttpUserInfoProvider implements UserInfoProviderInterface
{
    public function __construct(
        protected string $poolDomain,
        protected HttpClientFactory $httpClientFactory,
    ) {
        //
    }

    public function retrieve(string $accessToken): UserInfo
    {
        $response = $this->httpClientFactory
            ->withHeader('Authorization', "Bearer {$accessToken}")->asJson()
            ->get($this->buildUrl());

        if ($response->failed()) {
            throw new FailedToFetchUserInfoException('Failed to fetch user info.');
        }

        $body = $response->json();

        return new UserInfo(
            sub: $body['sub'],
            name: $body['name'],
            email: $body['email'],
        );
    }

    protected function buildUrl(): string
    {
        return "{$this->poolDomain}/oauth2/userInfo";
    }
}
