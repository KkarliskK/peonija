<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Order; 
use Stripe\Stripe;
use App\Models\OrderItem; 
use Stripe\Checkout\Session;
use App\Models\Cart;
use App\Mail\NewOrderNotification;
use App\Mail\OrderReceipt;

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

    public function history()
    {
        // Get the orders for the authenticated user
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        // Pass the orders to the Inertia component
        return inertia('OrderHistory', ['orders' => $orders]);
    }

    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET')); // Set the Stripe secret key from .env
    
        $request->validate([
            'cartItems' => 'required|array',
        ]);
    
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

public function success()
{
    $userId = auth()->id();

    // Retrieve the last order
    $order = Order::where('user_id', $userId)->latest()->first();

    // Delete the cart items for the user
    Cart::where('user_id', $userId)->delete();

    // Send email to the shop
    Mail::to('zieduveikalspeonija@gmail.com')->send(new NewOrderNotification($order));

    // Send receipt to the customer using the email stored in the order
    Mail::to($order->email)->send(new OrderReceipt($order));

    return inertia('Shop/Success');
}


    public function cancel()
    {
        return inertia('Shop/Cancel'); 
    }
}
