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
        Schema::create('daily_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kehamilan_id'); // mengacu ke tabel users
            $table->date('notes_date');
            $table->time('notes_time')->nullable();
            $table->enum('mood', [
                'sangat bahagia',
                'senang',
                'biasa saja',
                'cemas',
                'sedih',
                'tertekan',
                'mudah marah',
                'mood swing',
            ])->nullable();
            $table->enum('stress_level', ['rendah', 'sedang', 'tinggi'])->nullable();
            $table->enum('stress_cause', [
                'pekerjaan',
                'keluarga',
                'keuangan',
                'kesehatan',
                'hubungan sosial',
                'lainnya',
            ])->nullable();
            // Data Kesehatan
            $table->decimal('weight', 5, 2)->nullable();

            // Aktivitas Harian
            $table->json('daily_activities')->nullable();
            $table->json(column: 'gejala_fisik')->nullable(); // daftar gejala

            // Notes Tambahan
            $table->string('additional_notes')->nullable();

            // Upload Foto
            $table->string('photo_path')->nullable();

            // Trimester 2-3
            $table->enum('baby_movement_frequency', ['sedikit', 'normal', 'aktif'])->nullable();
            $table->enum('baby_movement_time', ['pagi', 'siang', 'malam'])->nullable();
            $table->integer('movement_counter')->nullable();

            // Masa Nifas - Kondisi Payudara
            $table->enum('breast_condition', ['normal', 'bengkak', 'nyeri', 'puting lecet', 'mastitis'])->nullable();

            // Masa Nifas - Luka Persalinan
            $table->enum('wound_condition', ['normal', 'nyeri', 'kemerahan', 'bengkak', 'keluar cairan'])->nullable();

            // Masa Nifas - Lokhia
            $table->enum('lochia_color', ['merah', 'merah muda', 'kecoklatan', 'kekuningan'])->nullable();
            $table->enum('lochia_amount', ['sedikit', 'sedang', 'banyak'])->nullable();
            $table->enum('lochia_smell', ['normal', 'tidak normal'])->nullable();

            $table->timestamps();

            $table->foreign('kehamilan_id')->references('id')->on('kehamilans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
