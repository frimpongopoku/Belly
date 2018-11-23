<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaperPiece extends Model

{

	protected $fillable = ['title','body','deleted'];
  //remember, the belongsTO method has to have the same name as the Model class it belongs to....
    public function scopeSearch($query, $keyword){
      return $query->whereHas('user',function($query) use ($keyword){
          $query->where('name','LIKE','%'.$keyword.'%')
          ->orWhere('school','%'.$keyword.'%');
      })
      ->orWhere('title','LIKE','%'.$keyword.'%')
      ->orWhere('course','LIKE','%'.$keyword.'%');
    }
    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function likes(){
      return $this->hasMany("App\Like");
    }
    public function comments(){
      return $this->hasMany("App\Comment");
    }
}
