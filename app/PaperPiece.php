<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaperPiece extends Model

{

	protected $fillable = ['title','body','deleted'];
	//remember, the belongsTO method has to have the same name as the Model class it belongs to....
    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function likes(){
      return $this->hasMany("App\Like");
    }
}
