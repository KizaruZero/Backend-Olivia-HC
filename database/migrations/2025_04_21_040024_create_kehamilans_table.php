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
        Schema::create('kehamilans', function (Blueprint $table) {
            $table->id(); // Primary Key: id
            $table->unsignedBigInteger('user_id'); // FK to users table

            $table->date('last_periode_date'); // tanggal haid terakhir
            $table->date('estimated_due_date')->nullable(); // perkiraan lahir
            $table->boolean('is_active')->default(true); // status aktif
            $table->enum('status', ['hamil', 'melahirkan', 'keguguran', 'nifas', 'selesai'])->default('hamil'); // enum status kehamilan

            $table->date('delivered_date')->nullable(); // tanggal melahirkan
            $table->string('miscarriage_week')->nullable(); // minggu keguguran
            $table->boolean('is_nifas_complete')->default(false); // status nifas selesai atau belum

            $table->text('notes')->nullable(); // catatan tambahan

            $table->timestamps();

            // Foreign Key Constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kehamilans');
    }
};
