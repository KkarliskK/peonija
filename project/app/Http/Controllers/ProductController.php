<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // All products
    public function index()
    {
        if (Auth::check() && Auth::user()->is_admin) {
            // Fetch categories and eager load children and products count
            $categories = Category::with(['children' => function($query) {
                $query->withCount('products');  // Eager load products count for child categories
            }])->withCount('products')->get();
    
            // Manually aggregate products count for parent categories including their children
            foreach ($categories as $category) {
                $childProductsCount = $category->children->sum('products_count'); // Sum the products in child categories
                $category->total_products_count = $category->products_count + $childProductsCount;
            }
    
            $products = Product::all();  // Fetch all products (or adjust based on your needs)
    
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
            
            // Get all products for the category and its subcategories
            $products = Product::where('category_id', $categoryId)
                        ->orWhereIn('category_id', $category->subcategories()->pluck('id'))
                        ->get();
            
            $categories = Category::all(); // Fetch all categories
    
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

    // Only deactivated products
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

    // Create a new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'is_available' => 'required|boolean',
            'category_id' => 'required|exists:categories,id' ,
            'image' => 'required'
        ]);
    
        Product::create($request->only(['name', 'description', 'price', 'is_available', 'category_id', 'image']));
    
        // Flash a success message
        session()->flash('success', 'Product added successfully!');
    
        return redirect()->route('products.index');
    }
    

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->only(['name', 'description', 'price', 'is_available', 'category_id', 'image']));

        $products = Product::all();
        $category_id = $request->query('category_id'); 
        $categories = Category::all(); 

        return Inertia::render('Admin/ManageProducts', [
            'products' => $products,
            'categories' => $categories,
            'category_id' => $category_id,
        ]);
    }


}