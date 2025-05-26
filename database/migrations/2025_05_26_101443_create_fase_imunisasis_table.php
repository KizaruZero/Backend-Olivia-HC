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
        Schema::create('fase_imunisasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama_fase');
            $table->string('waktu_fase');
            $table->string('deskripsi_fase');
            $table->string('tugas_1')->nullable();
            $table->string('deskripsi_tugas_1')->nullable();
            $table->string('tugas_2')->nullable();
            $table->string('deskripsi_tugas_2')->nullable();
            $table->string('tugas_3')->nullable();
            $table->string('deskripsi_tugas_3')->nullable();
            $table->string('tugas_4')->nullable();
            $table->string('deskripsi_tugas_4')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fase_imunisasis');
    }
};
