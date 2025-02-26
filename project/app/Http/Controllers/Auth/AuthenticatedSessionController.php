<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Authenticate the user
        $request->authenticate();
    
        // Regenerate session to prevent session fixation attacks
        $request->session()->regenerate();

        // Get guest cart data from the request
        $guestCart = json_decode($request->header('X-Guest-Cart', '[]'), true);

        // If there are items in the guest cart, sync them
        if (!empty($guestCart)) {
            $user = Auth::user();
            
            foreach ($guestCart as $item) {
                $existingCartItem = Cart::where('user_id', $user->id)
                    ->where('product_id', $item['id'])
                    ->first();

                if ($existingCartItem) {
                    // Update existing cart item quantity
                    $existingCartItem->update([
                        'quantity' => $existingCartItem->quantity + $item['quantity']
                    ]);
                } else {
                    // Create new cart item
                    Cart::create([
                        'user_id' => $user->id,
                        'product_id' => $item['id'],
                        'quantity' => $item['quantity']
                    ]);
                }
            }
        }
    
        // Get the authenticated user for role check
        $user = Auth::user();
    
        // Redirect based on the user's role
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
    
        return redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}