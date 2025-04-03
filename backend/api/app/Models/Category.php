<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $name
 * @property string $description
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Category extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'description',
    ];

    public function bookingProviders(): HasMany
    {
        return $this->hasMany(BookingProvider::class);
    }
}
