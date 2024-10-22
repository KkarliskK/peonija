<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{

    public function index()
    {
        $cart = Cart::with('items.product')->firstOrCreate([
            'user_id' => Auth::id(),
        ]);
        
        return Inertia::render('Shop/CartView', [
            'cartItems' => $cart->items,
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
    
        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
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
    
        // Retrieve the user's cart
        $cart = Auth::user()->cart;
    
        if (!$cart) {
            return redirect()->route('cart.index')->withErrors(['error' => 'No active cart found.']);
        }
    
        // Then check for the cart item
        $cartItem = CartItem::where('id', $cartItemId)
            ->where('cart_id', $cart->id) // Ensure the item belongs to the user's cart
            ->first();
    
        if ($cartItem) {
            $cartItem->quantity = $validated['quantity'];
            $cartItem->save();
            
            return redirect()->route('cart.index')->with('success', 'Quantity updated successfully!');
        }
    
        return redirect()->route('cart.index')->withErrors(['error' => 'Item not found in cart.']);
    }
    

    // Remove an item from the cart
    public function remove($cartItemId)
    {
        $cartItem = CartItem::where('id', $cartItemId)
            ->where('cart_id', Auth::user()->cart->id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
            // Refresh the cart items after removal
            $cartItems = Auth::user()->cart->items()->with('product')->get();

            // Return updated cart items and success message
            return redirect()->route('cart.index')->with([
                'cartItems' => $cartItems,
                'success' => 'Item removed from cart successfully!',
            ]);
        }

        // Flash an error message if the item was not found
        return redirect()->route('cart.index')->withErrors([
            'error' => 'Item not found in cart.',
        ]);
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
