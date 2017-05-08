<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Eloquent\Model;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //users
        if(!Schema::hasTable('users')){
            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('parent_partner')->unsigned()->nullable();
                $table->string('name');
                $table->string('lastname1')->nullable();
                $table->string('lastname2')->nullable();
                $table->string('email')->unique();
                $table->string('password');
                $table->string('activation_token')->nullable();
                $table->date('birthdate')->nullable();
                $table->rememberToken();
                $table->boolean('onboarding')->default('0');
                $table->boolean('paymethod')->default('0');
                $table->boolean('account_activated')->default('0');
                $table->timestamps();
                $table->boolean('active')->default('1');
            });
            Schema::table('users', function($table){
                $table->foreign('parent_partner')->references('id')->on('users');
            });
        }
        //monthEarning
        if(!Schema::hasTable('month_earnings')){
            Schema::create('month_earnings', function(Blueprint $table){
                $table->increments('id');
                $table->integer('user_id')->unsigned();
                $table->foreign('user_id')->references('id')->on('users');
                $table->float('earnings', 8, 2)->default(0);
                $table->integer('points')->unsigned()->default(0);
                //$table->integer('month')->unsigned();
                //$table->integer('year')->unsigned();
                $table->date('date');
                $table->timestamps();
                $table->boolean('active')->default('1');
            });
        }
        //products
        if(!Schema::hasTable('products')){
            Schema::create('products', function(Blueprint $table){
                $table->increments('id');
                $table->string('name');
                $table->text('description');
                $table->string('image_path');
                $table->string('image_path_min');
                $table->float('price', 8, 2);
                $table->integer('points')->unsigned();
                $table->timestamps();
                $table->boolean('active')->default('1');
            });
        }
        //orders
        if(!Schema::hasTable('orders')){
            Schema::create('orders', function(Blueprint $table){
                $table->increments('id');
                $table->integer('user_id')->unsigned();
                $table->foreign('user_id')->references('id')->on('users');
                $table->float('total_price', 8, 2);
                $table->integer('total_points');
                $table->string('address');
                $table->timestamps();
                $table->boolean('active')->default('1');
            });
        }
        //order_product
        if(!Schema::hasTable('orders_products')){
            Schema::create('orders_products', function(Blueprint $table){
                $table->increments('id');
                $table->integer('order_id')->unsigned();
                $table->foreign('order_id')->references('id')->on('orders');
                $table->integer('product_id')->unsigned();
                $table->foreign('product_id')->references('id')->on('products');
                $table->timestamps();
                $table->boolean('active')->default('1');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders_products');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('month_earnings');
        DB::table('users')->where('id','>',0)->update(['parent_partner' => null]);
        Schema::dropIfExists('users');
        Schema::dropIfExists('testEntity');
    }
}
