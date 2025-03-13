<?php

use App\Shared\Cognito\AccessTokenValidators\AccessToken;
use App\Shared\Cognito\AccessTokenValidators\AccessTokenValidator;
use App\Shared\Cognito\AccessTokenValidators\JwkSetIsEmptyException;
use Jose\Component\Checker\ClaimCheckerManager;
use Jose\Component\Checker\HeaderCheckerManager;
use Jose\Component\Checker\InvalidClaimException;
use Jose\Component\Checker\InvalidHeaderException;
use Jose\Component\Core\AlgorithmManager;
use Jose\Component\Core\JWKSet;
use Jose\Component\Signature\Algorithm\HS256;
use Jose\Component\Signature\JWS;
use Jose\Component\Signature\JWSVerifier;
use Jose\Component\Signature\Serializer\JWSSerializer;
use Mockery as m;

it('throws exception when JWKSet is empty', function () {
    $validator = new AccessTokenValidator(
        new HeaderCheckerManager([], []),
        new ClaimCheckerManager([]),
        new AlgorithmManager([]),
    );

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(0);

    expect(function () use ($validator, $jwkSet) {
        $validator->validate('dummy', $jwkSet);
    })->toThrow(JwkSetIsEmptyException::class);
});

it('returns false when unserialization fails', function () {
    $validator = new AccessTokenValidator(
        new HeaderCheckerManager([], []),
        new ClaimCheckerManager([]),
        new AlgorithmManager([]),
    );

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $result = $validator->validate('invalid-token', $jwkSet);

    expect($result)->toBeFalse();
});

it('returns false when token has no signatures', function () {
    $rawAccessToken = 'token-with-no-signatures';

    $validator = new AccessTokenValidator(
        new HeaderCheckerManager([], []),
        new ClaimCheckerManager([]),
        new AlgorithmManager([]),
    );

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\Serializer\JWSSerializer
     */
    $serializer = m::mock(JWSSerializer::class);
    $serializer->shouldReceive('unserialize')
        ->once()
        ->with($rawAccessToken)
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Signature\JWS
             */
            $jws = m::mock(JWS::class);
            $jws->shouldReceive('countSignatures')->once()->andReturn(0);

            return $jws;
        });

    $validatorReflection = new ReflectionProperty($validator, 'jwsSerializer');
    $validatorReflection->setAccessible(true);
    $validatorReflection->setValue($validator, $serializer);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $accessToken = $validator->validate($rawAccessToken, $jwkSet);

    expect($accessToken)->toBeFalse();
});

it('returns false when header check fails', function () {
    $rawAccessToken = 'token-header-fail';

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\HeaderCheckerManager
     */
    $headerChecker = Mockery::mock(HeaderCheckerManager::class);
    $headerChecker->shouldReceive('check')
        ->once()
        ->andThrow(new InvalidHeaderException('Header invalid', 'kid', 'foo'));

    $validator = new AccessTokenValidator(
        $headerChecker,
        new ClaimCheckerManager([]),
        new AlgorithmManager([]),
    );

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\Serializer\JWSSerializer
     */
    $serializer = m::mock(JWSSerializer::class);
    $serializer->shouldReceive('unserialize')
        ->once()
        ->with($rawAccessToken)
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Signature\JWS
             */
            $jws = m::mock(JWS::class);
            $jws->shouldReceive('countSignatures')->once()->andReturn(1);

            return $jws;
        });

    $validatorReflection = new ReflectionProperty($validator, 'jwsSerializer');
    $validatorReflection->setAccessible(true);
    $validatorReflection->setValue($validator, $serializer);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $accessToken = $validator->validate($rawAccessToken, $jwkSet);

    expect($accessToken)->toBeFalse();
});

it('returns false when signature verification fails', function () {
    $rawAccessToken = 'token-signature-fail';

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\HeaderCheckerManager
     */
    $headerChecker = m::mock(HeaderCheckerManager::class);
    $headerChecker->shouldReceive('check')->once();

    $validator = new AccessTokenValidator(
        $headerChecker,
        new ClaimCheckerManager([]),
        new AlgorithmManager([]),
    );

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\Serializer\JWSSerializer
     */
    $serializer = Mockery::mock(JWSSerializer::class);
    $serializer->shouldReceive('unserialize')
        ->once()
        ->with($rawAccessToken)
        ->andReturnUsing(function () {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Signature\JWS
             */
            $jws = m::mock(JWS::class);
            $jws->shouldReceive('countSignatures')->once()->andReturn(1);

            return $jws;
        });

    $validatorReflection = new ReflectionObject($validator);
    $serializerPropertyReflection = $validatorReflection->getProperty('jwsSerializer');
    $serializerPropertyReflection->setAccessible(true);
    $serializerPropertyReflection->setValue($validator, $serializer);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\JWSVerifier
     */
    $jwsVerifier = m::mock(JWSVerifier::class);
    $jwsVerifier->shouldReceive('verifyWithKeySet')
        ->once()
        ->andReturnFalse();

    $verifierPropertyReflection = $validatorReflection->getProperty('jwsVerifier');
    $verifierPropertyReflection->setAccessible(true);
    $verifierPropertyReflection->setValue($validator, $jwsVerifier);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $accessToken = $validator->validate($rawAccessToken, $jwkSet);

    expect($accessToken)->toBeFalse();
});

it('returns false when claim check fails', function () {
    $rawAccessToken = 'token-claim-fail';

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\HeaderCheckerManager
     */
    $headerChecker = m::mock(HeaderCheckerManager::class);
    $headerChecker->shouldReceive('check')->once();

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\ClaimCheckerManager
     */
    $claimChecker = m::mock(ClaimCheckerManager::class);
    $claimChecker->shouldReceive('check')
        ->once()
        ->andThrow(new InvalidClaimException('Invalid claim', 'iss', 'foo'));

    $validator = new AccessTokenValidator(
        $headerChecker,
        $claimChecker,
        new AlgorithmManager([]),
    );

    $payload = [
        'sub' => 'user123',
        'iss' => 'issuer',
        'exp' => time() + 3600,
        'iat' => time(),
        'jti' => 'token-id'
    ];

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\Serializer\JWSSerializer
     */
    $serializer = m::mock(JWSSerializer::class);
    $serializer->shouldReceive('unserialize')
        ->once()
        ->with($rawAccessToken)
        ->andReturnUsing(function () use ($payload) {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Signature\JWS
             */
            $jws = m::mock(JWS::class);
            $jws->shouldReceive('countSignatures')->once()->andReturn(1);
            $jws->shouldReceive('getPayload')->once()->andReturn(json_encode($payload));

            return $jws;
        });

    $validatorReflection = new ReflectionObject($validator);
    $serializerPropertyReflection = $validatorReflection->getProperty('jwsSerializer');
    $serializerPropertyReflection->setAccessible(true);
    $serializerPropertyReflection->setValue($validator, $serializer);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\JWSVerifier
     */
    $jwsVerifier = m::mock(JWSVerifier::class);
    $jwsVerifier->shouldReceive('verifyWithKeySet')
        ->once()
        ->andReturnTrue();

    $verifierPropertyReflection = $validatorReflection->getProperty('jwsVerifier');
    $verifierPropertyReflection->setAccessible(true);
    $verifierPropertyReflection->setValue($validator, $jwsVerifier);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $accessToken = $validator->validate($rawAccessToken, $jwkSet);

    expect($accessToken)->toBeFalse();
});

it('returns an AccessToken instance when validation succeeds', function () {
    $rawAccessToken = 'valid-token';

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\HeaderCheckerManager
     */
    $headerChecker = m::mock(HeaderCheckerManager::class);
    $headerChecker->shouldReceive('check')->once();

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Checker\ClaimCheckerManager
     */
    $claimChecker = Mockery::mock(ClaimCheckerManager::class);
    $claimChecker->shouldReceive('check')->once();

    $validator = new AccessTokenValidator(
        $headerChecker,
        $claimChecker,
        new AlgorithmManager([]),
    );

    $payload = [
        'sub' => 'user123',
        'iss' => 'issuer',
        'aud' => 'client-id',
        'cognito:username' => 'user123',
        'exp' => time() + 3600,
        'iat' => time(),
        'jti' => 'token-id'
    ];

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\Serializer\JWSSerializer
     */
    $serializer = m::mock(JWSSerializer::class);
    $serializer->shouldReceive('unserialize')
        ->once()
        ->with($rawAccessToken)
        ->andReturnUsing(function () use ($payload) {
            /**
             * @var \Mockery\MockInterface&\Jose\Component\Signature\JWS
             */
            $jws = m::mock(JWS::class);
            $jws->shouldReceive('countSignatures')->once()->andReturn(1);
            $jws->shouldReceive('getPayload')->once()->andReturn(json_encode($payload));

            return $jws;
        });

    $validatorReflection = new ReflectionObject($validator);
    $serializerPropertyReflection = $validatorReflection->getProperty('jwsSerializer');
    $serializerPropertyReflection->setAccessible(true);
    $serializerPropertyReflection->setValue($validator, $serializer);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Signature\JWSVerifier
     */
    $jwsVerifier = Mockery::mock(JWSVerifier::class);
    $jwsVerifier->shouldReceive('verifyWithKeySet')
        ->once()
        ->with(m::type(JWS::class), m::type(JWKSet::class), 0)
        ->andReturnTrue();

    $verifierPropertyReflection = $validatorReflection->getProperty('jwsVerifier');
    $verifierPropertyReflection->setAccessible(true);
    $verifierPropertyReflection->setValue($validator, $jwsVerifier);

    /**
     * @var \Mockery\MockInterface&\Jose\Component\Core\JWKSet
     */
    $jwkSet = m::mock(JWKSet::class);
    $jwkSet->shouldReceive('count')
        ->once()
        ->andReturn(1);

    $accessToken = $validator->validate($rawAccessToken, $jwkSet);

    expect($accessToken)->toBeInstanceOf(AccessToken::class);
    expect($accessToken->sub)->toBe('user123');
});
