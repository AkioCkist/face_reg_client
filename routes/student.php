<?php

use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\AttendanceHistoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
|
| Routes accessible only by users with student role
|
*/

Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return inertia('Student/Dashboard');
    })->name('dashboard');

    // Profile Management
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('show');
        Route::put('/', [ProfileController::class, 'update'])->name('update');
        Route::post('/face', [ProfileController::class, 'registerFace'])->name('face.register');
        Route::put('/face/{faceId}', [ProfileController::class, 'updateFace'])->name('face.update');
    });

    // Attendance History
    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/history', [AttendanceHistoryController::class, 'index'])->name('history');
        Route::get('/stats', [AttendanceHistoryController::class, 'stats'])->name('stats');
        Route::post('/export', [AttendanceHistoryController::class, 'export'])->name('export');
    });
});
