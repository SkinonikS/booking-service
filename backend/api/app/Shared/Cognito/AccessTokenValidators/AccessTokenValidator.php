<?php

namespace App\Shared\Cognito\AccessTokenValidators;

use Jose\Component\Checker\ClaimCheckerManager;
use Jose\Component\Checker\HeaderCheckerManager;
use Jose\Component\Checker\InvalidClaimException;
use Jose\Component\Checker\InvalidHeaderException;
use Jose\Component\Checker\MissingMandatoryClaimException;
use Jose\Component\Checker\MissingMandatoryHeaderParameterException;
use Jose\Component\Core\AlgorithmManager;
use Jose\Component\Core\JWKSet;
use Jose\Component\Signature\JWSVerifier;
use Jose\Component\Signature\Serializer\CompactSerializer;
use Jose\Component\Signature\Serializer\JWSSerializer;
use LogicException;

class AccessTokenValidator implements AccessTokenValidatorInterface
{
    protected JWSSerializer $jwsSerializer;

    protected JWSVerifier $jwsVerifier;

    public function __construct(
        protected HeaderCheckerManager $headerChecker,
        protected ClaimCheckerManager $claimChecker,
        protected AlgorithmManager $algorithms,
    ) {
        $this->jwsSerializer = new CompactSerializer();
        $this->jwsVerifier = new JWSVerifier($algorithms);
    }

    public function validate(string $accessToken, JWKSet $jwkSet): false|AccessToken
    {
        if ($jwkSet->count() === 0) {
            throw new JwkSetIsEmptyException('The JWK Set does not contain any key.');
        }

        try {
            $jws = $this->jwsSerializer->unserialize($accessToken);
        } catch (LogicException) {
            return false;
        }

        if ($jws->countSignatures() === 0) {
            return false;
        }

        try {
            $this->headerChecker->check($jws, 0, ['kid', 'alg']);
        } catch (InvalidHeaderException|MissingMandatoryHeaderParameterException $e) {
            return false;
        }

        $isValid = $this->jwsVerifier->verifyWithKeySet($jws, $jwkSet, 0);

        if (! $isValid) {
            return false;
        }

        $payload = json_decode($jws->getPayload() ?? '', true) ?? [];

        try {
            $this->claimChecker->check($payload, ['iss', 'sub', 'exp', 'iat', 'jti']);
        } catch (InvalidClaimException|MissingMandatoryClaimException $e) {
            return false;
        }

        return new AccessToken($payload['sub']);
    }
}
