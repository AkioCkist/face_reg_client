<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaceController;
use App\Http\Controllers\Admin\StudentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Routes accessible only by users with admin role
|
*/

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Student Management
    Route::prefix('students')->name('students.')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('index');
        Route::get('/create', [StudentController::class, 'create'])->name('create');
        Route::post('/', [StudentController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [StudentController::class, 'edit'])->name('edit');
        Route::put('/{user}', [StudentController::class, 'update'])->name('update');
        Route::delete('/{user}', [StudentController::class, 'destroy'])->name('destroy');
        Route::delete('/{user}/face', [StudentController::class, 'removeFace'])->name('removeFace');
    });

    // Face Management
    Route::prefix('faces')->name('faces.')->group(function () {
        Route::get('/', [FaceController::class, 'index'])->name('index');
        Route::get('/create', [FaceController::class, 'create'])->name('create');
        Route::post('/', [FaceController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [FaceController::class, 'edit'])->name('edit');
        Route::put('/{id}', [FaceController::class, 'update'])->name('update');
        Route::delete('/{id}', [FaceController::class, 'destroy'])->name('destroy');
        Route::get('/search', [FaceController::class, 'search'])->name('search');
        Route::get('/search-students', [FaceController::class, 'searchStudents'])->name('searchStudents');
    });
});