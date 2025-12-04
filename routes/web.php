<?php

use Illuminate\Support\Facades\Route;
use App\Enums\UserRole;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return auth()->check()
        ? redirect('/dashboard')
        : redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {

        $user = auth()->user();
        $roleValue = $user->role;

        // Handle missing role
        if (empty($roleValue)) {
            \Log::warning('User without role', ['user_id' => $user->id]);
            return redirect()->route('student.dashboard');
        }

        // Safely convert to enum
        $role = UserRole::tryFrom($roleValue);

        if (!$role) {
            \Log::error('Invalid user role', [
                'user_id' => $user->id,
                'role' => $roleValue,
            ]);
            return redirect()->route('student.dashboard');
        }

        // Ensure enum has dashboardRoute method
        if (!method_exists($role, 'dashboardRoute')) {
            \Log::error('Enum missing dashboardRoute()');
            return redirect()->route('student.dashboard');
        }

        return redirect()->route($role->dashboardRoute());
    })->name('dashboard');
});

// Include role-based route files
require __DIR__ . '/admin.php';
require __DIR__ . '/teacher.php';
require __DIR__ . '/student.php';

require __DIR__ . '/auth.php';
