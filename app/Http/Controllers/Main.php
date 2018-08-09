<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth; 
use App\PaperPiece;

class Main extends Controller
{
	
	public function editPaper(Request $request){
		$found = PaperPiece::find($request->id); 
		if($found){
			$found->update(['title'=>$request->title, 'body'=>$request->body]);
		}
	}
	public function getPapers(){
		$firstTextSet = PaperPiece::where('deleted','0')->with('user')->orderBy('id','DESC')->paginate(6); 
		return $firstTextSet;
	}
	public function deletePaper($id){
		//find the paper, if it is found, check if the user owns the paper, then delete( turn the delete column to 1)
		$foundPaper = PaperPiece::find($id); 

		if($foundPaper){
			if (Auth::user()->id == $foundPaper->user->id){
				$foundPaper->update(['deleted'=>1]);
			}
		}
	}
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
    	$found = PaperPiece::with('user')->find(2); 

    	return $found;
    }
}
