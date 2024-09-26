<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UsrDashboardController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [UsrDashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/admin/admindashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard'); 
    
    // Categories Routes
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::put('/admin/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');

    // Manage Products Routes
    Route::match(['get', 'post'], '/admin/manageproducts/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Fallback route for 404 page
Route::fallback(function () {
    return Inertia::render('Error');
});

require __DIR__.'/auth.php';
