<?php

use App\Http\Controllers\Teacher\AttendanceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
|
| Routes accessible only by users with teacher role
|
*/

Route::middleware(['auth', 'role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return inertia('Teacher/Dashboard');
    })->name('dashboard');

    // Attendance Management
    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/start', [AttendanceController::class, 'start'])->name('start');
        Route::post('/recognize', [AttendanceController::class, 'recognize'])->name('recognize');
        Route::get('/history', [AttendanceController::class, 'history'])->name('history');
        Route::get('/stats', [AttendanceController::class, 'stats'])->name('stats');
        Route::post('/export', [AttendanceController::class, 'export'])->name('export');
    });
});
