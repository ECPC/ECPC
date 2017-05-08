<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
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
}
