<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property \Illuminate\Support\Carbon $date
 * @property int $time_slot
 * @property string $cancellation_reason
 * @property string $user_id
 * @property string $service_schedule_id
 * @property \App\Models\User $user
 * @property \App\Models\ServiceSchedule $serviceSchedule
 * @property \Illuminate\Support\Carbon $cancelled_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Booking extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'service_schedule_id',
        'user_id',
        'date',
        'time_slot',
        'cancellation_reason',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'cancelled_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function serviceSchedule(): BelongsTo
    {
        return $this->belongsTo(ServiceSchedule::class);
    }
}
