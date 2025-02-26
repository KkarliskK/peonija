<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; 
use Stripe\Stripe;
use App\Models\OrderItem; 
use Stripe\Checkout\Session;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $user = auth()->user(); 
        
        if ($user) {
            $cart = $user->carts()->first();
        } else {
            $cart = session('guest_cart', []);
        }

        // If no cart is found, redirect to the shop
        if (empty($cart) || (is_array($cart) && count($cart) === 0)) {
            return redirect('/shop')->with('message', 'No active cart found.');
        }

        $cartItems = is_array($cart) ? $cart : $cart->cartItems()->with('product')->get();

        return inertia('Shop/Checkout', ['cartItems' => $cartItems]);
    }

    public function syncCart(Request $request)
    {
        $cartData = $request->input('cart', []);
        
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
            
            foreach ($cartData as $item) {
                $productId = $item['id'] ?? null;
                
                if (!$productId) {
                    continue; // Skip items without a valid product ID
                }
                
                $cartItem = CartItem::where('cart_id', $cart->id)
                                    ->where('product_id', $productId)
                                    ->first();

                if ($cartItem) {
                    $cartItem->quantity += $item['quantity']; 
                    $cartItem->save();
                } else {
                    CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $productId,
                        'quantity' => $item['quantity'],
                    ]);
                }
            }
        } else {
            session(['guest_cart' => $cartData]);
        }

        return response()->json(['success' => true]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255', 
            'address' => 'required|string|max:255',
            'paymentMethod' => 'required|string',
        ]);

        $userId = auth()->id() ?? session('guest_user_id');

        if (!$userId) {
            $userId = uniqid('guest_', true);  
            session(['guest_user_id' => $userId]);
        }

        $order = Order::create([
            'user_id' => $userId,
            'name' => $request->name,
            'email' => $request->email, 
            'address' => $request->address,
            'payment_method' => $request->paymentMethod,
            'total_price' => $this->calculateTotalPrice(),
        ]);

        foreach ($request->cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity'],
                'price' => $item['product']['price'],
            ]);
        }

        return redirect()->route('order.confirmation', $order->id);
    }

    private function calculateTotalPrice()
    {
        return 100.00;  
    }

    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET')); 

        $request->validate([
            'cartItems' => 'required|array',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ]);

        $request->session()->put('checkout_data', [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'address' => $request->input('address'),
        ]);
        $request->session()->put('cartItems', $request->input('cartItems'));

        $lineItems = [];
        foreach ($request->cartItems as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['product']['name'],
                    ],
                    'unit_amount' => (int)($item['product']['price'] * 100), 
                ],
                'quantity' => $item['quantity'],
            ];
        }

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('checkout.success'), 
                'cancel_url' => route('checkout.cancel'),   
            ]);

            return response()->json(['sessionId' => $session->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create session: ' . $e->getMessage()], 500);
        }
    }

    public function success(Request $request)
    {
        $userId = auth()->id() ?? session('guest_user_id');
        
        $cartItems = $request->session()->get('cartItems', []);
        $checkoutData = $request->session()->get('checkout_data', []);
        
        if (empty($cartItems) || empty($checkoutData)) {
            return redirect()->route('shop.index')->with('error', 'Your cart is empty or session data is missing.');
        }

        $totalPrice = array_reduce($cartItems, function ($total, $item) {
            return $total + ($item['product']['price'] * $item['quantity']);
        }, 0);

        $order = Order::create([
            'user_id' => $userId,
            'name' => $checkoutData['name'],
            'email' => $checkoutData['email'],
            'mobile' => $checkoutData['mobile'],
            'address' => $checkoutData['address'],
            'payment_method' => 'stripe',
            'total_price' => $totalPrice,
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity'],
                'price' => (float)$item['product']['price'],
            ]);

            $product = \App\Models\Product::find($item['product']['id']);
            
            if ($product) { 
                $product->quantity -= $item['quantity']; 
                
                if ($product->quantity < 0) {
                    $product->quantity = 0; 
                }
                
                $product->save(); 
            }
        }

        Cart::where('user_id', $userId)->delete();
        $request->session()->forget('cartItems');
        
        return inertia('Shop/Success', [
            'order' => $order->load('items.product'),
        ]);
    }

    public function history()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Shop/OrderHistory', ['orders' => $orders]);
    }

    public function cancel()
    {
        return inertia('Shop/Cancel'); 
    }
}