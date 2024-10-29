<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        // Fetch categories with their children and product counts
        $categories = Category::with(['children' => function($query) {
            $query->withCount('products');
        }])->withCount('products')->get();

        foreach ($categories as $category) {
            // Calculate total products including children
            $childProductsCount = $category->children->sum('products_count'); 
            $category->total_products_count = $category->products_count + $childProductsCount;
        }

        // Get all products
        $products = Product::withCount('likes')->get(); // Get products with like counts

        // If you want to check if the user has liked each product
        $user = Auth::user();
        if ($user) {
            $products->map(function ($product) use ($user) {
                // Check if the authenticated user has liked the product
                $product->is_liked = $product->likes()->where('user_id', $user->id)->exists();
                return $product;
            });
        }

        return Inertia::render('Shop/ShopView', [
            'products' => $products, 
            'categories' => $categories,
            'auth' => $user, // Passing the authenticated user, if available
        ]);
    }
}
