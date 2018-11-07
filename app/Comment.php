<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user(){
      return $this->belongsTo("App\User");
    }

    public function paperPiece(){
      return $this->belongsTo("App\PaperPiece");
    }
    public function picturePiece(){
      return $this->belongsTo("App\PicturePiece");
    }
}
