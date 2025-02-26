<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Product;
use App\Models\Category;
use App\Models\Like;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // All products
    public function index()
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $categories = Category::with(['children' => function($query) {
                $query->withCount('products');  
            }])->withCount('products')->get();
    
            foreach ($categories as $category) {
                $childProductsCount = $category->children->sum('products_count'); 
                $category->total_products_count = $category->products_count + $childProductsCount;
            }
    
            $products = Product::all();  
    
            return Inertia::render('Admin/ManageProducts', [
                'products' => $products,
                'categories' => $categories,
            ]);
        }
    
        return Inertia::render('Error');
    }
    
    
    

    // Get products from spesific cateogry
    public function productsByCategory($categoryId)
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $category = Category::with('subcategories')->findOrFail($categoryId);
            
            $products = Product::where('category_id', $categoryId)
                        ->orWhereIn('category_id', $category->subcategories()->pluck('id'))
                        ->get();
            
            $categories = Category::all(); 
    
            return Inertia::render('Admin/ManageProducts', [
                'category' => $category,
                'products' => $products,
                'categories' => $categories,
            ]);
        }
    
        return Inertia::render('Error');
    }
    
    

    // Only available products
    public function availableProducts()
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $availableProducts = Product::available()->get();

            return Inertia::render('Admin/ManageProducts', [
                'products' => $availableProducts,
            ]);
        }

        return Inertia::render('Error');
    }

    // Only disabled products
    public function unavailableProducts()
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $unavailableProducts = Product::unavailable()->get();

            return Inertia::render('Admin/ManageProducts', [
                'products' => $unavailableProducts,
            ]);
        }

        return Inertia::render('Error');
    }

    public function create(Request $request)
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $category_id = $request->query('category_id'); 
            $categories = Category::all(); 
        
            return Inertia::render('Admin/CreateProduct', [
                'categories' => $categories,
                'category_id' => $category_id,
            ]);
        }
    }

    public function fetchImages()
    {
        $baseDirectory = public_path('gallery'); 
        $files = File::allFiles($baseDirectory); 
    
        $imagesByCategory = [];
    
        foreach ($files as $file) {

            $pathParts = explode('/', $file->getRelativePathname());
            $category = $pathParts[0]; 
    
            if (!isset($imagesByCategory[$category])) {
                $imagesByCategory[$category] = [];
            }
    
            $imagesByCategory[$category][] = asset('gallery/' . $file->getRelativePathname());
        }
    
        return response()->json($imagesByCategory);
    }
    

    // Create a new product
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'is_available' => 'required|boolean',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable',
            'quantity' => 'min:0|required'
        ]);
    
        $product = Product::create($data);
    
        // Return a JSON response
        return response()->json([
            'message' => 'Produkts veiksmīgi pievienots!',
            'product' => $product,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'is_available' => 'required|boolean',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable',
            'quantity' => 'min:0|required'
        ]);

        $product = Product::findOrFail($id);

        $product->update($data);

        $products = Product::all();
        $category_id = $request->query('category_id'); 
        $categories = Category::all(); 

        return Inertia::render('Admin/ManageProducts', [
            'products' => $products,
            'categories' => $categories,
            'category_id' => $category_id,
        ]);
    }

  public function top(Request $request)
    {
        $top_products = Product::withCount('likes')
            ->with(['likes' => function ($query) use ($request) {
                $query->where('user_id', auth()->id());
            }])
            ->orderBy('times_purchased', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($product) {
                return [
                    ...$product->toArray(),
                    'is_liked' => $product->likes->isNotEmpty(),
                ];
            });

        return Inertia::render('Welcome', [
            'top_products' => $top_products,
        ]);
    }


    public function show($id)
    {
        $product = Product::findOrFail($id); 
        return Inertia::render('Shop/ProductView', [
            'product' => $product,
        ]);
    }

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

        return response()->json([
            'liked' => $liked,
            'likesCount' => $product->likes()->count()
        ]);
    }

    public function savedProducts(Request $request)
    {
        $user = $request->user();
        $likedProducts = $user->likedProducts()->with('category')->get();
    
        return Inertia::render('Shop/SavedProducts', [
            'auth' => $user,
            'likedProducts' => $likedProducts
        ]);
    }
    


}
