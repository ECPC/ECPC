<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderProduct;
use App\Order;
use App\Product;
use Auth;
use App\MonthEarning;
class OrderController extends Controller
{
    public function create(Request $request)
    {
        //return $request->all();
    	$user = Auth::user();
    	$order = new Order();
    	$order->user_id = $user->id;
    	$order->address = $request->address? $request->address : "...";
    	$order->total_price = 0;
    	$order->total_points = 0;
    	$order->save();
    	$i = 0;
    	while($request->input("products.".$i)){
    		$product = Product::find($request->input("products.".$i));
            for($j = 0; $j < $request->input("quantity.".$i); $j++){
                $order->total_price += $product->price;
                $order->total_points += $product->points;
                //
                $order_product = new OrderProduct();
                $order_product->order_id = $order->id;
                $order_product->product_id = $product->id;
                $order_product->save();
            }
    		$i++;
    	}
		//Agregar ganancias
		$user->addEarnings($order->total_price);
		$month = MonthEarning::currentMonth($user);
		$month->points += $order->total_points;
		$month->save();
    	$order->save();
        $request->session()->put('cart', []);
    	return redirect('/sub/ultimasCompras.html');//$order;
    }
    public function history()
    {
    	$user = Auth::user();
    	$orders = Order::where('user_id', $user->id)
    		->orderBy('created_at', 'desc')
    		->get(['id', 'total_points', 'total_price', 'created_at']);
    	foreach ($orders as $order) {
    		$order["products"] = Order::find($order['id'])->products();
    		$order["created_at"];
    	}
    	return $orders;
    }
}
