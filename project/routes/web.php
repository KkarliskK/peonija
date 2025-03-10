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
use App\Http\Controllers\ImageController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;


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

    //to get images for the slideshow
    Route::get('/slideshow', [ImageController::class, 'index'])->name('slideshow.index');
    Route::get('/categories/{category}/images', [ImageController::class, 'getCategoryImages'])->name('categories.images');

    // Manage Products Routes
    Route::match(['get', 'post'], '/admin/manageproducts/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
    //Edit product
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);
    // Toggle product availability
    Route::patch('/products/{product}/toggle-availability', [ProductController::class, 'toggleAvailability'])->name('products.toggle-availability');
    // Delete product
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    //Cart routes disabled becuase of better implementation
    // Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store');
    // Route::post('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
    // Route::post('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    // Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    //product routes
    Route::get('/order-history', [CheckoutController::class, 'history'])->name('order.history');
    Route::get('/saved-products', [ProductController::class, 'savedProducts'])->name('products.savedProducts');
});

//cart routes for guest / authenticated users
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::get('/check-first-purchase', [CartController::class, 'checkFirstPurchaseRoute']);
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');

// Blog routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

//shop routes
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/', [ProductController::class, 'top'])->name('products.top');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
//checkout
Route::post('/checkout/sync-cart', [CheckoutController::class, 'syncCart']);
Route::match(['get', 'post'], '/checkout', [CheckoutController::class, 'checkout'])->name('checkout');
Route::post('/checkout/store', [CheckoutController::class, 'storeCheckoutData'])->name('checkout.store');
Route::post('/checkout/create-session', [CheckoutController::class, 'createCheckoutSession'])->name('checkout.createSession');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success'); //for doing success payment stuff
Route::get('/order/success/{sessionId}', [CheckoutController::class, 'orderSuccess'])->name('order.success')->middleware('web'); //for showing the success page
Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');

//page routes
Route::get('/private-rules', [PageController::class, 'privateRules'])->name('private.rules');


//shop liking function with atuh validation
Route::middleware('auth')->group(function () {
    Route::post('/products/{id}/like', [ProductController::class, 'toggleLike']);
});

//profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//route for gallery
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
