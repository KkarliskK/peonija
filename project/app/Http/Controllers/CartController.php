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

    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login'); 
        }
        
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
