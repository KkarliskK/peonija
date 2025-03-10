<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Notifications\ResetPassword;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        // Create a custom instance of the ResetPassword notification
        $notification = new ResetPassword($token);
        
        // Customize the notification here
        $notification->toMailUsing(function ($notifiable) use ($token) {
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('Peonija - Reset Your Password')
                ->greeting('Hello from Peonija!')
                ->line('You are receiving this email because we received a password reset request for your account.')
                ->action('Reset Password', url(route('password.reset', [
                    'token' => $token,
                    'email' => $notifiable->getEmailForPasswordReset(),
                ], false)))
                ->line('This password reset link will expire in '.config('auth.passwords.'.config('auth.defaults.passwords').'.expire').' minutes.')
                ->line('If you did not request a password reset, no further action is required.')
                ->salutation('Best regards,<br>The Peonija Team');
        });
        
        $this->notify($notification);
    }

    public function isAdmin(): bool
    {
        return $this->is_admin ?? false;
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function likes()
    {
        return $this->belongsToMany(Product::class, 'likes')->withTimestamps();
    }
    
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function likedProducts()
    {
        return $this->belongsToMany(Product::class, 'likes');
    }

    
}
