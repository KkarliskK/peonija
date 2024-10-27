<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; 
use Stripe\Stripe;
use App\Models\OrderItem; 
use Stripe\Checkout\Session;
use App\Models\Cart;
use App\Mail\OrderNotification;
use App\Mail\OrderReceipt;
use Illuminate\Support\Facades\Mail;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255', 
            'address' => 'required|string|max:255',
            'paymentMethod' => 'required|string',
        ]);
    
        $order = Order::create([
            'user_id' => auth()->id(),
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
    
        // Store checkout data in session
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
            \Log::error('Stripe Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create session: ' . $e->getMessage()], 500);
        }
    }
    

    public function success(Request $request)
    {
        $userId = auth()->id();

        $user = auth()->user();
    
        // Retrieve cart items and checkout data from session
        $cartItems = $request->session()->get('cartItems', []);
        $checkoutData = $request->session()->get('checkout_data', []);
    
        if (empty($cartItems) || empty($checkoutData)) {
            return redirect()->route('shop.index')->with('error', 'Your cart is empty or session data is missing.');
        }
    
        // Calculate total price
        $totalPrice = array_reduce($cartItems, function ($total, $item) {
            return $total + ($item['product']['price'] * $item['quantity']);
        }, 0);
    
        // Create the order
        $order = Order::create([
            'user_id' => $userId,
            'name' => $user->name,
            'email' => $user->email,
            'mobile' => $checkoutData['mobile'],
            'address' => $checkoutData['address'],
            'payment_method' => 'stripe',
            'total_price' => $totalPrice,
        ]);

        // Insert order items
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']['id'],
                'quantity' => $item['quantity'],
                'price' => (float)$item['product']['price'],
            ]);
        }

        // Clear cart items for the user after order completion
        Cart::where('user_id', $userId)->delete();

        // Optionally, remove cart session data
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

        // Pass the orders to the Inertia component
        return inertia('Shop/OrderHistory', ['orders' => $orders]);
    }

    
    


    public function cancel()
    {
        return inertia('Shop/Cancel'); 
    }
}
