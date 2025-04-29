<?php

namespace App\Models;

use App\Shared\Cognito\HasCognitoInterface;
use App\Shared\Cognito\HasCognitoTrait;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property string $cognito_id
 * @property string $name
 * @property string $email
 */
class User extends Authenticatable implements HasCognitoInterface
{
    use HasCognitoTrait;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    use HasUuids;
    use Notifiable;

    protected $authPasswordName = false;

    protected $rememberTokenName = false;

    protected $fillable = [
        'cognito_id',
        'name',
        'email',
        'is_verified',
    ];

    public static function booted(): void
    {
        static::updated(function (self $user) {
            if (! $user->isDirty('is_verified')) {
                return;
            }

            app(CognitoIdentityProviderClient::class)->adminUpdateUserAttributes([
                'UserPoolId' => config('aws.cognito_identity_provider_client.user_pool_id'),
                'Username' => $user->cognito_id,
                'UserAttributes' => [
                    [
                        'Name' => 'custom:is_verified',
                        'Value' => $user->is_verified ? 'true' : 'false',
                    ],
                ],
            ]);
        });
    }

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
        ];
    }

    public function bookingProviders(): HasMany
    {
        return $this->hasMany(BookingProvider::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
