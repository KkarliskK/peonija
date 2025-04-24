<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Product; 
use App\Models\Order;  

class NewsController extends Controller
{
    //to display the news in users dashboard
    public function index()
    {

        if (Auth::check() && Auth::user()->is_admin) {
            
            return Inertia::render('Admin/AdminDashboard', [
                'auth' => [
                    'user' => Auth::user(),
                ],
                'stats' => [
                    'productCount' => Product::count(),
                    'orderCount' => Order::count(),
                    'revenue' => Order::where('status', 'success')->sum('total_price'),
                ]
            ]);
        }

        $news = News::latest()->take(5)->get();
        
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'news' => $news
        ]);
    }

    //to render the admin adding news screen
    public function adminIndex()
    {
        $news = News::latest()->get();
        
        return Inertia::render('Admin/ManageNews', [
            'news' => $news,
            'auth' => [
                'user' => Auth::user(),
            ]
        ]);
    }
    
    //to add a new announcement
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'from_color' => 'required|string|max:50',
            'to_color' => 'required|string|max:50',
            'icon' => 'nullable|string|max:50',
        ]);
        
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        
        News::create([
            'title' => $request->title,
            'content' => $request->content,
            'from_color' => $request->from_color,
            'to_color' => $request->to_color,
            'icon' => $request->icon,
        ]);
        
        return redirect()->back()->with('success', 'News created successfully!');
    }
    
    //to update announcement
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'from_color' => 'required|string|max:50',
            'to_color' => 'required|string|max:50',
            'icon' => 'nullable|string|max:50',
        ]);
        
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        
        $news = News::findOrFail($id);
        $news->update([
            'title' => $request->title,
            'content' => $request->content,
            'from_color' => $request->from_color,
            'to_color' => $request->to_color,
            'icon' => $request->icon,
        ]);
        
        return redirect()->back()->with('success', 'News updated successfully!');
    }
    
    //to delete some announcement
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        
        return redirect()->back()->with('success', 'News deleted successfully!');
    }
}