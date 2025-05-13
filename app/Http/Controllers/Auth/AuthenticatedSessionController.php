<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $userEmail = $request->email;

        $user = User::where('email', $userEmail)->first();
        if ($user && is_null($user->password)) {
            throw ValidationException::withMessages([
                'email' => 'This email is registered with Google. Please login with Google.',
            ]);
        }

        $request->authenticate();


        $request->session()->regenerate();
        Auth::login($user, true);


        return redirect()->intended(route('home', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect to the login page.
     */

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the Google callback.
     */

    public function handleGoogleCallback()
    {
        try {

            $googleUser = Socialite::driver('google')->user();

            // First try to find user by google_id
            $user = User::where('email', $googleUser->email)->first();

            // If not found, try to find by email

            // If user still not found, create a new one
            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'role' => 'user', // Default role
                    'password' => bcrypt(Str::random(16)), // Generate a random password
                    'email_verified_at' => now(),
                ]);
            }


        } catch (\Exception $e) {
            \Log::error('Google OAuth Error: ' . $e->getMessage());
            return redirect()->route('login')->withErrors([
                'google' => 'Failed to authenticate with Google. Please try again.'
            ]);
        }
        Auth::login($user, true);

        // Explicitly save the session before redirect
        session()->save();

        return redirect()->intended('home'); // Use simple path instead of route()
    }
}
