<?php
namespace App\Mail\Orders;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderReceipt extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject('Your Order Receipt')
                    ->markdown('emails.order_receipt')
                    ->with('order', $this->order);
    }
}
