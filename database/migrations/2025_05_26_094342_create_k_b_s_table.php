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
        Schema::create('k_b_s', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('tipe_kb', ['Metode operasi wanita (MOW)/tubektomi, metode operasi pria (MOP)/ vasektomi ', 'Implan', 'IUD', 'Kontrasepsi suntik 3 bulan atau 1 bulan', 'Pil KB', 'Kondom']);
            $table->string('catatan')->nullable();
            $table->enum('status_kb', ['aktif', 'tidak_aktif']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('k_b_s');
    }
};
