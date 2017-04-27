<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use File;
use App\User;
class UserController extends Controller
{
    public function create(Request $request)
    {
    	$user = new User();
    	$user->name = $request->name;
    	$user->password = bcrypt($request->password);
    	$user->email = $request->email;
    	$user->save();
    	Auth::login($user);
		return response()->json([
			'status' => 'OK',
			'message' => 'Register successful',
			'redirect' => '/'
			]);
    	//return File::get(public_path() . '/dashboard.html');
    }
    public function getSelf()
    {
    	return Auth::user();
    }
}
