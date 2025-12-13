<?php

use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\ClassController;
use App\Http\Controllers\Student\AttendanceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
|
| Routes accessible only by users with student role
|
*/

Route::middleware(['auth', 'verified', 'ensure.student'])->prefix('student')->name('student.')->group(function () {

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Classes
    Route::get('/classes', [ClassController::class, 'index'])->name('classes.index');
    Route::get('/classes/{id}', [ClassController::class, 'show'])->name('classes.show');

    // Attendance History
    Route::get('/attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::get('/attendance/statistics', [AttendanceController::class, 'statistics'])->name('attendance.statistics');
});
