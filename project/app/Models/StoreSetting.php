<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreSetting extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'is_open',
        'working_hours',
        'special_closures',
    ];
    
    protected $casts = [
        'is_open' => 'boolean',
        'working_hours' => 'array',
        'special_closures' => 'array',
    ];
}