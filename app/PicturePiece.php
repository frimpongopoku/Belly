<?php

namespace App;

use Illuminate\Database\Eloquent\Model; 

class PicturePiece extends Model
{
    public function scopeSearch($query, $keyword){
      return $query->whereHas('user',function($query) use ($keyword){
          $query->where('name','LIKE','%'.$keyword.'%')
          ->orWhere('school','%'.$keyword.'%');
      })
      ->orWhere('description','LIKE','%'.$keyword.'%')
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
