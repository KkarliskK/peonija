<?php

namespace App\Services;

use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class BrevoEmailService
{
    protected $apiInstance;

    public function __construct()
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', config('services.brevo.key'));
        $this->apiInstance = new TransactionalEmailsApi(
            new Client(),
            $config
        );
    }

    /**
     * Send order confirmation email to customer
     *
     * @param Order $order
     * @return bool
     */
    public function sendOrderConfirmation(Order $order)
    {
        try {
            $orderItems = [];
            $total = 0;

            foreach ($order->items as $item) {
                $orderItems[] = [
                    'name' => $item->product->name ?? 'Product',
                    'quantity' => $item->quantity,
                    'price' => number_format($item->price, 2) . ' €'
                ];
                $total += $item->price * $item->quantity;
            }

            // Add delivery fee if present
            if ($order->delivery_fee > 0) {
                $total += $order->delivery_fee;
            }

            // Apply discount if present
            if ($order->discount > 0) {
                $total -= $order->discount;
            }

            $sendSmtpEmail = new SendSmtpEmail();
            $sendSmtpEmail->setTo([['email' => $order->email, 'name' => $order->name]]);
            $sendSmtpEmail->setTemplateId(1); //normal user template
            $sendSmtpEmail->setParams([
                'order_id' => $order->id,
                'customer_name' => $order->name,
                'order_date' => $order->created_at->format('Y-m-d H:i'),
                'order_items' => $orderItems,
                'subtotal' => number_format($total - ($order->delivery_fee ?? 0), 2) . ' €',
                'delivery_fee' => number_format($order->delivery_fee ?? 0, 2) . ' €',
                'discount' => number_format($order->discount ?? 0, 2) . ' €',
                'total' => number_format($total, 2) . ' €',
                'delivery_address' => $order->address,
                'delivery_option' => $order->metadata['delivery_option'] ?? 'pickup'
            ]);

            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
            Log::info('Customer confirmation email sent successfully via Brevo', [
                'order_id' => $order->id,
                'message_id' => $result->getMessageId()
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send customer confirmation email via Brevo', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    /**
     * Send new order notification to admin
     *
     * @param Order $order
     * @return bool
     */
    public function sendAdminNotification(Order $order)
    {
        try {
            $orderItems = [];
            $total = 0;

            foreach ($order->items as $item) {
                $orderItems[] = [
                    'name' => $item->product->name ?? 'Product',
                    'quantity' => $item->quantity,
                    'price' => number_format($item->price, 2) . ' €'
                ];
                $total += $item->price * $item->quantity;
            }

            // Add delivery fee if present
            if ($order->delivery_fee > 0) {
                $total += $order->delivery_fee;
            }

            // Apply discount if present
            if ($order->discount > 0) {
                $total -= $order->discount;
            }

            $adminEmail = config('mail.admin_email', 'zieduveikalspeonija@gmail.com');
            
            $sendSmtpEmail = new SendSmtpEmail();
            $sendSmtpEmail->setTo([['email' => $adminEmail, 'name' => 'Shop Admin']]);
            $sendSmtpEmail->setTemplateId(2); // Admin template
            $sendSmtpEmail->setParams([
                'order_id' => $order->id,
                'customer_name' => $order->name,
                'customer_email' => $order->email,
                'customer_phone' => $order->mobile,
                'order_date' => $order->created_at->format('Y-m-d H:i'),
                'order_items' => $orderItems,
                'subtotal' => number_format($total - ($order->delivery_fee ?? 0), 2) . ' €',
                'delivery_fee' => number_format($order->delivery_fee ?? 0, 2) . ' €',
                'discount' => number_format($order->discount ?? 0, 2) . ' €',
                'total' => number_format($total, 2) . ' €',
                'delivery_address' => $order->address,
                'delivery_option' => $order->metadata['delivery_option'] ?? 'pickup'
            ]);

            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
            Log::info('Admin notification email sent successfully via Brevo', [
                'order_id' => $order->id,
                'message_id' => $result->getMessageId()
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send admin notification email via Brevo', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }
}