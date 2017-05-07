<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Database\Eloquent\Model;
use App\MonthEarning;
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
    public function child_partners_chart()
    {
        $childs = $this->hasMany('App\User', 'parent_partner')->get(['id', 'email', 'name']);
        $data = [];
        if(!$childs->isEmpty()){
            foreach($childs as $child){
                $monthOfChild = MonthEarning::currentMonth($child);
                $childArr = $child->toArray();
                $childArr['childs'] = $child->child_partners_chart();
                $childArr['child_count'] = $child->direct_child_count();
                $childArr['points'] = $monthOfChild->points;
                $childArr['earnings'] = $monthOfChild->earnings;
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
