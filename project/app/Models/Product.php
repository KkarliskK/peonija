<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'price', 'is_available', 'quantity', 'category_id', 'image'];

    // For available item only sorting
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    //For unavailable item only sorting
    public function scopeUnavailable($query)
    {
        return $query->where('is_available', false);
    }

    // Define a relationship back to the category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    
    public function isLikedByUser($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }
}
