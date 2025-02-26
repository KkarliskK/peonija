<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function guestIndex()
    {
        return Inertia::render('Shop/GuestCart');
    }

    public function syncGuestCart(Request $request)
    {
        // Retrieve the cart data sent by the frontend
        $guestCart = $request->input('cart', []);

        if (Auth::check()) {
            // User is logged in
            $userId = Auth::id();

            foreach ($guestCart as $item) {
                // Check if the item exists for the user
                $existingCartItem = CartItem::where('user_id', $userId)
                    ->where('product_id', $item['id'])
                    ->first();

                if ($existingCartItem) {
                    // Update the quantity if the item already exists in the user's cart
                    $existingCartItem->update([
                        'quantity' => $existingCartItem->quantity + $item['quantity']
                    ]);
                } else {
                    // Create a new CartItem for the user
                    CartItem::create([
                        'user_id' => $userId,
                        'product_id' => $item['id'],
                        'quantity' => $item['quantity']
                    ]);
                }
            }

            // After syncing the guest cart, we can clear it from session or local storage
            return response()->json([
                'message' => 'Cart synced successfully',
                'should_clear_guest_cart' => true
            ]);
        }

        // If user is not logged in, just return the guest cart
        return response()->json([
            'message' => 'Guest cart validated',
            'cart' => $guestCart
        ]);
    }

public function index(Request $request)
{
    if ($request->expectsJson()) { // Check if it's an API request
        if (Auth::check()) {
            $cart = Cart::with('items.product')->firstOrCreate([
                'user_id' => Auth::id(),
            ]);
            return response()->json(['cartItems' => $cart->items]);
        } else {
            $guestCart = session()->get('guest_cart', []);
            return response()->json(['cartItems' => $guestCart]);
        }
    }

    // If it's a normal page request, return the Inertia view
    return Inertia::render('Shop/CartView', [
        'cartItems' => Auth::check() ? Cart::with('items.product')->firstOrCreate([
            'user_id' => Auth::id(),
        ])->items : session()->get('guest_cart', []),
    ]);
}


    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = auth()->user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        $cartItem = CartItem::where('cart_id', $cart->id)
                              ->where('product_id', $validated['product_id'])
                              ->first();

        $product = Product::find($validated['product_id']);
        if ($product->quantity < $validated['quantity']) {
            return response()->json(['error' => 'Requested quantity exceeds available stock.'], 400);
        }

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $validated['quantity'];

            // Check again if the new quantity exceeds available stock
            if ($product->quantity < $newQuantity) {
                return response()->json(['error' => 'Requested quantity exceeds available stock.'], 400);
            }

            $cartItem->quantity = $newQuantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return Inertia::render('Shop/ShopView', [
            'cartItems' => $cart->items,
        ]);
    }

    public function update(Request $request, $cartItemId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
    
        $cart = Auth::user()->cart;
    
        if (!$cart) {
            return redirect()->route('cart.index')->withErrors(['error' => 'No active cart found.']);
        }
    
        $cartItem = CartItem::where('product_id', $cartItemId)
            ->where('cart_id', $cart->id)
            ->first();
    
        if (!$cartItem) {
            return redirect()->route('cart.index')->withErrors(['error' => 'Item not found in cart.']);
        }
    
        $cartItem->quantity = $validated['quantity'];
        $cartItem->save();
    
        return redirect()->route('cart.index')->with('success', 'Quantity updated successfully!');
    }

    public function remove($id)
    {
        $cartItem = CartItem::find($id);

        if ($cartItem) {
            $cartItem->delete();
            return redirect()->route('cart.index')->with('success', 'Successfully removed product from cart!');
        }

        return redirect()->route('cart.index')->withErrors(['error' => 'Can not delete product from cart.']);
    }

    // Clear the cart
    public function clear()
    {
        $cart = Auth::user()->cart;
        $cart->items()->delete();

        // Return success message and empty cart items
        return redirect()->route('cart.index')->with([
            'cartItems' => [],
            'success' => 'Cart cleared successfully!',
        ]);
    }

    public function checkout()
    {
        $user = auth()->user(); 
     
        if (!$user) {
            return redirect('/login'); 
        }
     
        // Fetch the user's active cart
        $cart = $user->carts()->first(); 
     
        // Handle the case where no active cart is found
        if (!$cart) {
            return redirect('/shop')->with('message', 'No active cart found.');
        }
     
        // Fetch the cart items associated with the cart, including product details
        $cartItems = $cart->cartItems()->with('product')->get(); // Eager load the product
     
        return inertia('Shop/Checkout', ['cartItems' => $cartItems]);
    }
}
