<?php

use App\Http\Controllers\Teacher\ClassController;
use App\Http\Controllers\Teacher\AttendanceController;
use App\Http\Controllers\Teacher\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
|
| Routes accessible only by users with teacher role
|
*/

Route::middleware(['auth', 'verified', 'ensure.teacher'])->prefix('teacher')->name('teacher.')->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Classes Management
    Route::resource('classes', ClassController::class);
    Route::post('classes/{class}/students', [ClassController::class, 'addStudent'])->name('classes.add-student');
    Route::delete('classes/{class}/students/{student}', [ClassController::class, 'removeStudent'])->name('classes.remove-student');

    // Attendance Management
    Route::get('classes/{class}/attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('attendance/mark', [AttendanceController::class, 'markAttendance'])->name('attendance.mark');
    Route::post('attendance/mark-all', [AttendanceController::class, 'markAllAttendance'])->name('attendance.mark-all');
    Route::post('attendance/face', [AttendanceController::class, 'faceAttendance'])->name('attendance.face');
    Route::post('classes/{class}/attendance/review', [AttendanceController::class, 'review'])->name('attendance.review');
    Route::post('classes/{class}/attendance/save-session', [AttendanceController::class, 'saveSession'])->name('attendance.save-session');
    Route::get('classes/{class}/attendance/report', [AttendanceController::class, 'report'])->name('attendance.report');
});
