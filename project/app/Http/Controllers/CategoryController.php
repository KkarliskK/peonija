<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function index()
    {
        if (Auth::check() && Auth::user()->is_admin) {
    
            $categories = Category::all();

            return Inertia::render('Admin/Categories', [
                'categories' => $categories,
            ]);
        }

        return Inertia::render('Error');
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Create a new category using mass assignment
        Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        $categories = Category::all();

        return Inertia::render('Admin/Categories', [
            'categories' => $categories,
        ]);

        return Inertia::render('Admin/Categories');
    }
}


