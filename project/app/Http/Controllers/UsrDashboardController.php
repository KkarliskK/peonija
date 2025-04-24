<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Product; 
use App\Models\Order;  

class UsrDashboardController extends Controller
{
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

        return Inertia::render('Dashboard');
    }
}