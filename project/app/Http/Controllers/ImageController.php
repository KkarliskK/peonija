<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index()
    {
        $baseDirectory = public_path('gallery');
        $directories = File::directories($baseDirectory);

        // Extract category folder names
        $categories = array_map('basename', $directories);

        // Send categories to Inertia view
        return Inertia::render('Admin/Slideshow', [
            'categories' => $categories,
        ]);
    }

    public function getCategoryImages($category)
    {
        $path = "gallery/$category";
        $files = File::files(public_path($path));

        // Map files to URLs
        $images = array_map(fn($file) => asset("gallery/$category/" . $file->getFilename()), $files);

        // Return images as JSON
        return response()->json($images);
    }
}
