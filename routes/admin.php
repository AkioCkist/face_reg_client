<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaceController;
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

    // Face Management
    Route::prefix('faces')->name('faces.')->group(function () {
        Route::get('/', [FaceController::class, 'index'])->name('index');
        Route::get('/create', [FaceController::class, 'create'])->name('create');
        Route::post('/', [FaceController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [FaceController::class, 'edit'])->name('edit');
        Route::put('/{id}', [FaceController::class, 'update'])->name('update');
        Route::delete('/{id}', [FaceController::class, 'destroy'])->name('destroy');
        Route::get('/search', [FaceController::class, 'search'])->name('search');
    });
});
