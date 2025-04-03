<?php

namespace App\Models;

use Carbon\WeekDay;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Plank\Mediable\Mediable;
use Plank\Mediable\MediableInterface;

/**
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property string $about_us
 * @property string $user_id
 * @property string $category_id
 * @property \App\Models\User $user
 * @property \App\Models\Category $category
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\Service> $services
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\Booking> $bookings
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\WeekdaySchedule> $weekdaySchedules
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class BookingProvider extends Model implements MediableInterface
{
    use HasFactory;
    use HasUuids;
    use Mediable;

    protected $fillable = [
        'category_id',
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'about_us',
    ];

    protected static function booted(): void
    {
        static::created(function (self $self) {
            $weekdaySchedules = collect(WeekDay::cases())->map(fn ($weekday) => [
                'weekday_id' => $weekday->value,
                'open_time' => 480,
                'close_time' => 1080,
                'is_active' => false,
            ]);

            $self->weekdaySchedules()->createMany($weekdaySchedules);
        });
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function weekdaySchedules(): HasMany
    {
        return $this->hasMany(WeekdaySchedule::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
