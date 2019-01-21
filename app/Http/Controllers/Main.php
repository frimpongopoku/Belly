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
use App\Setting;
use Session;
class Main extends Controller
{


  public function setProfilePicture(Request $request){
    $found = Setting::where('user_id',Auth::user()->id)->first(); 
    $found->update(['profile_picture'=>$request->picture_link]);
    return 'TRUE';
  }
  public function goToNews(){
    //Session::put('page_name','gist');
    
    return redirect('/home');
  }
  public function goToDashboard(){
    //Session::put('page_name','dashboard');
      return redirect('/home');
  }
  public function goToDashProfile(){
    //Session::put('page_name','profile');
    return redirect('/home');
  }
  public function goToPdfGist(){
    //Session::put('page_name','pdfs');
    return redirect('/home');
  }
  public function goToCreatePage(){
    //Session::put('page_name','create-page');
    return redirect('/home');
  }
  public function getUserSettings(){
    $found = Setting::where('user_id',Auth::user()->id)->first(); 
    return $found;
  }
  public function deletePDF($id){
    $found = PdfPiece::findOrFail($id); 
    unlink($found->pdf_link);
    $found->delete();
  }
  public function getPdfNews($point){
    $related  = PdfPiece::where('course','=',Auth::user()->course)->with('user')->skip($point * 10)->take(10)->get();
    return $related;
  }
  public function getRelations(){
    $user = User::where('id',Auth::user()->id)->with('reputation')->first();
    $publishes = User::where('id',Auth::user()->id)->with('picturePieces','paperPieces')->first();
    $paperNumber = count($publishes->paperPieces);
    $pictureNumber = count($publishes->picturePieces);
    return ['reputation'=>$user->reputation,'numOfPapers'=>$paperNumber,'numOfPictures'=>$pictureNumber];
  }

  public function viewProfile($id, $name){
    $user = User::where(['id'=>$id,'name'=>$name])->with('picturePieces','paperPieces','reputation')->firstOrFail(); 
    $papers = PaperPiece::where('user_id',$user->id)->latest()->paginate(2); 
    $pictures = PicturePiece::where('user_id',$user->id)->latest()->paginate(2);
    $settings = Setting::where('user_id',Auth::user()->id)->first();
    $publishes = User::where('id',Auth::user()->id)->with('picturePieces','paperPieces')->first();
    $paperNumber = count($publishes->paperPieces);
    $pictureNumber = count($publishes->picturePieces);
    return view('profile',compact('user','papers','pictures','settings','paperNumber','pictureNumber'));
  }

  public function deleteComment($id){
    //delete a comment, the creator of the comment gets a 1 out of 2 and the creator of the piece gets a 1 out of 5
    //exception: if you make a comment on your own piece, you only get a 2, and your 2 becomes 1 when you delete the comment
    $comment = Comment::find($id);
    if($comment){
      if($comment->paper_piece_id =="L"){
        $found = PicturePiece::where('id',$comment->picture_piece_id)->first();
        $found->update(["comments_count"=>$found->comments_count -1]);
        if(Auth::user()->id != $found->user->id){
          $this->decreaseReputation(4,$found->user_id);
        }
      }
      else if($comment->picture_piece_id =="L"){
        $found = PaperPiece::where('id',$comment->paper_piece_id)->first();
        $found->update(["comments_count"=>$found->comments_count -1]);
         $this->decreaseReputation(4,$found->user_id);
      }
      $this->decreaseReputation(1,Auth::user()->id);
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
    //create a comment, the creator gets a 2 and the maker of the piece gets a 5
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
        $foundPiece = PaperPiece::where('id',$request->pieceID)->first();
        $foundPiece->update(['comments_count'=>$foundPiece->comments_count + 1]);
      }
      elseif($request->type =="picture"){
         $foundPiece = PicturePiece::where('id',$request->pieceID)->first();
          $foundPiece->update(['comments_count'=>$foundPiece->comments_count + 1]);
      }
      //commentor gets a 2, and the creator of the piece gets a 5
      if(Auth::user()->id != $foundPiece->user_id){
        $this->addReputation(5,$foundPiece->user_id);
      }
      $this->addReputation(2,Auth::user()->id);
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
    //the liker of a piece gets a 5 and the creator gets a 10. Unlike and both loose the give reps
     //exception: if you like your own piece, only get a 5
    $exists = Like::where(["user_id"=>$request->user_id, "picture_piece_id" =>$request->picture_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
        $likedPiece->update(["likes_count"=>$likedPiece->likes_count - 1]); 
      $this->decreaseReputation(5,Auth::user()->id);
       if($likedPiece->user_id != Auth::user()->id){
          $this->decreaseReputation(10,$likedPiece->user_id);
        }
     
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->picture_piece_id = $request->picture_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PicturePiece::where("id",$request->picture_piece_id)->with('likes')->first(); 
         $likedPiece->update(["likes_count"=>$likedPiece->likes_count + 1]);
         $this->addReputation(5,Auth::user()->id); 
         if($likedPiece->user_id != Auth::user()->id){
           $this->addReputation(10,$likedPiece->user_id);
         }
       
        return $likedPiece;
      }
    }
  }
  public function like(Request $request){
     //the liker of a piece gets a 5 and the creator gets a 10. Unlike and both loose the give reps
     //exception: if you like your own piece, only get a 5
    $exists = Like::where(["user_id"=>$request->user_id, "paper_piece_id" =>$request->paper_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first();
      $likedPiece->update(["likes_count"=>$likedPiece->likes_count - 1]); 
      $this->decreaseReputation(5,Auth::user()->id);
      if($likedPiece->user_id != Auth::user()->id){
          $this->decreaseReputation(10,$likedPiece->user_id);
      }
      return $likedPiece;
    }
    else{
      $like = new Like(); 
      $like->user_id = $request->user_id; 
      $like->paper_piece_id = $request->paper_piece_id;
      if($like->save()){
        //return the paper's new set of likes NB: newly added too
        $likedPiece = PaperPiece::where("id",$request->paper_piece_id)->with('likes')->first();
        $likedPiece->update(["likes_count"=>$likedPiece->likes_count + 1]);
        $this->addReputation(5,Auth::user()->id); 
         if($likedPiece->user_id != Auth::user()->id){
           $this->addReputation(10,$likedPiece->user_id);
         }
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
    $alreadySent = $point * 5;
    $nextSetPoint  = $alreadySent + 5;
    $texts = PaperPiece::where('course', Auth::user()->course)->with('user',"likes")->skip($alreadySent)->take(5)->orderBy('id','DESC')->get();
    $pics = PicturePiece::where('course',Auth::user()->course)->with('user',"likes")->skip($alreadySent)->take(5)->orderBy('id','DESC')->get();
    $texts = $this->objectToArray($texts);
    $pics = $this->objectToArray($pics);
    $merged =  array_merge($texts,$pics);
    $shuffled = shuffle($merged);
    return [ "news"=>$merged, "active"=> count($merged) !=0 ?'true':'false' ,"setNumber"=>$point +1];
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
    $setting = Setting::where('user_id',Auth::user()->id)->first();
		if($user){
      $user->update(['name'=>$request->name, 'phone'=>$request->phone,'course'=>$request->course, 'school'=>$request->university,'email'=>$request->email]);
      if($setting){
        $setting->update(['facebook_link'=>$request->facebook_link,'linked_in_link'=>$request->linked_in_link,'whatsapp_number'=>$request->whatsapp_number]);
        return ['user'=>$user,'settings'=>$setting];
      }
      else{
        $new = new Setting(); 
        $new->facebook_link = $request->facebook_link; 
        $new->linked_in_link = $request->linked_in_link; 
        $new->whatsapp_number = $request->whatsapp_number;
        $new->user_id = Auth::user()->id;
        $new->save();
        return ['user'=>$user,'settings'=>$new];
      }
		}
	}
	public function deletePicture($id){
    $found = PicturePiece::find($id); 
    if($found){
      	//delete image from the directory 
      unlink($found->picture_link);
      //delete image from the database
    	if (Auth::user()->id == $found->user->id){
        Comment::where('paper_piece_id',$found->id)->delete();
        Like::where('paper_piece_id',$found->id)->delete();
        $foundPaper->delete();
			}
    }
	
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
        Comment::where('paper_piece_id',$foundPaper->id)->delete();
        Like::where('paper_piece_id',$foundPaper->id)->delete();
        $foundPaper->delete();
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
    	
    	return User::where('id',Auth::user()->id)->with('reputation')->first();
    }

    public function dummy(){ 
      return User::where('id',Auth::user()->id)->with('reputation')->first();
    }
}
