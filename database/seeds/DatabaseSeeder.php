<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Product;
use App\MonthEarning;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //Creando usuarios de prueba con socios
        $user;
        $user = new User();
        $user->name = 'test1';
        $user->email = 'test1@hotmail.com';
        $user->password = bcrypt('test1');
        $user->paymethod = true;
        $user->account_activated = true;
        $user->save();
        MonthEarning::createHistory($user);
        for($i = 2 ; $i < 6; $i++){
	        $user = new User();
	        $user->name = 'test'.$i;
	        $user->email = 'test'.$i.'@hotmail.com';
	        $user->password = bcrypt('test'.$i);
	        $user->parent_partner = 1;
	        $user->paymethod = true;
        	$user->account_activated = true;
	        $user->save();
        	MonthEarning::createHistory($user);
        }
        //Productos
        for($i = 1 ; $i < 11; $i++){
	        $product = new Product();
	        $product->name = 'producto'.$i;
	        $product->description = 'descripción de producto'.$i;
	        $product->image_path = '/img/productos/producto'.$i.'.png';
	        $product->price = $i * 200;
	        $product->points = $i * 4;
	        $product->save();
        }
        //
    }
}
