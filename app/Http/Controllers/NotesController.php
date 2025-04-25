<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notes; // Pastikan model Notes sudah ada

class NotesController extends Controller
{
    //
    public function getDailyNotes(Request $request)
    {
        // Ambil parameter dari query string
        $date = $request->query('date');
        $kehamilanId = $request->query('kehamilan_id');

        // Validasi parameter
        if (!$date || !$kehamilanId) {
            return response()->json(['error' => 'Both date and kehamilan_id are required'], 400);
        }

        // Ambil data catatan harian dari database (contoh)
        $dailyNotes = Notes::where('kehamilan_id', $kehamilanId)
            ->whereDate('notes_date', $date)
            ->get();
        return response()->json($dailyNotes);
    }


    public function getNoteDates(Request $request)
    {
        try {
            $kehamilanId = $request->query('kehamilan_id');

            if (!$kehamilanId) {
                return response()->json(['error' => 'kehamilan_id is required'], 400);
            }

            $noteDates = Notes::where('kehamilan_id', $kehamilanId)
                ->select('notes_date')
                ->distinct()
                ->orderBy('notes_date', 'desc')
                ->get();

            return response()->json($noteDates);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'kehamilan_id' => 'required|integer',
                'notes_date' => 'required|date',
                'notes_time' => 'required|date_format:H:i',
                'mood' => 'nullable|string',
                'stress_level' => 'nullable|string',
                'stress_cause' => 'nullable|string',
                'weight' => 'nullable|numeric',
                'daily_activities' => 'nullable|array',
                'daily_activities.*' => 'string',
                'gejala_fisik' => 'nullable|array',
                'gejala_fisik.*' => 'string',
                'additional_notes' => 'nullable|string',
                'photo_path' => 'nullable|string',
                'baby_movement_frequency' => 'nullable|string',
                'baby_movement_time' => 'nullable|string',
                'movement_counter' => 'nullable|integer',
                'breast_condition' => 'nullable|string',
                'wound_condition' => 'nullable|string',
                'lochia_color' => 'nullable|string',
                'lochia_amount' => 'nullable|integer',
                'lochia_smell' => 'nullable|string',
            ]);

            // Simpan foto jika ada
            if ($request->hasFile('photo')) {
                $originalName = $request->file('photo')->getClientOriginalName();
                $path = $request->file('photo')->storeAs('foto_notes', $originalName, 'public');
                $data['photo_path'] = $originalName;
            }



            $note = Notes::create($data);
            return response()->json($note, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // update
    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'kehamilan_id' => 'required|integer',
                'notes_date' => 'required|date',
                'notes_time' => 'required|date_format:H:i',
                'mood' => 'nullable|string',
                'stress_level' => 'nullable|string',
                'stress_cause' => 'nullable|string',
                'weight' => 'nullable|numeric',
                'daily_activities' => 'nullable|array',
                'daily_activities.*' => 'string',
                'gejala_fisik' => 'nullable|array',
                'gejala_fisik.*' => 'string',
                'additional_notes' => 'nullable|string',
                'photo_path' => 'nullable|string',
                'baby_movement_frequency' => 'nullable|string',
                'baby_movement_time' => 'nullable|string',
                'movement_counter' => 'nullable|integer',
                'breast_condition' => 'nullable|string',
                'wound_condition' => 'nullable|string',
                'lochia_color' => 'nullable|string',
                'lochia_amount' => 'nullable|integer',
                'lochia_smell' => 'nullable|string',
            ]);

            // Simpan foto jika ada
            if ($request->hasFile('photo')) {
                $originalName = $request->file('photo')->getClientOriginalName();
                $path = $request->file('photo')->storeAs('foto_notes', $originalName, 'public');
                $data['photo_path'] = $originalName;
            }

            // Temukan catatan berdasarkan ID
            $note = Notes::findOrFail($id);
            $note->update($data);

            return response()->json($note, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $note = Notes::findOrFail($id);
            $note->delete();

            return response()->json(['message' => 'Note deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }


}
