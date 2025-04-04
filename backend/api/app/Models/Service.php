<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $name
 * @property string $description
 * @property string $booking_provider_id
 * @property \App\Models\BookingProvider $bookingProvider
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\ServiceSchedule> $serviceSchedules
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Service extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'description',
        'booking_provider_id',
    ];

    public function serviceSchedules()
    {
        return $this->hasMany(ServiceSchedule::class);
    }

    public function bookingProvider()
    {
        return $this->belongsTo(BookingProvider::class);
    }
}
