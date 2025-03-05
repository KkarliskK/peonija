<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function privateRules()
    {
        return Inertia::render('PrivateRules');
    }
}