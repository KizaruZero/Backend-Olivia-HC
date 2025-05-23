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
        Schema::create('nifas_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nifas_id')->constrained()->onDelete('cascade');
            $table->foreignId('fase_nifas_id')->constrained();
            $table->boolean('is_completed')->default(false);
            $table->date('completed_at')->nullable();
            $table->date('tanggal_periksa')->nullable();
            $table->string('puskesmas')->nullable(); // Puskesmas tempat melakukan kunjungan
            $table->text('notes')->nullable(); // Catatan kunjungan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nifas_progress');
    }
};
