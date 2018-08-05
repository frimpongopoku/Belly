<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth; 
use App\PaperPiece;

class Main extends Controller
{

	public function saveTextPiece(Request $request){
		$Paper = new PaperPiece(); 
		$Paper->name = $request->name;
		$Paper->user_id = $request->user_id; 
		$Paper->title = $request->title; 
		$Paper->body = $request->body; 
		if( $Paper->save()){
			return 'True'; 
		}
	}
    public function getAuthUser(){
    	//header('Content-Type: application/json');
    	return Auth::user();
    }

    public function dummy(){ 
    	$g = ['agyingo'=>'boys','adisco'=>'gals','crhome'=>'explorer']; 

    	return $g;
    }
}
