<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Category;
use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $storeSettings = StoreSetting::first();
        $storeClosed = false;
        $closureReason = '';
        
        if ($storeSettings && !$storeSettings->is_open) {
            $storeClosed = true;
            $closureReason = 'Veikals šobrīd ir slēgts.';
        }
        
        if ($storeSettings && $storeSettings->special_closures) {
            $today = now()->format('Y-m-d');
            foreach ($storeSettings->special_closures as $closure) {
                if ($closure['date'] === $today) {
                    $storeClosed = true;
                    $closureReason = $closure['reason'];
                    break;
                }
            }
        }
        
        if ($storeSettings && $storeSettings->working_hours && !$storeClosed) {
            $today = now()->format('l'); 
            $currentTime = now()->format('H:i');
            
            foreach ($storeSettings->working_hours as $hours) {
                if ($hours['day'] === $today) {
                    if (!$hours['is_open']) {
                        $storeClosed = true;
                        $closureReason = 'Veikals šodien ir slēgts.';
                    } else {
                        if ($currentTime < $hours['open_time'] || $currentTime > $hours['close_time']) {
                            $storeClosed = true;
                            $closureReason = 'Veikals šobrīd ir slēgts. Darba laiks: ' . $hours['open_time'] . ' - ' . $hours['close_time'];
                        }
                    }
                    break;
                }
            }
        }

        $categories = Category::with(['children' => function($query) {
            $query->withCount('products');
        }])->withCount('products')->get();

        foreach ($categories as $category) {
            $childProductsCount = $category->children->sum('products_count'); 
            $category->total_products_count = $category->products_count + $childProductsCount;
        }

        $products = Product::withCount('likes')->get();

        $user = Auth::user();
        if ($user) {
            $products->map(function ($product) use ($user) {
                $product->is_liked = $product->likes()->where('user_id', $user->id)->exists();
                return $product;
            });
        }

        return Inertia::render('Shop/ShopView', [
            'products' => $products, 
            'categories' => $categories,
            'storeClosed' => $storeClosed,
            'closureReason' => $closureReason,
            'auth' => $user, 
        ]);
    }
}