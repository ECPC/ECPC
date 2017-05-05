<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Database\Eloquent\Model;
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'activation_token'
    ];
    public function parent()
    {
        return $this->belongsTo('App\User', 'parent_partner');
    }
    public function child_partners()
    {
        $childs = $this->hasMany('App\User', 'parent_partner')->get(['id', 'email', 'name']);
        $data = [];
        if(!$childs->isEmpty()){
            foreach($childs as $child){
                $childArr = $child->toArray();
                $childArr['childs'] = $child->child_partners();
                array_push($data, $childArr);
            }
        }
        return $data;
        //return $this->hasMany('App\User', 'parent_partner');
    }
    public function direct_child_count()
    {
        return $this->hasMany('App\User', 'parent_partner')->count();
    }
    public function addEarnings($money)
    {
        $earning = $money * 0.1;
        $month = MonthEarning::currentMonth($this);
        $month->earnings += $earning;
        $month->save();
        if($this->parent){
            $this->parent->addEarnings($earning);
        }
    }
}
