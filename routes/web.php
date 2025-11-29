<?php

use Illuminate\Support\Facades\Route;
use App\Enums\UserRole;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/dashboard');
    }
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Role-based dashboard redirect
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Check if user has a valid role
        if (empty($user->role)) {
            // Default to student if no role is set
            \Log::warning('User without role accessing dashboard', ['user_id' => $user->id]);
            return redirect()->route('student.dashboard');
        }

        try {
            $role = UserRole::from($user->role);

            // Redirect based on role:
            // - admin -> admin.dashboard
            // - teacher -> teacher.dashboard
            // - student -> student.dashboard
            return redirect()->route($role->dashboardRoute());
        } catch (\ValueError $e) {
            // If role is invalid, log and default to student
            \Log::error('Invalid user role', [
                'user_id' => $user->id,
                'role' => $user->role,
            ]);
            return redirect()->route('student.dashboard');
        }
    })->name('dashboard');
});

// Include role-based routes
require __DIR__ . '/admin.php';
require __DIR__ . '/teacher.php';
require __DIR__ . '/student.php';

require __DIR__ . '/auth.php';
