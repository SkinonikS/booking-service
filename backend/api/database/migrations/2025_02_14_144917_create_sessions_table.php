<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained(App\Models\User::class)->cascadeOnDelete()->cascadeOnUpdate()->index();
            $table->string('ip_address', 45);
            $table->string('platform_name', 32);
            $table->timestamp('last_used_at')->index();
            $table->timestamp('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
