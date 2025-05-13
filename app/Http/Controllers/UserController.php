<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    //
    public function getCurrentUser()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function updateUser(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone_number' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'address' => 'required|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('profile_pictures'), $filename);
            $user->profile_picture = $filename;
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|max:2048'
        ]);

        $user = Auth::user();
        $path = $request->file('profile_picture')->store('profile-pictures', 'public');

        $user->profile_picture = Storage::url($path);
        $user->save();

        return response()->json([
            'profile_picture' => $user->profile_picture
        ]);
    }
}
