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
        Schema::create('nifas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('start_date'); // Tanggal mulai masa nifas
            $table->date('end_date')->nullable(); // Tanggal berakhir masa nifas (opsional, bisa dihitung)
            $table->boolean('is_active')->default(true);
            $table->boolean('is_completed')->default(false);
            $table->date('completed_at')->nullable();
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nifas');
    }
};
