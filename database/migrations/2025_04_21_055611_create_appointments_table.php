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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kehamilan_id'); // mengacu ke tabel users
            $table->string('title'); // E.g.: "USG Trimester 1"
            $table->date('appointment_date');
            $table->string('provider_name'); // Doctor/midwife name
            $table->string('location');
            $table->enum('reminder_status', ['pending', 'sent', 'failed'])->default('pending');
            $table->string('notes')->nullable();
            $table->timestamps();
            $table->foreign('kehamilan_id')->references('id')->on('kehamilans')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
