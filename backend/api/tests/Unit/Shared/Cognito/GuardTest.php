<?php

use App\Models\User;
use App\Shared\Cognito\AccessTokenValidators\AccessToken;
use Mockery as m;
use App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface;
use App\Shared\Cognito\Guard;
use App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface;
use App\Shared\Cognito\UserInfoProviders\UserInfo;
use App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface;
use App\Shared\Cognito\UserProviders\UserProviderInterface;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Jose\Component\Core\JWKSet;

it('returns null when no bearer token is present', function () {
    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface
     */
    $userInfoProvider = m::mock(UserInfoProviderInterface::class);
    $userInfoProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $jwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $jwkSetProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface
     */
    $accessTokenValidator = m::mock(AccessTokenValidatorInterface::class);
    $accessTokenValidator->shouldReceive('validate')->andReturn(false);

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserProviders\UserProviderInterface
     */
    $userProvider = m::mock(UserProviderInterface::class);
    $userProvider->shouldNotReceive('retrieveByCognitoId');
    $userProvider->shouldNotReceive('create');

    $guard = new Guard(
        $userInfoProvider,
        $jwkSetProvider,
        $accessTokenValidator,
        $userProvider,
        Request::create('/', 'GET'),
    );

    expect($guard->guest())->toBeTrue();
    expect($guard->hasUser())->toBeFalse();
    expect($guard->user())->toBeNull();
    expect($guard->id())->toBeNull();
});

it('returns null when access token validation fails', function () {
    $bearerToken = 'invalid-token';
    $request = Request::create('/', 'GET');
    $request->headers->set('Authorization', "Bearer {$bearerToken}");

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface
     */
    $userInfoProvider = m::mock(UserInfoProviderInterface::class);

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $jwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $jwkSetProvider->shouldReceive('retrieve')
        ->once()
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
             */
            return m::mock(JWKSet::class);
        });

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface
     */
    $accessTokenValidator = m::mock(AccessTokenValidatorInterface::class);
    $accessTokenValidator->shouldReceive('validate')
        ->once()
        ->with($bearerToken, Mockery::type(JWKSet::class))
        ->andReturnFalse();

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserProviders\UserProviderInterface
     */
    $userProvider = m::mock(UserProviderInterface::class);
    $userProvider->shouldNotReceive('retrieveByCognitoId');
    $userProvider->shouldNotReceive('create');

    $guard = new Guard(
        $userInfoProvider,
        $jwkSetProvider,
        $accessTokenValidator,
        $userProvider,
        $request,
    );

    expect($guard->guest())->toBeTrue();
    expect($guard->hasUser())->toBeFalse();
    expect($guard->user())->toBeNull();
    expect($guard->id())->toBeNull();
});

it('returns the existing user when found', function () {
    $bearerToken = 'valid-token';
    $request = Request::create('/', 'GET');
    $request->headers->set('Authorization', "Bearer {$bearerToken}");

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface
     */
    $userInfoProvider = m::mock(UserInfoProviderInterface::class);
    $userInfoProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $jwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $jwkSetProvider->shouldReceive('retrieve')
        ->once()
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
             */
            return m::mock(JWKSet::class);
        });

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface
     */
    $accessTokenValidator = m::mock(AccessTokenValidatorInterface::class);
    $accessTokenValidator->shouldReceive('validate')
        ->once()
        ->with($bearerToken, Mockery::type(JWKSet::class))
        ->andReturn(new AccessToken('foo'));

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserProviders\UserProviderInterface
     */
    $userProvider = m::mock(UserProviderInterface::class);
    $userProvider->shouldNotReceive('create');
    $userProvider->shouldReceive('retrieveByCognitoId')
        ->once()
        ->with('foo')
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Illuminate\Contracts\Auth\Authenticatable
             */
            $user = m::mock(Authenticatable::class);
            $user->shouldReceive('getAuthIdentifier')
                ->once()
                ->andReturn('bar');

            return $user;
        });

    $guard = new Guard(
        $userInfoProvider,
        $jwkSetProvider,
        $accessTokenValidator,
        $userProvider,
        $request,
    );

    expect($guard->id())->toBe('bar');
    expect($guard->user())->toBeInstanceOf(Authenticatable::class);
    expect($guard->guest())->toBeFalse();
});

it('creates a new user when none is found', function () {
    $bearerToken = 'valid-token';
    $request = Request::create('/', 'GET');
    $request->headers->set('Authorization', "Bearer {$bearerToken}");

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface
     */
    $userInfoProvider = m::mock(UserInfoProviderInterface::class);
    $userInfoProvider->shouldReceive('retrieve')->once()->andReturn(new UserInfo('foo', 'foo@bar', 'Foo Bar'));

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $jwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $jwkSetProvider->shouldReceive('retrieve')
        ->once()
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
             */
            return m::mock(JWKSet::class);
        });

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface
     */
    $accessTokenValidator = m::mock(AccessTokenValidatorInterface::class);
    $accessTokenValidator->shouldReceive('validate')
        ->once()
        ->with($bearerToken, Mockery::type(JWKSet::class))
        ->andReturn(new AccessToken('foo'));

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserProviders\UserProviderInterface
     */
    $userProvider = m::mock(UserProviderInterface::class);
    $userProvider->shouldReceive('create')
        ->once()
        ->with([
            'cognito_id' => 'foo',
            'email' => 'Foo Bar',
            'name' => 'foo@bar',
        ])
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Illuminate\Contracts\Auth\Authenticatable
             */
            $user = m::mock(Authenticatable::class);
            $user->shouldReceive('getAuthIdentifier')
                ->once()
                ->andReturn('bar');

            return $user;
        });
    $userProvider->shouldReceive('retrieveByCognitoId')
        ->once()
        ->with('foo')
        ->andReturnNull();

    $guard = new Guard(
        $userInfoProvider,
        $jwkSetProvider,
        $accessTokenValidator,
        $userProvider,
        $request,
    );

    expect($guard->id())->toBe('bar');
    expect($guard->user())->toBeInstanceOf(Authenticatable::class);
    expect($guard->guest())->toBeFalse();
    expect($guard->hasUser())->toBeTrue();
});

it('sets the user', function () {
    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface
     */
    $userInfoProvider = m::mock(UserInfoProviderInterface::class);
    $userInfoProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface
     */
    $jwkSetProvider = m::mock(JwkSetProviderInterface::class);
    $jwkSetProvider->shouldNotReceive('retrieve');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface
     */
    $accessTokenValidator = m::mock(AccessTokenValidatorInterface::class);
    $accessTokenValidator->shouldNotReceive('validate');

    /**
     * @var \Mockery\MockInterface&\App\Shared\Cognito\UserProviders\UserProviderInterface
     */
    $userProvider = m::mock(UserProviderInterface::class);
    $userProvider->shouldNotReceive('create');
    $userProvider->shouldNotReceive('retrieveByCognitoId');

    $guard = new Guard(
        $userInfoProvider,
        $jwkSetProvider,
        $accessTokenValidator,
        $userProvider,
        Request::create('/', 'GET'),
    );

    expect($guard->id())->toBeNull();
    expect($guard->guest())->toBeTrue();
    expect($guard->hasUser())->toBeFalse();
    expect($guard->user())->toBeNull();

    /**
     * @var \Mockery\MockInterface&\Illuminate\Contracts\Auth\Authenticatable
     */
    $fakeUser = m::mock(Authenticatable::class);
    $fakeUser->shouldReceive('getAuthIdentifier')
        ->once()
        ->andReturn('bar');

    $guard->setUser($fakeUser);

    expect($guard->id())->toBe('bar');
    expect($guard->user())->toBe($fakeUser);
    expect($guard->hasUser())->toBeTrue();
    expect($guard->guest())->toBeFalse();

    $guard->setUser(null);

    expect($guard->id())->toBeNull();
    expect($guard->guest())->toBeTrue();
    expect($guard->hasUser())->toBeFalse();
    expect($guard->user())->toBeNull();
});
