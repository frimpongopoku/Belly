<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Auth; 
use App\PaperPiece;
use App\PicturePiece;
use App\User;
use App\Course;
use App\Like;
class Main extends Controller
{


  public function pictureLike(Request $request){
    $exists = Like::where(["user_id"=>$request->user_id, "picture_piece_id" =>$request->picture_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->picture_piece_id = $request->picture_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
        return $likedPiece;
      }
    }
  }
  public function like(Request $request){
    $exists = Like::where(["user_id"=>$request->user_id, "paper_piece_id" =>$request->paper_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first(); 
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->paper_piece_id = $request->paper_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first(); 
        return $likedPiece;
      }
    }
  }
  public function getAllCourses(){
    $allCourses = Course::all(); 
    return $allCourses;
  }
  public function gatherNews($point){
    //10 is the number of posts the user can retrieve each time they hit this link
    //point will be sent via the route to rep where in the db the user has reached
    // point * 10 would equal the number of items that the user can see
    //so the nextSetPoint would set the limit of the next set of va`1 lues by adding 10 to "alreadySent"
    //now get paginated values with respect to "nextSetPoint" 
    //then cut away the oldValues with "alreadySent" point then send only the next 10
    //*make the users choose other courses they would like to see news(questions) on
    $alreadySent = $point * 3;
    $nextSetPoint  = $alreadySent + 3;
    $texts = PaperPiece::where('course', Auth::user()->course)->with('user',"likes")->orderBy('id','DESC')->paginate($nextSetPoint);
    $pics = PicturePiece::where('course',Auth::user()->course)->with('user',"likes")->orderBy('id','DESC')->paginate($nextSetPoint);
    $texts = array_slice($this->objectToArray($texts),$alreadySent,$nextSetPoint+1);
    $pics = array_slice($this->objectToArray($pics),$alreadySent,$nextSetPoint+1);
    return [ 'texts'=>$texts , 'pics'=>$pics,"setNumber"=>$point +1];
  }
  public function objectToArray($obj){
    $temp = []; 
      foreach($obj as $one){
        array_push($temp, $one);
      }
    return $temp;
  }
	public function saveProfile(Request $request){
		$user = User::find(Auth::user()->id); 
		if($user){
			$user->update(['name'=>$request->name, 'number'=>$request->number,'course'=>$request->course, 'hall'=>$request->hall, 'school'=>$request->university,'email'=>$request->email]);
			return $user;
		}
		return $user;
	}
	public function deletePicture($id){
		$found = PicturePiece::find($id); 
		//delete image from the directory 
		unlink($found->picture_link);
		//delete image from the database
		$found->delete(); 
	}
	public function getToken(){
		return csrf_token();
	}
	public function editPaper(Request $request){
		$found = PaperPiece::find($request->id); 
		if($found){
			$found->update(['title'=>$request->title, 'body'=>$request->body]);
		}
	}
	public function getPicPapers(){
		$firstPicSet = Auth::user()->picturePieces()->orderBy('id','DESC')->paginate(6); 
		return $firstPicSet;
	}
	public function getPapers(){
		$firstTextSet = Auth::user()->paperPieces()->orderBy('id','DESC')->paginate(6); 
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
    $Paper->course = $request->course;
		if( $Paper->save()){
			return 'True'; 
		}
	}
    public function getAuthUser(){
    	//header('Content-Type: application/json');
    	return Auth::user();
    }

    public function dummy(){ 
      $found = PaperPiece::orderBy('id','DESC')->paginate(10);
      $temp =[];
      foreach($found as $f){
        array_push($temp,$f);
      }
      echo count($this->gatherNews(0));
      echo "<br/><br/><br/>";
      return $this->gatherNews(1);
    }
}
