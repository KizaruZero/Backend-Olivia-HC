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
        Schema::create('nifas_task_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nifas_progress_id')->constrained('nifas_progress');
            $table->foreignId('nifas_task_id')->constrained('nifas_tasks');
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
        Schema::dropIfExists('nifas_task_progress');
    }
};
