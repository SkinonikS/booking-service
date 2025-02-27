<?php

use App\Shared\Cognito\UserInfoProviders\HttpUserInfoProvider;
use Illuminate\Http\Client\Factory as HttpClientFactory;

it('retrieves user info from the HTTP endpoint', function () {
    $baseUrl = 'http://example.com';

    $httpClientFactory = new HttpClientFactory();
    $httpClientFactory->fake([
        "{$baseUrl}/oauth2/userInfo" => $httpClientFactory->response([
            'sub' => '123',
            'email' => 'foo@bar',
            'name' => 'Foo Bar',
        ], 200),
    ]);

    $userInfoProvider = new HttpUserInfoProvider(
        $baseUrl,
        $httpClientFactory,
    );

    $userInfo = $userInfoProvider->retrieve('access-token');

    expect($userInfo->sub)->toBe('123');
    expect($userInfo->email)->toBe('foo@bar');
    expect($userInfo->name)->toBe('Foo Bar');

    $httpClientFactory->assertSent(function ($request) use ($baseUrl) {
        return $request->hasHeader('Authorization', 'Bearer access-token')
            && $request->url() === "{$baseUrl}/oauth2/userInfo";
    });
});
