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
    protected $fillable = ['name', 'description', 'price', 'is_available', 'image', 'category_id'];

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
}
