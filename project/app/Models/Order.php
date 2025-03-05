<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'customer_id', 
        'name', 
        'email', 
        'mobile', 
        'address', 
        'payment_method', 
        'total_price', 
        'discount',
        'delivery_fee',
        'status', 
        'session_id'
    ];

    // Relationships
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
