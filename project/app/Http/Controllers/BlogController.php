<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
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
}