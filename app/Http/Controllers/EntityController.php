<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TestEntity;
class EntityController extends Controller
{
	public function create(Request $request){
		$entity = new TestEntity();
		$entity->value = $request->value;
		$entity->save();
		return $entity;
	}

    public function getAll()
    {
		return TestEntity::all();
    }

    public function get($id)
    {
		return TestEntity::find($id);
    }
}
