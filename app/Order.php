<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use App\User;
use App\Product;
use App\OrderProduct;
use App\MonthEarning;
use Carbon\Carbon;
class Order extends Model
{
	protected $dates = ['created_at', 'updated_at'];
    function products()
    {
    	return DB::table('products')
    		->select(DB::raw('products.id, products.name, products.price, count(*) as count, SUM(products.price) as total_price'))
    		->join('orders_products', 'products.id', 'orders_products.product_id')
    		->where('order_id', $this->id)
    		->groupBy('products.id')
    		->get();
    	//return $this->hasManyThrough('App\Product', 'App\OrderProduct');//belongsToMany('App\Product')->using('App\OrderProduct');
    }


    public function getCreatedAtAttribute($value)
    {
        return Carbon::createFromTimestamp(strtotime($value))
            ->timezone('America/Monterrey')
            ->toDateTimeString()
        ;
    }

    public static function createFictionalOrder(User $user, Product $product, MonthEarning $month)
    {
        $order = new Order();
        $order->user_id = $user->id;
        $order->address = "...";
        $order->total_price = 0;
        $order->total_points = 0;
        $order->save();

        $order->total_price += $product->price;
        $order->total_points += $product->points;
        //
        $order_product = new OrderProduct();
        $order_product->order_id = $order->id;
        $order_product->product_id = $product->id;
        $order_product->save();
        //Agregar ganancias
        $user->addEarningsToMonth($order->total_price, $month);
        //$month = MonthEarning::currentMonth($user);
        $month->points += $order->total_points;
        $month->save();
        $order->save();
        //return $order;
    }
}
