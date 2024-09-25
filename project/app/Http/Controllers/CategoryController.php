<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Display the list of categories
    public function index()
    {
        if (Auth::check() && Auth::user()->is_admin) {
            // Retrieve all categories and eager load subcategories
            // Fetch only parent categories (where 'parent_id' is null)
            $categories = Category::with('children')->whereNull('parent_id')->get(); 

            return Inertia::render('Admin/Categories', [
                'categories' => $categories,
            ]);
        }

        return Inertia::render('Error');
    }

    // Store a new category (including subcategories)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategories' => 'nullable|array', // Validate subcategories as an array
            'subcategories.*.name' => 'required|string|max:255', // Validate each subcategory
            'subcategories.*.description' => 'nullable|string',
        ]);
    
        // Create the parent category
        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);
    
        // Create subcategories
        if ($request->has('subcategories')) {
            foreach ($request->subcategories as $subcategory) {
                $category->children()->create($subcategory);
            }
        }
    
        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }
    

    // Update an existing category (including subcategories)
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'subcategories' => 'nullable|array',
            'subcategories.*.name' => 'required|string|max:255',
            'subcategories.*.description' => 'nullable|string',
        ]);
    
        $category->update($request->only(['name', 'description']));
    
        // Handle subcategories
        if ($request->has('subcategories')) {
            // Clear existing subcategories if needed
            $category->children()->delete();
    
            foreach ($request->subcategories as $subcategory) {
                $category->children()->create($subcategory);
            }
        }
    
        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }
    

    // Delete a category (and handle subcategories if necessary)
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        // Delete the category (Laravel handles cascading deletion if set in migrations)
        $category->delete();

        // Handle success response
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
