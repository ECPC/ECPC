<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use Carbon\Carbon;
class MonthEarning extends Model
{
    public static function createHistory(User $user)
    {
    	$now = Carbon::now();
    	for($year = $now->year - 1; $year < $now->year + 1; $year++){	
	    	for($month = 1; $month < 13; $month++){
	    		$monthDate = Carbon::create($year, $month, 1);
	    		$monthEarning = new MonthEarning();
	    		$monthEarning->date = $monthDate;
	    		$monthEarning->user_id = $user->id;
	    		$monthEarning->save();
	    	}
    	}
    }
    public static function history(User $user)
    {
    	$now = Carbon::now();
    	$now->month--;
    	$history = MonthEarning::where('date', '<=', $now)
    		->where('user_id', $user->id)
    		->orderby('date', 'desc')
    		->limit(6)
    		->get(['points', 'earnings']);
    	return $history;
    }
    public static function currentMonth(User $user)
    {
        $now = Carbon::now();
        $month = MonthEarning::where('date', '<=', $now)
            ->where('user_id', $user->id)
            ->orderby('date', 'desc')
            ->first();
        return $month;
    }
}
