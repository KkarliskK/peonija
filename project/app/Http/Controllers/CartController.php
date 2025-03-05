<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;

class CartController extends Controller
{
    public function guestIndex()
    {
        return Inertia::render('Shop/GuestCart');
    }

    public function setCartCookie(Request $request)
    {
        $cartData = $request->input('cart');
        
        return response()->json(['success' => true])
            ->withCookie(cookie()->forever('guest_cart', $cartData));
    }

    public function addToCart(Request $request)
    {
        $cart = json_decode($request->cookie('guest_cart') ?? '[]', true);

        $newItem = [
            'id' => $request->input('id'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'image' => $request->input('image'),
            'quantity' => $request->input('quantity', 1)
        ];

        $exists = false;
        foreach ($cart as &$item) {
            if ($item['id'] == $newItem['id']) {
                $item['quantity'] += $newItem['quantity'];
                $exists = true;
                break;
            }
        }

        if (!$exists) {
            $cart[] = $newItem;
        }

        return back()->withCookie(cookie()->forever('guest_cart', json_encode($cart)));
    }

    public function syncGuestCart(Request $request)
    {
        $guestCart = $request->input('cart', []);

        if (Auth::check()) {
            $userId = Auth::id();

            foreach ($guestCart as $item) {
                $existingCartItem = CartItem::where('user_id', $userId)
                    ->where('product_id', $item['id'])
                    ->first();

                if ($existingCartItem) {
                    $existingCartItem->update([
                        'quantity' => $existingCartItem->quantity + $item['quantity']
                    ]);
                } else {
                    CartItem::create([
                        'user_id' => $userId,
                        'product_id' => $item['id'],
                        'quantity' => $item['quantity']
                    ]);
                }
            }

            return response()->json([
                'message' => 'Cart synced successfully',
                'should_clear_guest_cart' => true
            ]);
        }

        return response()->json([
            'message' => 'Guest cart validated',
            'cart' => $guestCart
        ]);
    }

    public function index(Request $request)
{
    try {
        if (Auth::check()) {
            $cart = Cart::firstOrCreate([
                'user_id' => Auth::id()
            ]);

            $cartItems = CartItem::where('cart_id', $cart->id)
                ->with('product')
                ->get()
                ->map(function($item) {
                    return [
                        'id' => $item->id,
                        'cart_id' => $item->cart_id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'product' => $item->product ? [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                            'price' => $item->product->price,
                            'image' => $item->product->image,
                            'quantity' => $item->product->quantity
                        ] : null
                    ];
                });

            if ($request->expectsJson()) {
                return response()->json(['cartItems' => $cartItems]);
            }

            return Inertia::render('Shop/CartView', [
                'cartItems' => $cartItems,
            ]);
        } else {
            $guestCart = json_decode($request->cookie('guest_cart', '[]'), true);
            
            if ($request->expectsJson()) {
                return response()->json(['cartItems' => $guestCart]);
            }

            return Inertia::render('Shop/CartView', [
                'cartItems' => $guestCart,
            ]);
        }
    } catch (\Exception $e) {
        if ($request->expectsJson()) {
            return response()->json([
                'error' => 'Unable to retrieve cart',
                'message' => $e->getMessage()
            ], 500);
        }

        return Inertia::render('Shop/CartView', [
            'error' => 'Unable to retrieve cart',
            'message' => $e->getMessage()
        ]);
    }
}


    //for updating item in cart
    // public function update(Request $request, $cartItemId)
    // {
    //     $validated = $request->validate([
    //         'quantity' => 'required|integer|min:1',
    //     ]);
    
    //     $cart = Auth::user()->cart;
    
    //     if (!$cart) {
    //         return redirect()->route('cart.index')->withErrors(['error' => 'No active cart found.']);
    //     }
    
    //     $cartItem = CartItem::where('product_id', $cartItemId)
    //         ->where('cart_id', $cart->id)
    //         ->first();
    
    //     if (!$cartItem) {
    //         return redirect()->route('cart.index')->withErrors(['error' => 'Item not found in cart.']);
    //     }
    
    //     $cartItem->quantity = $validated['quantity'];
    //     $cartItem->save();
    
    //     return redirect()->route('cart.index')->with('success', 'Quantity updated successfully!');
    // }

    // //for removing item from cart
    // public function remove($id)
    // {
    //     $cartItem = CartItem::find($id);

    //     if ($cartItem) {
    //         $cartItem->delete();
    //         return redirect()->route('cart.index')->with('success', 'Successfully removed product from cart!');
    //     }

    //     return redirect()->route('cart.index')->withErrors(['error' => 'Can not delete product from cart.']);
    // }

    // //clearing the cart
    // public function clear()
    // {
    //     $cart = Auth::user()->cart;
    //     $cart->items()->delete();

    //     return redirect()->route('cart.index')->with([
    //         'cartItems' => [],
    //         'success' => 'Cart cleared successfully!',
    //     ]);
    // }

    //validation and adding cart for logged in users
    public function checkout()
    {
        $user = auth()->user(); 
     
        if (!$user) {
            return redirect('/login'); 
        }
     
        $cart = $user->carts()->first(); 
     
        if (!$cart) {
            return redirect('/shop')->with('message', 'No active cart found.');
        }
     
        $cartItems = $cart->cartItems()->with('product')->get(); 
     
        return inertia('Shop/Checkout', ['cartItems' => $cartItems]);
    }

    //checking first purchase to give user 10% discount
    public function checkFirstPurchaseRoute()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['isFirstPurchase' => false]);
        }

        $previousOrdersCount = Order::where('user_id', $user->id)
            ->where('status', 'success') 
            ->count();

        return response()->json([
            'isFirstPurchase' => $previousOrdersCount === 0
        ]);
    }
}
