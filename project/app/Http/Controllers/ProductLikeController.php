<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductLikeController extends Controller
{

    public function like(Product $product)
    {
        $user = auth()->user();
        $liked = $user->likes()->toggle($product->id);
        
        $likeCount = $product->likes()->count();

        return Inertia::render('ShopView', [
            'product' => [
                'id' => $product->id,
                'liked' => !empty($liked['attached']),
                'like_count' => $likeCount,
            ],
        ]);
    }
}
