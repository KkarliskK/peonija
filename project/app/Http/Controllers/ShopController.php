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
        $categories = Category::with(['children' => function($query) {
            $query->withCount('products');
        }])->withCount('products')->get();

        foreach ($categories as $category) {
            $childProductsCount = $category->children->sum('products_count'); 
            $category->total_products_count = $category->products_count + $childProductsCount;
        }

        $products = Product::all();

        return Inertia::render('Shop/ShopView', [
            'products' => $products,
            'categories' => $categories,
            'auth' => Auth::user(),
        ]);
    }
}
