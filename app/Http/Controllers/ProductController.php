<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
class ProductController extends Controller
{
    public function getAll()
    {
    	return Product::all();
    }
    public function getProduct($id)
    {
    	return Product::find($id);
    }
}
