<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    protected $fillable = ['facebook_link','whatsapp_number','linked_in_link','profile_picture'];
    public function user(){
      return $this->belongsTo("App\User");
    }
}
