<?php

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

/*Route::get('/', function () {
    return view('welcome');
});*/
//Aquí definimos una ruta, la ruta es equivalente a "host.com" o como sea que se llame el dominio
Route::get('/', function(){
	return File::get(public_path() . '/index.html');
});

Route::get('/api/token', function(){
	return csrf_token();
});

//Este es un grupo...
Route::group(['prefix' => 'api/testEntity'], function(){
	//...dentro del grupo se especifica una ruta a responder
	//Por ejemplo, la ruta que esta aquí sería el equivalente a "api/testEntity/create"
	Route::post('create', "EntityController@create");
	//Esta ruta se llama cuando solo se especifica el prefijo, en este caso "api/testEntity"
	Route::get('/', "EntityController@getAll");
	//Esta ruta se llama cuando se especifica algun otro valor, ejemplo "api/testEntity/xxx"
	//Es importante que este tipo de rutas esten declaradas al final de las demas...
	Route::get('{id}', "EntityController@get");
});
