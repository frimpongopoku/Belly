<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rep extends Model
{
    protected $fillable =["points"];
    public function user(){
      return $this->belongsTo("Ap\User");
    }
}
