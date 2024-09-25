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
            $products = Product::all();
            $categories = Category::all(); // Fetch all categories
    
            return Inertia::render('Admin/ManageProducts', [
                'products' => $products,
                'categories' => $categories, // Pass categories to the view
            ]);
        }
    
        return Inertia::render('Error');
    }
    

    // Get products from spesific cateogry
    public function productsByCategory($categoryId)
    {
        if (Auth::check() && Auth::user()->is_admin) {
            $category = Category::findOrFail($categoryId);
            $products = Product::where('category_id', $categoryId)->get();
            $categories = Category::all(); // Fetch all categories
    
            return Inertia::render('Admin/ManageProducts', [
                'category' => $category,
                'products' => $products,
                'categories' => $categories, // Pass categories to the view
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
            'category_id' => 'required|exists:categories,id' // Validation to ensure category exists
        ]);

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'is_available' => $request->is_available,
            'category_id' => $request->category_id, // Use the category_id from request data
        ]);

        $products = Product::all();

        return Inertia::render('Admin/ManageProducts', [
            'products' => $products,
        ]);
    }

}
