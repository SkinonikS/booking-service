<?php

namespace App\Shared\Cognito;

use App\Shared\Cognito\AccessTokenValidators\AccessTokenValidator;
use App\Shared\Cognito\JwkSetProviders\CachedJwkSetProvider;
use App\Shared\Cognito\JwkSetProviders\HttpJwkSetProvider;
use App\Shared\Cognito\UserInfoProviders\HttpUserInfoProvider;
use App\Shared\Cognito\UserProviders\EloquentUserProvider;
use Carbon\FactoryImmutable;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Client\Factory as HttpClientFactory;
use Illuminate\Support\ServiceProvider;
use Jose\Component\Checker\AlgorithmChecker;
use Jose\Component\Checker\AudienceChecker;
use Jose\Component\Checker\ClaimCheckerManager;
use Jose\Component\Checker\ExpirationTimeChecker;
use Jose\Component\Checker\HeaderCheckerManager;
use Jose\Component\Checker\IsEqualChecker;
use Jose\Component\Checker\IssuedAtChecker;
use Jose\Component\Checker\IssuerChecker;
use Jose\Component\Core\AlgorithmManager;
use Jose\Component\Signature\Algorithm\RS256;
use Jose\Component\Signature\JWSTokenSupport;

class CognitoServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app[AuthManager::class]->extend('cognito', function ($app, $name, $config) {
            $userInfoProvider = new HttpUserInfoProvider(
                $config['user_pool_domain_url'],
                new HttpClientFactory(),
            );

            $jwkSetProvider = new CachedJwkSetProvider(
                new HttpJwkSetProvider(
                    $config['user_pool_url'],
                    new HttpClientFactory()
                ),
                $app['cache.store'],
            );

            $now = new FactoryImmutable()
                ->now()
                ->getClock();

            $accessTokenValidator = new AccessTokenValidator(
                new HeaderCheckerManager([
                    new AlgorithmChecker(['RS256']),
                ], [
                    new JWSTokenSupport(),
                ]),
                new ClaimCheckerManager([
                    new ExpirationTimeChecker($now, 10),
                    new IssuedAtChecker($now, 10),
                    new IssuerChecker([$config['user_pool_url']]),
                    new AudienceChecker($config['client_id']),
                    new IsEqualChecker('token_use', 'id'),
                ]),
                new AlgorithmManager([
                    new RS256(),
                ]),
            );

            $guard = new Guard(
                $userInfoProvider,
                $jwkSetProvider,
                $accessTokenValidator,
                new EloquentUserProvider(),
                $app['request'],
            );

            $app->refresh('request', $guard, 'setRequest');

            return $guard;
        });
    }
}
