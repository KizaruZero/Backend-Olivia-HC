<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imunisasi extends Model
{
    //
    protected $fillable = [
        'user_id',
        'nama_imunisasi',
        'tanggal_imunisasi',
        'catatan',
    ];
    
    
}
