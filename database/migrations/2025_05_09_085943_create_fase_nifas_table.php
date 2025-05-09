<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fase_nifas', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // KF1, KF2, KF3, KF4
            $table->integer('start_day'); // Hari mulai (dari hari 0)
            $table->integer('end_day'); // Hari selesai
            $table->text('description')->nullable();
            $table->string('twibbon_image')->nullable(); // Path gambar twibbon untuk KF ini
            $table->string('border_style')->nullable(); // Style border yang akan diterapkan di profil
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fase_nifas');
    }
};
