<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UsrDashboardController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductLikeController;
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

    //for saving image path
    Route::get('/products/images', [ProductController::class, 'fetchImages']);


    // Manage Products Routes
    Route::match(['get', 'post'], '/admin/manageproducts/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);

    //Cart routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store');
    Route::post('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::post('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    //checkout routes
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout', [CartController::class, 'checkout'])->name('checkout');
    Route::post('/checkout/create-session', [CheckoutController::class, 'createCheckoutSession'])->name('checkout.createSession');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');

    Route::get('/order-history', [CheckoutController::class, 'history'])->name('order.history');

    Route::get('/saved-products', [ProductController::class, 'savedProducts'])->name('products.savedProducts');
});

//shop routes
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/', [ProductController::class, 'top'])->name('products.top');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

//shop liking function with atuh validation
Route::middleware('auth')->group(function () {
    Route::post('/products/{id}/like', [ProductController::class, 'toggleLike']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/galerija', function () {
    return Inertia::render('Shop/Gallery'); 
})->name('gallery.index');


// Fallback route for 404 page
Route::fallback(function () {
    return Inertia::render('Error');
});

Route::get('/config', function () {
    return response()->json([
        'stripe_key' => env('STRIPE_KEY'), 
    ]);
});

require __DIR__.'/auth.php';
