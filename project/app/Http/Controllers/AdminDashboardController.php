<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Order;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Check if the user is authenticated and is an admin
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

        return Inertia::render('Error');
    }
}
