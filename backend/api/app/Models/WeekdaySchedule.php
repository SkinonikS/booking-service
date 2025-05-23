<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $booking_provider_id
 * @property int $weekday_id
 * @property bool $is_active
 * @property int $open_time
 * @property int $close_time
 * @property \Illuminate\Support\Carbon $open_time
 * @property \Illuminate\Support\Carbon $close_time
 * @property \App\Models\BookingProvider $bookingProvider
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\ServiceSchedule> $serviceSchedules
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class WeekdaySchedule extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'booking_provider_id',
        'weekday_id',
        'open_time',
        'close_time',
        'is_active',
    ];

    public function bookingProvider(): BelongsTo
    {
        return $this->belongsTo(BookingProvider::class);
    }

    public function serviceSchedules(): HasMany
    {
        return $this->hasMany(ServiceSchedule::class);
    }
}
