<?php

use App\Models\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('disk', 32);
            $table->string('directory');
            $table->string('filename');
            $table->string('extension', 32);
            $table->string('mime_type', 128);
            $table->string('aggregate_type', 32)->index();
            $table->unsignedInteger('size');
            $table->timestamps();
            $table->unique(['disk', 'directory', 'filename', 'extension']);
        });

        Schema::create('mediables', function (Blueprint $table) {
            $table->foreignIdFor(Media::class)->constrained('media')->cascadeOnDelete();
            $table->uuidMorphs('mediable');
            $table->string('tag')->index();
            $table->unsignedInteger('order')->index();
            $table->primary(['media_id', 'mediable_type', 'mediable_id', 'tag']);
            $table->index(['mediable_id', 'mediable_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mediables');
        Schema::dropIfExists('media');
    }

    /**
     * {@inheritdoc}
     */
    public function getConnection()
    {
        return config('mediable.connection_name', parent::getConnection());
    }
};
