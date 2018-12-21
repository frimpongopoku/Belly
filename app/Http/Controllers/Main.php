<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Auth; 
use App\PaperPiece;
use App\PicturePiece;
use App\User;
use App\Course;
use App\Like;
use App\Comment;
use App\Rep;
use App\PdfPiece;
class Main extends Controller
{



    public function deletePDF($id){
      $found = PdfPiece::findOrFail($id); 
      $found->delete();
    }
  public function getPdfNews($point){
    $related  = PdfPiece::where('course','!=',Auth::user()->course)->with('user')->skip($point * 3)->take(3)->get();
    return $related;
  }
  public function getRelations(){
    $user = User::where('id',Auth::user()->id)->with('reputation')->first();
    return $user;
  }

  public function viewProfile($id, $name){
    $user = User::where(['id'=>$id,'name'=>$name])->with('picturePieces','paperPieces')->firstOrFail(); 
    $papers = PaperPiece::where('user_id',$user->id)->latest()->paginate(2); 
    $pictures = PicturePiece::where('user_id',$user->id)->latest()->paginate(2);
    return view('profile',compact('user','papers','pictures'));
  }

  public function deleteComment($id){
    $comment = Comment::find($id);
    if($comment){
      $comment->delete();
    }
  }

  public function paperView($id){
    $found = PaperPiece::where('id',$id)->with('comments','likes','user')->firstOrFail();
    $similar = PaperPiece::latest()->search($found->course)->where('id','!=',$found->id)->with('user')->paginate(6);
    $user_has_liked =$found->likes->where('user_id',Auth::user()->id)->first();
    $app_comments = Comment::where('paper_piece_id',$id)->orderBy('id','DESC')->with('user')->paginate(30);
    return view('search',compact('found','similar','app_comments','user_has_liked'));
  }
  
  public function shotView($id){
    $found = PicturePiece::where('id',$id)->with('comments','likes','user')->firstOrFail();
    $similar = PicturePiece::latest()->search($found->course)->where('id','!=',$found->id)->with('user')->paginate(6);
    $user_has_liked =$found->likes->where('user_id',Auth::user()->id)->first();
    $app_comments = Comment::where('picture_piece_id',$id)->orderBy('id','DESC')->with('user')->paginate(30);
    return view('picsearch',compact('found','similar','app_comments','user_has_liked'));
  }

  public function saveComment(Request $request){
    $newCom = new Comment(); 
    $newCom->body= $request->body; 
    $newCom->user_id= Auth::user()->id;
    if ($request->type =="paper"){
      $newCom->paper_piece_id= $request->pieceID;
      $newCom->picture_piece_id= "L";
    }
    elseif($request->type =="picture"){
      $newCom->paper_piece_id= "L";
      $newCom->picture_piece_id= $request->pieceID;
    }
    if($newCom->save()){
      //find the owner of the piece that has been commented on
      if($request->type == "paper"){
        $ownerOfPiece = PaperPiece::where('id',$request->id)->first();
      }
      elseif($request->type =="picture"){
         $ownerOfPiece = PicturePiece::where('id',$request->id)->first();
      }
      $this->addReputation(5,$ownerOfPiece->user_id);
      return "TRUE";
    }
    else{
      return "FALSE";
    }
  }
  public function getComments($id,$type){
    if($type == "picture"){
      $commentsOfPiece =Comment::where('picture_piece_id',$id)->with('user')->get();
      return $commentsOfPiece;
    }
    elseif($type=="paper"){
      $commentsOfPiece = Comment::where('paper_piece_id',$id)->with('user')->get();
      return $commentsOfPiece;
    }
  }
  public function pictureLike(Request $request){
    $exists = Like::where(["user_id"=>$request->user_id, "picture_piece_id" =>$request->picture_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
      $this->decreaseReputation(5,Auth::user()->id);
      $this->decreaseReputation(10,$likedPiece->user_id);
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->picture_piece_id = $request->picture_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
         $this->addReputation(5,Auth::user()->id); 
         $this->addReputation(10,$likedPiece->user_id);
        return $likedPiece;
      }
    }
  }
  public function like(Request $request){
    $exists = Like::where(["user_id"=>$request->user_id, "paper_piece_id" =>$request->paper_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first(); 
      $this->decreaseReputation(10,Auth::user()->id);
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->paper_piece_id = $request->paper_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first();
        $this->addReputation(10,Auth::user()->id); 
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
    //there is actually an eloquent fxnality called "skip" use it later!
    $alreadySent = $point * 3;
    $nextSetPoint  = $alreadySent + 3;
    $texts = PaperPiece::where('course', Auth::user()->course)->with('user',"likes","comments")->orderBy('id','DESC')->paginate($nextSetPoint);
    $pics = PicturePiece::where('course',Auth::user()->course)->with('user',"likes","comments")->orderBy('id','DESC')->paginate($nextSetPoint);
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
  
  public function addReputation($number,$user_id){
    $user = Rep::where('user_id',$user_id)->first();
    if($user){
      $user->update(['points'=>$user->points +$number]);
    }
    else{
      $new = new Rep(); 
      $new->user_id = $user_id; 
      $new->points = $number; 
      $new->save();
    }
  }
  public function decreaseReputation($number,$user_id){
     $user = Rep::where('user_id',$user_id)->first();
     $user->update(['points'=>$user->points -$number]);
  }
	public function saveTextPiece(Request $request){
		$Paper = new PaperPiece(); 
		$Paper->name = $request->name;
		$Paper->user_id = $request->user_id; 
		$Paper->title = $request->title; 
    $Paper->body = $request->body; 
    $Paper->course = $request->course;
		if( $Paper->save()){
      $this->addReputation(20,Auth::user()->id);
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
