<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fase_imunisasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('imunisasi_id')->constrained('imunisasis');
            $table->string('nama_fase');
            $table->string('waktu_fase');
            $table->string('deskripsi_fase');

            // Tugas 1
            $table->string('tugas_1')->nullable();
            $table->string('deskripsi_tugas_1')->nullable();
            $table->enum('tugas_1_status', ['belum', 'sudah', 'ditunda', 'dilewati'])->default('belum');
            $table->date('tugas_1_tanggal')->nullable();
            $table->text('tugas_1_catatan')->nullable();

            // Tugas 2
            $table->string('tugas_2')->nullable();
            $table->string('deskripsi_tugas_2')->nullable();
            $table->enum('tugas_2_status', ['belum', 'sudah', 'ditunda', 'dilewati'])->default('belum');
            $table->date('tugas_2_tanggal')->nullable();
            $table->text('tugas_2_catatan')->nullable();

            // Tugas 3
            $table->string('tugas_3')->nullable();
            $table->string('deskripsi_tugas_3')->nullable();
            $table->enum('tugas_3_status', ['belum', 'sudah', 'ditunda', 'dilewati'])->default('belum');
            $table->date('tugas_3_tanggal')->nullable();
            $table->text('tugas_3_catatan')->nullable();

            // Tugas 4
            $table->string('tugas_4')->nullable();
            $table->string('deskripsi_tugas_4')->nullable();
            $table->enum('tugas_4_status', ['belum', 'sudah', 'ditunda', 'dilewati'])->default('belum');
            $table->date('tugas_4_tanggal')->nullable();
            $table->text('tugas_4_catatan')->nullable();

            // Status keseluruhan fase
            $table->string('catatan_fase')->nullable();
            $table->boolean('is_complete')->default(false);

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
