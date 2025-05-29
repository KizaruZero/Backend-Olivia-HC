<?php

namespace App\Http\Controllers;

use App\Models\KB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class KBController extends Controller
{
    /**
     * Display a listing of the KB records.
     */
    public function index()
    {
        $kbRecords = KB::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $kbRecords
        ]);
    }

    /**
     * Store a newly created KB record.
     */
    public function store(Request $request)
    {
        $kbTypes = [
            'Metode operasi wanita (MOW)/tubektomi, metode operasi pria (MOP)/ vasektomi',
            'Implan',
            'IUD',
            'Kontrasepsi suntik 3 bulan atau 1 bulan',
            'Pil KB',
            'Kondom'
        ];

        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'tipe_kb' => ['required', Rule::in($kbTypes)],
            'catatan' => 'nullable|string|max:255',
            'status_kb' => 'required|in:aktif,tidak_aktif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // If status is aktif, deactivate other active KB records
        if ($request->status_kb === 'aktif') {
            KB::where('user_id', Auth::id())
                ->where('status_kb', 'aktif')
                ->where('id', '!=', $request->id)
                ->update(['status_kb' => 'tidak_aktif']);
        }

        $kb = KB::create([
            'user_id' => Auth::id(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'tipe_kb' => $request->tipe_kb,
            'catatan' => $request->catatan,
            'status_kb' => $request->status_kb
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'KB record created successfully',
            'data' => $kb
        ], 201);
    }

    /**
     * Display the specified KB record.
     */
    public function show($id)
    {
        $kb = KB::where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $kb
        ]);
    }

    /**
     * Update the specified KB record.
     */
    public function update(Request $request, $id)
    {
        $kbTypes = [
            'Metode operasi wanita (MOW)/tubektomi, metode operasi pria (MOP)/ vasektomi',
            'Implan',
            'IUD',
            'Kontrasepsi suntik 3 bulan atau 1 bulan',
            'Pil KB',
            'Kondom'
        ];

        $kb = KB::where('user_id', Auth::id())
            ->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'tipe_kb' => ['sometimes', 'required', Rule::in($kbTypes)],
            'catatan' => 'nullable|string|max:255',
            'status_kb' => 'sometimes|required|in:aktif,tidak_aktif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // If status is being changed to aktif, deactivate other active KB records
        if ($request->has('status_kb') && $request->status_kb === 'aktif') {
            KB::where('user_id', Auth::id())
                ->where('id', '!=', $id)
                ->where('status_kb', 'aktif')
                ->update(['status_kb' => 'tidak_aktif']);
        }



        // Update only the fields that are present in the request
        $updateData = array_filter($request->all(), function ($value) {
            return $value !== null && $value !== '';
        });

        $kb->update($updateData);

        $kb->refresh();

        return response()->json([
            'status' => 'success',
            'message' => 'KB record updated successfully',
            'data' => $kb
        ]);
    }

    /**
     * Remove the specified KB record.
     */
    public function destroy($id)
    {
        $kb = KB::where('user_id', Auth::id())
            ->findOrFail($id);

        $kb->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'KB record deleted successfully'
        ]);
    }
}
