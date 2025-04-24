<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Blog;

class BlogController extends Controller
{
    /**
     * Display a listing of blog posts.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $blogs = Blog::latest()->get();
        
        return Inertia::render('Blog/AllBlogs', [
            'blogs' => $blogs
        ]);
    }

    /**
     * Display the specified blog post.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        
        // Get related posts (you can customize this to match your requirements)
        $relatedPosts = Blog::where('id', '!=', $blog->id)
            ->latest()
            ->take(3)
            ->get();
        
        return Inertia::render('Blog/SingleBlog', [
            'blog' => $blog,
            'relatedPosts' => $relatedPosts
        ]);
    }

    public function adminIndex()
    {

    if (!Auth::check() || !Auth::user()->is_admin) {
        abort(403, 'Unauthorized action.');
    }        
        $blogs = Blog::latest()->get();
        
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => $blogs
        ]);
    }
    
    public function create()
    {

    if (!Auth::check() || !Auth::user()->is_admin) {
        abort(403, 'Unauthorized action.');
    }        
        return Inertia::render('Admin/Blog/Create');
    }
    
    public function store(Request $request)
    {

    if (!Auth::check() || !Auth::user()->is_admin) {
        abort(403, 'Unauthorized action.');
    }        
        $validated = $request->validate([
            'title' => 'required|max:255',
            'slug' => 'required|max:255|unique:blogs',
            'excerpt' => 'nullable|max:500',
            'content' => 'required',
            'image_url' => 'nullable|url|max:1000',
        ]);
        
        Blog::create($validated);
        
        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully!');
    }
    
    public function edit(Blog $blog)
    {

    if (!Auth::check() || !Auth::user()->is_admin) {
        abort(403, 'Unauthorized action.');
    }        
        return Inertia::render('Admin/Blog/Edit', [
            'blog' => $blog
        ]);
    }
    
    public function update(Request $request, Blog $blog)
    {

    if (!Auth::check() || !Auth::user()->is_admin) {
        abort(403, 'Unauthorized action.');
    }        
        $validated = $request->validate([
            'title' => 'required|max:255',
            'slug' => 'required|max:255|unique:blogs,slug,' . $blog->id,
            'excerpt' => 'nullable|max:500',
            'content' => 'required',
            'image_url' => 'nullable|url|max:1000',
        ]);
        
        $blog->update($validated);
        
        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully!');
    }
    
    public function destroy(Blog $blog)
    {

        if (!Auth::check() || !Auth::user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }        
        if ($blog->image_url && Storage::exists('public/' . str_replace('/storage/', '', $blog->image_url))) {
            Storage::delete('public/' . str_replace('/storage/', '', $blog->image_url));
        }
        
        $blog->delete();
        
        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully!');
    }
}