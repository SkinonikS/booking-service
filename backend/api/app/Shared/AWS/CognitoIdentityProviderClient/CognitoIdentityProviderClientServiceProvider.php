<?php

namespace App\Shared\AWS\CognitoIdentityProviderClient;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Illuminate\Support\ServiceProvider;

class CognitoIdentityProviderClientServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(CognitoIdentityProviderClient::class, function () {
            $config = config('aws');

            return new CognitoIdentityProviderClient([
                'version' => $config['cognito_identity_provider_client']['version'],
                'region' => $config['cognito_identity_provider_client']['region'],
                'credentials' => [
                    'key' => $config['credentials']['key'],
                    'secret' => $config['credentials']['secret'],
                ],
            ]);
        });
    }
}
