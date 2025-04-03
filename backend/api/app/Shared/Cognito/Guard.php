<?php

namespace App\Shared\Cognito;

use App\Shared\Cognito\AccessTokenValidators\AccessToken;
use App\Shared\Cognito\AccessTokenValidators\AccessTokenValidatorInterface;
use App\Shared\Cognito\JwkSetProviders\JwkSetProviderInterface;
use App\Shared\Cognito\UserInfoProviders\UserInfoProviderInterface;
use App\Shared\Cognito\UserProviders\UserProviderInterface;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard as GuardContract;
use Illuminate\Http\Request;

class Guard implements GuardContract
{
    protected bool $isUserFetched = false;

    protected ?Authenticatable $user = null;

    public function __construct(
        protected UserInfoProviderInterface $userInfoProvider,
        protected JwkSetProviderInterface $jwkSetProvider,
        protected AccessTokenValidatorInterface $accessTokenValidator,
        protected UserProviderInterface $userProvider,
        protected Request $request,
    ) {
        //
    }

    public function id()
    {
        return $this->user()?->getAuthIdentifier();
    }

    public function user()
    {
        if ($this->isUserFetched) {
            return $this->user;
        }

        $this->isUserFetched = true;

        if (! $bearerToken = $this->request->bearerToken()) {
            return $this->user = null;
        }

        if (! $accessToken = $this->validateAccessToken($bearerToken)) {
            return $this->user = null;
        }

        $user = $this->userProvider->retrieveByCognitoId($accessToken->userName);

        if ($user) {
            if ($user instanceof HasCognitoInterface) {
                $user->cognitoAccessToken = $accessToken;
            }

            return $this->user = $user;
        }

        $userInfo = $this->userInfoProvider->retrieve($bearerToken);

        $user = $this->userProvider->create([
            'cognito_id' => $accessToken->userName,
            'email' => $userInfo->email,
            'name' => $userInfo->name,
        ]);

        if ($user instanceof HasCognitoInterface) {
            $user->cognitoAccessToken = $accessToken;
        }

        return $this->user = $user;
    }

    public function validate(array $credentials = [])
    {
        if (! isset($credentials['access_token'])) {
            return false;
        }

        return $this->validateAccessToken($credentials['access_token']) !== false;
    }

    public function check()
    {
        return $this->user() !== null;
    }

    public function guest()
    {
        return ! $this->check();
    }

    public function hasUser()
    {
        return $this->user !== null;
    }

    public function setUser(?Authenticatable $user)
    {
        $this->user = $user;
        $this->isUserFetched = true;

        return $this;
    }

    public function setRequest(Request $request)
    {
        $this->request = $request;

        return $this;
    }

    protected function validateAccessToken(string $accessToken): false|AccessToken
    {
        return $this->accessTokenValidator->validate(
            $accessToken,
            $this->jwkSetProvider->retrieve(),
        );
    }
}
