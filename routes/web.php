<?php

//Este es un grupo...
/*Route::group(['prefix' => 'api/testEntity'], function(){
	//...dentro del grupo se especifica una ruta a responder
	//Por ejemplo, la ruta que esta aquí sería el equivalente a "api/testEntity/create"
	Route::post('create', "EntityController@create");
	//Esta ruta se llama cuando solo se especifica el prefijo, en este caso "api/testEntity"
	Route::get('/', "EntityController@getAll");
	//Esta ruta se llama cuando se especifica algun otro valor, ejemplo "api/testEntity/xxx"
	//Es importante que este tipo de rutas esten declaradas al final de las demas...
	Route::get('{id}', "EntityController@get");
});*/

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;

//{ BEGIN General
Route::get('/api/token', function(){
	return csrf_token();
});
//Aquí definimos una ruta, la ruta es equivalente a "host.com" o como sea que se llame el dominio
Route::get('/', function(){
    //return redirect('/index.html');
	if(Auth::check()){
		if(Auth::user()->account_activated){
    		return redirect('/dashboard.html');
		}
		else{
			Auth::logout();
		}
	}
	return File::get(public_path() . '/ezpc.html');
});
//TODO: crear control de sesión
Route::get('/api/logout', function(){
	Auth::logout();
	return redirect('/');
});
Route::post('/api/login', function(Request $request){
	if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
		if(Auth::user()->account_activated){
			return response()->json([
				'status' => 'OK',
				'message' => 'Login successful',
				'redirect' => '/'
				]);
		}
		else{
			//Auth::logout();
			return response()->json([
				'status' => 'ERR',
				'message' => '0',  //Email validation pending
				'redirect' => '/emailCheck.html'
				]);
		}
	}
	else{
		return response()->json([
			'status' => 'ERR',
			'message' => '1' //Wrong credentials
			]);
	}
});
//} END General

//User
Route::group(['prefix' => 'api/user'], function(){
	Route::post('create', 'UserController@create');
	Route::get('/', 'UserController@getSelf');
	Route::get('selfPartnerNet', 'UserController@selfPartnerNet');
	//Route::get('{id}/partnerNet', 'UserController@partnerNet');
	Route::get('{id}/activateAccount/{activation_token}', 'UserController@activateAccount');
	Route::get('activateAccountForced', 'UserController@activateAccountForced');
	Route::get('monthEarningsHistory', 'UserController@monthEarningsHistory');
	Route::post('/subscribe', 'UserController@subscribe');
	Route::get('progressInfo', 'UserController@selfProgressInfo');
	Route::get('onboardingComplete', 'UserController@onboardingComplete');
});
//Products
Route::group(['prefix' => 'api/product'], function(){
	Route::get('/', 'ProductController@getAll');
});
//Order
Route::group(['prefix' => 'api/order'], function(){
	//params, @products[], @address
	Route::post('create', 'OrderController@create');
	Route::get('history', 'OrderController@history');
});