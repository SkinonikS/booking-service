<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $service_id
 * @property string $weekday_schedule_id
 * @property int $max_bookings
 * @property int $open_time
 * @property int $close_time
 * @property int $time_span
 * @property bool $is_active
 * @property \App\Models\WeekdaySchedule $weekdaySchedule
 * @property \App\Models\Service $service
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class ServiceSchedule extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'weekday_schedule_id',
        'service_id',
        'open_time',
        'close_time',
        'time_span',
        'max_bookings',
        'is_active',
    ];

    public function maxBookingsForDay(): int
    {
        return floor($this->time_span / 1440) * $this->max_bookings;
    }

    public function weekdaySchedule(): BelongsTo
    {
        return $this->belongsTo(WeekdaySchedule::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
