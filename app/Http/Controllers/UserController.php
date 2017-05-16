<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use File;
use App\User;
use Illuminate\Support\Facades\Mail;
use Validator;
use App\MonthEarning;
class UserController extends Controller
{
    public function editInfo(Request $request)
    {
        $user = Auth::user();
        $user->name = $request->name;
        $user->apellido_paterno = $request->apellido_paterno;
        $user->apellido_materno = $request->apellido_materno;
        $user->birthdate = $request->birthdate;
        $user->calle_numero = $request->calle_numero;
        $user->colonia = $request->colonia;
        $user->municipio = $request->municipio;
        $user->estado = $request->estado;
        $user->codigo_postal = $request->codigo_postal;
        if($request->radiosGenero){
            if($request->radiosGenero== "Hombre"){
                $user->genero = 1;
            }else{
                $user->genero = 0;
            }
        }
        if($request->contrasenia){
            $user->contrasenia = $request->contrasenia;
        }
        //$user
        $user->save();
        return redirect("/sub/configuracionPersonal.html");//$request->all();//$user;
    }
    //params
    //@name
    //@email
    public function subscribe(Request $request)
    {
        $password = str_random(8);
        $user = new User();
        $user->parent_partner = Auth::user()->id;
        $user->name = $request->name;
        $user->password = bcrypt($password);
        $user->email = (string)$request->email;
        $user->birthdate = $request->birthdate;
        $user->activation_token = str_random(64);
        $user->account_activated = true;
        $user->save();
        MonthEarning::createHistory($user);
        //Send email
        UserController::SendSubscriptionEmail($user, $password);
        //UserController::SendActivationEmail($user);
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:255',
            'name' => 'required|max:255'
        ]);
        if(!$validator->fails()){
            $user = new User();
            $user->name = $request->name;
            $user->password = bcrypt($request->password);
            $user->email = (string)$request->email;
            $user->birthdate = $request->birthdate;
            $user->activation_token = str_random(64);
            $user->save();
            MonthEarning::createHistory($user);
            //Send email
            UserController::SendActivationEmail($user);
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                if(!Auth::user()->account_activated){
                    Auth::logout();
                }
            }
            Auth::login($user);
            return response()->json([
                'status' => 'OK',
                'message' => 'Register successful, waiting for email validation',
                'redirect' => '/emailCheck.html'
                ]);
        }
        return response()->json([
            'status' => 'ERR',
            'message' => 'Invalid inputs'
            ]);
    	//return File::get(public_path() . '/dashboard.html');
    }
    public function getSelf()
    {
        $user = Auth::user();
        $registerProgress = 0;
        if($user->name) $registerProgress += 10;
        if(!is_null($user->genero)) $registerProgress += 10;
        if($user->apellido_paterno) $registerProgress += 10;
        if($user->apellido_materno) $registerProgress += 10;
        if($user->birthdate) $registerProgress += 10;
        if($user->calle_numero) $registerProgress += 10;
        if($user->colonia) $registerProgress += 10;
        if($user->municipio) $registerProgress += 10;
        if($user->estado) $registerProgress += 10;
        if($user->codigo_postal) $registerProgress += 10;
        $user["registerProgress"] = $registerProgress;
    	return $user;//Auth::user();
    }
    public function selfPartnerNet()
    {
        $user = Auth::user();
        $childs = $user->child_partners_chart();
        $parent = $user->parent;
        $month = MonthEarning::currentMonth($user);
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'apellido_paterno' => $user->apellido_paterno,
            'apellido_materno' => $user->apellido_materno,
            'email' => $user->email,
            'parent' => $parent,
            'childs' => $childs,
            'child_count' => $user->direct_child_count(),
            'points' => $month->points,
            'earnings' => $month->earnings
            ]);
/*        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'parent' => $parent,
            'childs' => $childs
            ]);*/
    }
/*    public function partnerNet($id)
    {
        $user = User::find($id);
        $childs = $user->child_partners_chart;
        $parent = $user->parent;
        return response()->json([
            'parent' => $parent,
            'childs' => $childs
            ]);
    }*/
    public static function SendActivationEmail($user)
    {
        //$user = User::find($id);
        Mail::send('activationEmail', ["user" => $user], function($m) use ($user){
            $m->to((string)$user->email, "Usuario")->subject("Activación de la cuenta");
        });
    }
    public static function SendSubscriptionEmail($user, $password)
    {
        $parent = Auth::user();
        Mail::send('subscriptionEmail', ["parent" => $parent, "user" => $user, 'password' => $password], function($m) use ($user, $parent){
            $m->to((string)$user->email, "Usuario")->subject($parent->name." te ha subscrito a la red de EZPC");
        });
    }
    public function activateAccount($id, $activation_token)
    {
        $user = User::find($id);
        if($user->activation_token == $activation_token){
            $user->account_activated = true;
            $user->save();
            Auth::login($user);
        }
        return redirect("/");
    }
    public function activateAccountForced()
    {
        $user = Auth::user();
        $user->account_activated = true;
        $user->save();
        Auth::login($user);
        return redirect("/");
    }
    public function monthEarningsHistory()
    {
        $user = Auth::user();
        $earningsInfo = MonthEarning::history($user);
        $data = [
            'points' => $earningsInfo->reverse()->pluck('points'),
            'earnings' => $earningsInfo->reverse()->pluck('earnings')
        ];
        return $data;
    }
    public function selfProgressInfo()
    {
        $user = Auth::user();
        $currentMonthProgress = MonthEarning::currentMonth($user);
        $data = [];
        $data['partners'] = $user->direct_child_count();
        $data['earnings'] = $currentMonthProgress->earnings;
        $data['points'] = $currentMonthProgress->points;
        return $data;
    }
    public function onboardingComplete()
    {
        $user = Auth::user();
        $user->onboarding = true;
        $user->save();
    }
}
