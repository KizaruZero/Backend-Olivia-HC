<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Imunisasi;
use Illuminate\Support\Facades\Validator;
use App\Models\FaseImunisasi;
class ImunisasiController extends Controller
{
    //
    public function getImunisasi()
    {
        $user = Auth::user();
        $imunisasi = Imunisasi::where('user_id', $user->id)->with('faseImunisasi')->get();
        return response()->json([
            'success' => true,
            'message' => 'Data imunisasi',
            'data' => $imunisasi
        ], 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'is_active' => 'required',
            'is_completed' => 'nullable',
            'completed_at' => 'nullable'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak boleh kosong',
                'data' => $validator->errors()
            ], 400);
        }
        $imunisasi = Imunisasi::create([
            'user_id' => $user->id,
            'start_date' => $request->start_date,
            'is_active' => $request->is_active,
            'is_completed' => $request->is_completed,
            'completed_at' => $request->completed_at
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Data imunisasi berhasil ditambahkan',
            'data' => $imunisasi
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $imunisasi = Imunisasi::find($id);
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'is_active' => 'required',
            'is_completed' => 'nullable',
            'completed_at' => 'nullable'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak boleh kosong',
                'data' => $validator->errors()
            ], 400);
        }
        $imunisasi->update($request->all());
        return response()->json([
            'success' => true,
            'message' => 'Data imunisasi berhasil diubah',
            'data' => $imunisasi
        ], 200);
    }

    public function getFaseImunisasi()
    {
        $user = Auth::user();
        $imunisasi = Imunisasi::where('user_id', $user->id)->get();
        $faseImunisasi = FaseImunisasi::where('imunisasi_id', $imunisasi->id)->get();
        return response()->json([
            'success' => true,
            'message' => 'Data fase imunisasi',
            'data' => $faseImunisasi
        ], 200);
    }


    public function storeFaseImunisasi(Request $request)
    {
        $validated = $request->validate([
            'imunisasi_id' => 'required|exists:imunisasis,id',
            'nama_fase' => 'required|string|max:255',
            'waktu_fase' => 'required|string|max:255',
            'deskripsi_fase' => 'required|string',

            'tugas_1' => 'nullable|string|max:255',
            'deskripsi_tugas_1' => 'nullable|string',
            'tugas_1_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_1_tanggal' => 'nullable|date',
            'tugas_1_catatan' => 'nullable|string',

            'tugas_2' => 'nullable|string|max:255',
            'deskripsi_tugas_2' => 'nullable|string',
            'tugas_2_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_2_tanggal' => 'nullable|date',
            'tugas_2_catatan' => 'nullable|string',

            'tugas_3' => 'nullable|string|max:255',
            'deskripsi_tugas_3' => 'nullable|string',
            'tugas_3_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_3_tanggal' => 'nullable|date',
            'tugas_3_catatan' => 'nullable|string',

            'tugas_4' => 'nullable|string|max:255',
            'deskripsi_tugas_4' => 'nullable|string',
            'tugas_4_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_4_tanggal' => 'nullable|date',
            'tugas_4_catatan' => 'nullable|string',

            'catatan_fase' => 'nullable|string',
        ]);

        FaseImunisasi::create($validated);

        return redirect()->route('fase-imunisasi.index')
            ->with('success', 'Fase Imunisasi berhasil ditambahkan');
    }

    public function updateFaseImunisasi(Request $request, $id)
    {
        $faseImunisasi = FaseImunisasi::find($id);

        if (!$faseImunisasi) {
            return response()->json([
                'success' => false,
                'message' => 'Fase imunisasi tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'imunisasi_id' => 'nullable|exists:imunisasis,id',
            'nama_fase' => 'nullable|string|max:255',
            'waktu_fase' => 'nullable|string|max:255',
            'deskripsi_fase' => 'nullable|string',

            'tugas_1' => 'nullable|string|max:255',
            'deskripsi_tugas_1' => 'nullable|string',
            'tugas_1_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_1_tanggal' => 'nullable|date',
            'tugas_1_catatan' => 'nullable|string',

            'tugas_2' => 'nullable|string|max:255',
            'deskripsi_tugas_2' => 'nullable|string',
            'tugas_2_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_2_tanggal' => 'nullable|date',
            'tugas_2_catatan' => 'nullable|string',

            'tugas_3' => 'nullable|string|max:255',
            'deskripsi_tugas_3' => 'nullable|string',
            'tugas_3_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_3_tanggal' => 'nullable|date',
            'tugas_3_catatan' => 'nullable|string',

            'tugas_4' => 'nullable|string|max:255',
            'deskripsi_tugas_4' => 'nullable|string',
            'tugas_4_status' => 'nullable|in:belum,sudah,ditunda,dilewati',
            'tugas_4_tanggal' => 'nullable|date',
            'tugas_4_catatan' => 'nullable|string',

            'catatan_fase' => 'nullable|string',
            'is_complete' => 'nullable|boolean',
        ]);

        try {
            $faseImunisasi->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Fase Imunisasi berhasil diperbarui',
                'data' => $faseImunisasi
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui fase imunisasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }



}
