<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
class CartController extends Controller
{
    public function getCart(Request $request)
    {
		$cart = $request->session()->get('cart');
		$data = [];
		foreach ($cart as $product_id => $quantity) {
			$product = Product::select(['id', 'name', 'price', 'image_path_min'])
				->where('id', $product_id)
				->first();
			$product["quantity"] = $quantity;
			array_push($data, $product);
		}
        return $data;
		//return $request->session()->get('cart');
	}
	public function addToCart(Request $request)
	{
		$cart = $request->session()->get('cart');
		$productIndex = (string)($request->productID);
		if(!array_key_exists($productIndex, $cart)){
			$cart[$productIndex] = 0;
		}
		$cart[$productIndex] += $request->txtCantidad;
		$request->session()->put('cart', $cart);
		return redirect('/sub/carrito.html');
	}
	public function removeProduct(Request $request, $product)
	{
		$cart = $request->session()->get('cart');
		$productIndex = (string)($product);
		unset($cart[$productIndex]);
		$request->session()->put('cart', $cart);
		return redirect('/sub/carrito.html');
	}
}
