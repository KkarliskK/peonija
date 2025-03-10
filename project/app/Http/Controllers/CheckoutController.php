<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; 
use Stripe\Stripe;
use App\Models\OrderItem; 
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use App\Mail\NewOrderNotification;



class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        // Log::debug('ALL COOKIES', [
        //     'all_cookies' => $request->cookies->all()
        // ]);

        $rawCookie = $request->cookie('guest_cart');
        
        // Log::debug('RAW GUEST CART COOKIE', [
        //     'raw_cookie' => $rawCookie,
        //     'raw_cookie_type' => gettype($rawCookie)
        // ]);

        $cartItems = $this->getCartItemsFromCookie($request);

        // Log::debug('Processed Cart Items', [
        //     'items' => $cartItems,
        //     'item_count' => count($cartItems)
        // ]);

        return inertia('Shop/Checkout', [
            'cartItems' => $cartItems
        ]);
    }

    private function getCartItemsFromCookie(Request $request)
    {
        $cartCookie = $request->cookie('guest_cart');

        // Log::debug('Cart Cookie Debug', [
        //     'raw_cookie' => $cartCookie,
        //     'cookie_type' => gettype($cartCookie)
        // ]);

        if ($cartCookie === null) {
            return [];
        }

        try {
            $cartItems = json_decode($cartCookie, true);
            
            if ($cartItems === null) {
                Log::warning('Failed to parse cart cookie', [
                    'cookie_content' => $cartCookie
                ]);
                return [];
            }

            return array_map(function($item) {
                $price = preg_replace('/[^0-9.]/', '', $item['price']);
                $item['price'] = floatval($price);
                return $item;
            }, $cartItems);
        } catch (\Exception $e) {
            Log::error('Cart Parsing Error', [
                'error' => $e->getMessage(),
                'cookie_content' => $cartCookie
            ]);
            return [];
        }
    }

public function createCheckoutSession(Request $request)
{
    try {
        $stripeSecret = config('services.stripe.secret');
        
        if (!$stripeSecret) {
            Log::error('Stripe Secret Key is not set');
            return response()->json(['error' => 'Stripe configuration is missing'], 500);
        }

        Stripe::setApiKey($stripeSecret);
    } catch (\Exception $e) {
        Log::error('Stripe API Key Configuration Error', [
            'error' => $e->getMessage()
        ]);
        return response()->json(['error' => 'Failed to configure Stripe: ' . $e->getMessage()], 500);
    }

    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'mobile' => 'required|string|max:20',
        'address' => 'sometimes|string|max:500',
        'deliveryOption' => 'required|in:delivery,pickup',
        'discount' => 'sometimes|numeric',
        'deliveryFee' => 'sometimes|numeric'
    ]);

    $cartCookie = $request->header('X-Cart-Cookie');
    
    if (!$cartCookie) {
        return response()->json(['error' => 'Cart is empty'], 400);
    }

    try {
        $cartItems = json_decode(urldecode($cartCookie), true);
        
        if (empty($cartItems)) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }
        
        // Convert to float to avoid rounding issues
        $totalAmount = array_reduce($cartItems, function($total, $item) {
            return $total + ($item['price'] * $item['quantity']);
        }, 0);
        
        $deliveryFee = $validatedData['deliveryOption'] === 'delivery' ? 2.99 : 0;
        $discount = $validatedData['discount'] ?? 0; // Get discount directly from frontend
        
        $totalAmountWithDelivery = $totalAmount + $deliveryFee - $discount;

        $userId = auth()->id();
        $customerId = $userId ? null : uniqid('guest_', true);

        $address = $validatedData['deliveryOption'] === 'pickup' 
            ? 'Uzvaras Bulvāris 1B' 
            : ($validatedData['address'] ?? '');

        $lineItems = [];
        foreach ($cartItems as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['name'] ?? 'Product',
                    ],
                    'unit_amount' => intval(round($item['price'] * 100)), // Convert to cents
                ],
                'quantity' => $item['quantity'] ?? 1,
            ];
        }

        if ($deliveryFee > 0) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Piegādes maksa',
                    ],
                    'unit_amount' => intval(round($deliveryFee * 100)), // Convert to cents
                ],
                'quantity' => 1,
            ];
        }

        // Use a Stripe coupon instead of a line item for the discount
        $discounts = [];
        if ($discount > 0) {
            $coupon = \Stripe\Coupon::create([
                'amount_off' => intval(round($discount * 100)), // Convert to cents
                'currency' => 'eur',
            ]);
            $discounts[] = ['coupon' => $coupon->id]; // Apply coupon to Stripe session
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}', 
            'cancel_url' => route('checkout.cancel'),
            'metadata' => [
                'delivery_option' => $validatedData['deliveryOption']
            ],
            'discounts' => $discounts // Apply discount properly
        ]);

        $order = Order::create([
            'user_id' => $userId,
            'customer_id' => $customerId,
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'mobile' => $validatedData['mobile'],
            'address' => $address,
            'payment_method' => 'stripe',
            'total_price' => $totalAmountWithDelivery,
            'discount' => $discount, 
            'delivery_fee' => $validatedData['deliveryFee'],
            'status' => 'pending',
            'session_id' => $session->id
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['sessionId' => $session->id]);
    } catch (\Exception $e) {
        Log::error('Checkout session creation error', [
            'error' => $e->getMessage()
        ]);

        return response()->json(['error' => 'Failed to create session: ' . $e->getMessage()], 500);
    }
}


public function success(Request $request)
    {
        try {
            $stripeSecret = config('services.stripe.secret');
            
            if (!$stripeSecret) {
                Log::error('Stripe Secret Key is not set');
                return redirect()->route('checkout.cancel')->with('error', 'Payment system configuration error');
            }

            Stripe::setApiKey($stripeSecret);

            $sessionId = $request->get('session_id');
            
            if (!$sessionId) {
                Log::error('No session ID provided');
                return redirect()->route('checkout.cancel')->with('error', 'Invalid payment session');
            }

            try {
                $session = Session::retrieve($sessionId);
            } catch (\Exception $e) {
                Log::error('Stripe Session Retrieval Error: ' . $e->getMessage());
                return redirect()->route('checkout.cancel')->with('error', 'Could not retrieve payment session');
            }
            
            $order = Order::where('session_id', $session->id)
                ->with('items.product')
                ->first();
            
            if (!$order) {
                Log::error('No order found for session: ' . $session->id);
                return redirect()->route('checkout.cancel')->with('error', 'Order not found');
            }
            
            try {
                $paymentIntent = \Stripe\PaymentIntent::retrieve($session->payment_intent);
            } catch (\Exception $e) {
                Log::error('Payment Intent Retrieval Error: ' . $e->getMessage());
                return redirect()->route('checkout.cancel')->with('error', 'Payment verification failed');
            }
            
            if (in_array($paymentIntent->status, ['succeeded', 'requires_capture'])) {
                $order->update([
                    'status' => 'success',
                    'stripe_payment_intent' => $paymentIntent->id
                ]);
                
                // Send confirmation emails
                $this->sendOrderEmails($order);
                
                $response = redirect()->route('order.success', ['sessionId' => $order->session_id]);
                $response->withCookie(cookie()->forget('guest_cart'));
                
                return $response;
            }
            
            return redirect()->route('checkout.cancel');

        } catch (\Exception $e) {
            Log::error('Unexpected error in Stripe success handler: ' . $e->getMessage());
            return redirect()->route('checkout.cancel')->with('error', 'An unexpected error occurred');
        }
    }

    /**
     * Send order confirmation emails to customer and shop admin
     */
    private function sendOrderEmails(Order $order)
    {
        try {
            Log::info('Attempting to send customer email', ['email' => $order->email]);
            Mail::to($order->email)->send(new OrderConfirmation($order));
            Log::info('Customer email sent successfully');
            
            $adminEmail = env('MAIL_ADMIN_EMAIL', 'zieduveikalspeonija@gmail.com');
            Log::info('Attempting to send admin email', ['email' => $adminEmail]);
            Mail::to($adminEmail)->send(new NewOrderNotification($order));
            Log::info('Admin email sent successfully');
            
            Log::info('All order confirmation emails sent successfully', ['order_id' => $order->id]);
        } catch (\Exception $e) {
            Log::error('Failed to send order confirmation emails', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    public function orderSuccess($sessionId)
    {
        $order = Order::where('session_id', $sessionId)
            ->with('items.product')
            ->firstOrFail();

        return Inertia::render('Shop/Success', [
            'order' => $order,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function cancel()
    {
        return inertia('Shop/Cancel'); 
    }

    public function history()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Shop/OrderHistory', ['orders' => $orders]);
    }
}