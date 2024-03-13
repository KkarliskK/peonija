<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function logout(Request $req){
        auth()->logout();
        return redirect(route('login'));
    }

    public function register(Request $req){
        $data = $req->validate([
            'name' => 'required|min:3',
            'username' => 'required|unique:users,username',
            'email' => 'required|unique:users,email',
            'mobile' => 'required|unique:users,mobile',
            'password' => 'required|min:8'
        ]);

        User::create($data);
        return back();
    }

    public function login(Request $req){
        $credentials = $req->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
 
        if (auth()->attempt($credentials)) {
            $req->session()->regenerate();
            return redirect(route('dashboard'));
        }
 
        return back()->withErrors([
            'error' => 'Username or password is incorrect!',
        ]);
    }
}
