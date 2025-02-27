<?php

use Illuminate\Contracts\Cache\Repository as CacheRepositoryInterface;
use App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface;
use App\Shared\Cognito\JwkSetProviders\CachedJwkSetProvider;
use Carbon\CarbonInterval;
use Jose\Component\Core\JWKSet;
use Mockery as m;

it('calls the underlying provider and caches the value on retrieve', function () {
    $expectedJwkSet = new JWKSet([]);

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $httpJwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $httpJwkSetProvider->shouldReceive('retrieve')->andReturn($expectedJwkSet);

    /**
     * @var \Mockery\MockInterface&\Illuminate\Contracts\Cache\Repository
     */
    $cacheStore = m::mock(CacheRepositoryInterface::class);
    $cacheStore->shouldReceive('remember')
        ->once()
        ->with(
            'foobar',
            m::type(DateInterval::class),
            m::type('callable'),
        )->andReturnUsing(function ($key, $ttl, $callback) {
            return $callback();
        });

    $jwkSetProvider = new CachedJwkSetProvider(
        $httpJwkSetProvider,
        $cacheStore,
        'foobar',
        CarbonInterval::minutes(5),
    );

    $jwkSet = $jwkSetProvider->retrieve();

    expect($jwkSet)->toBe($expectedJwkSet);
});

it('returns cached value without calling the underlying provider', function () {
    $expectedJwkSet = new JWKSet([]);

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $httpJwkSetProvider = Mockery::mock(JwkSetProviderInterface::class);
    $httpJwkSetProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\Illuminate\Contracts\Cache\Repository
     */
    $cacheStore = m::mock(CacheRepositoryInterface::class);
    $cacheStore->shouldReceive('remember')
        ->once()
        ->with(
            'foobar',
            Mockery::on(fn($ttl) => $ttl instanceof DateInterval),
            Mockery::type('callable')
        )
        ->andReturn($expectedJwkSet);

    $jwkSetProvider = new CachedJwkSetProvider(
        $httpJwkSetProvider,
        $cacheStore,
        'foobar',
        CarbonInterval::minutes(5),
    );

    $jwkSet = $jwkSetProvider->retrieve();

    expect($jwkSet)->toBe($expectedJwkSet);
});
