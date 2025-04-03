<?php

use App\Models\BookingProvider;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weekday_schedules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(BookingProvider::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedTinyInteger('weekday_id');
            $table->unsignedInteger('open_time');
            $table->unsignedInteger('close_time');
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            $table->unique(['weekday_id', 'booking_provider_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weekday_schedules');
    }
};
