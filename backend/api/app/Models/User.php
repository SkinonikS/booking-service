<?php

namespace App\Models;

use App\Shared\Cognito\HasCognitoInterface;
use App\Shared\Cognito\HasCognitoTrait;
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
    ];

    public function bookingProviders(): HasMany
    {
        return $this->hasMany(BookingProvider::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
