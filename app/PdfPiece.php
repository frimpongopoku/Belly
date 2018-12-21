<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PdfPiece extends Model
{
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
}
