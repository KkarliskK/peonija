<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductLikeController extends Controller
{

    public function toggleLike(Request $request, $id)
    {
        $user = auth()->user();
        $product = Product::findOrFail($id);
        
        $like = Like::where('user_id', $user->id)->where('product_id', $id)->first();
    
        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            Like::create(['user_id' => $user->id, 'product_id' => $id]);
            $liked = true;
        }
    
        return redirect()->back();
    }
}
