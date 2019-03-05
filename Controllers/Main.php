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
use PDF;
use App\Report;
use App\Subcourse;
use App\Viewage;

class Main extends Controller
{

  public function setCommentNotificationStatus($switch){
    $userSetting = Setting::where('user_id',Auth::user()->id)->first();
    if($userSetting){
      $userSetting->update(['comment_notification'=>(int) $switch]);
    }

  }
  public function sendEmail($title,$body,$address){
    mail($address,$title,$body,"From: Qb-messenger");
    return "true";
  }
  public function getUserPosition($user_id){
    $found = User::where('id',$user_id)->first();
    $course = $found->course;
    $school = $found->school;
    $position = 0;
    $set = Rep::whereHas('user',function($query) use ($course,$school){
      $query->where('course',$course)
      ->where('school',$school);
    })->orderBy('points','DESC')->get();
    foreach ($set as $user) {
      $position ++;
      if($user->user->id == $found->id && $user->user->name== $found->name){
        break;
      }
    }
    return $position;
  }
  public function getRankings(){
    //check reputation table, and look for those that offer
    //the authenticated user's course,
    //the authenticated user's school,
    //reorder by size --- BOOM DONE
    $programmeOfferers =  Rep::whereHas('user',function($query){
      $query->where('course',Auth::user()->course)
      ->where('school',Auth::user()->school);
    })->count();
    $set = Rep::whereHas('user',function($query){
      $query->where('course',Auth::user()->course)
      ->where('school',Auth::user()->school);
    })->orderBy('points','DESC')
    ->with('user')
    ->take(10)
    ->get();
    $ballerzDataCollection=[];
    foreach ($set as $baller) {
      $ballerNumbers = $this->returnUserNumbers($baller->user_id);
      array_push($ballerzDataCollection,$ballerNumbers);
    }
    
   return [
     'ballerz'=>$ballerzDataCollection,
     'totalNumber'=>$programmeOfferers,
     'userPosition'=>$this->getUserPosition(Auth::user()->id),
     'userNumbers'=>$this->returnUserNumbers(Auth::user()->id)
    ];
  }

  public function returnUserNumbers($user_id){
    //number of user's pieces, 
    //number of comments each piece has,
    //number of likes each piece has,
    $found = User::where('id',$user_id)
    ->with('paperPieces','picturePieces','pdfPieces','reputation')
    ->first();
    $picCount = $found->picturePieces->count(); 
    $textCount = $found->paperPieces->count();
    $pdfCount = $found->pdfPieces->count(); 
    $picComCount = 0;
    $picLikeCount = 0;
    $textComCount = 0;
    $textLikeCount = 0;
    foreach ($found->picturePieces as  $pics) {
      $picComCount = $picComCount + $pics->comments_count;
      $picLikeCount = $picLikeCount +$pics->likes_count;
    }
    foreach ($found->paperPieces as  $text) {
      $textComCount = $textComCount + $text->comments_count;
      $textLikeCount = $textLikeCount +$text->likes_count;
    }
    $userTray=[
      'id'=>$found->id,
      'reputationPoints'=>$found->reputation->points,
      'firstName'=>$found->name,
      'lastName'=>$found->lastname,
      'numberOfPicturePieces'=>$picCount,
      'numberOfTextPieces'=>$textCount,
      'numberOfPdfPieces'=>$pdfCount,
      'totalCommentsOnPieces'=>$picComCount + $textComCount,
      'totalLikesOnPieces'=>$picLikeCount +$textLikeCount
    ];
    return $userTray;
  }
  public function newViewage($type,$piece_id){
    $viewage = new Viewage();
    $viewage->user_id = Auth::user()->id;
    if($type=="pic"){
      $viewage->picture_piece_id = $piece_id;
    }
    elseif($type=="paper"){
      $viewage->paper_piece_id = $piece_id;
    }
    else{
      $viewage->pdf_piece_id = $piece_id;
    }
    $viewage->save();
  }
  public function saveProgress(Request $request){
    Session::put('progress',$request->body);
  }
  public function addSubCourse($piece_id,$type,$subcourse_name){
    // the function records new subcourses that a user 
    //creates while making new pieces
    $programme = Course::where('name',Auth::user()->course)->first(); 
    $sub = new Subcourse(); 
    $sub->name= $subcourse_name; 
    $sub->creator_id = Auth::user()->id; 
    $sub->course_id = $programme->id; 
    if($type=="paper"){
      $sub->paper_piece_id = $piece_id;
    }
    elseif($type=="image"){
      $sub->picture_piece_id = $piece_id;
    }
    elseif($type=="pdf"){
      $sub->pdf_piece_id = $piece_id;
    }
    $sub->save(); 
    return $sub;
  }
  public function sendReport(Request $request){
    //find the paper 
    //check if the sam user is reporting the same paper, if so, dont save it
    //else, create new report
    $found = PicturePiece::where('id',$request->paper_id)
    ->with('user')
    ->first();
    
    if($request->type =="paper"){
      $found = PaperPiece::where('id',$request->paper_id)
      ->with('user')
      ->first();
      if($found){
         $report_exists = Report::where(['reporter_id'=>Auth::user()->id,'paper_piece_id'=>$found->id])->first();
      } 
    }
    elseif($request->type =="pic"){
      $found = PicturePiece::where('id',$request->paper_id)
      ->with('user')
      ->first();
      if($found){
         $report_exists = Report::where(['reporter_id'=>Auth::user()->id,'picture_piece_id'=>$found->id])->first();
      } 
    }
    elseif($request->type =="pdf"){
      $found = PdfPiece::where('id',$request->paper_id)
      ->with('user')
      ->first();
      if($found){
         $report_exists = Report::where(['reporter_id'=>Auth::user()->id,'pdf_piece_id'=>$found->id])->first();
      } 
    }
    if($found){
      if(!$report_exists){
        $report = new Report();
        $report->culprit_id = $found->user->id; 
        $report->reporter_id = Auth::user()->id; 
        $report->message = $request->message_body;
        if($found->file_type =="image"){
          $report->picture_piece_id = $found->id;
        }
        elseif($found->file_type =="text"){
          $report->paper_piece_id = $found->id;
        }
        else{
          $report->pdf_piece_id = $found->id; 
        }
        $report->save(); 
        //send emails
        $reporter_name = Auth::user()->name;
        $reporter_email = Auth::user()->email;
        $title = Auth::user()->name." has flagged a piece by ".$found->user->name; 
        $body = "Reason for flag: \n".$request->message_body.' \n \n \n [reporter:'.Auth::user()->id.', culprit:'.$found->user->id.']';
        //send email to reporter
        mail($reporter_email,'Red Flag Sent','Hello '.$reporter_name.", \n \n 
        The QuestionBelly team appreciates your choice to upload it's values.\n 
        The reported content will be immediately attended to. In the case where the 
        team decides that the content \n does not fit our standards, you will be 
        compensated with an increase in reputation.\n\n Thank You For Relying On 
        QuestionBelly\nYedaase!","From: QB-Messenger");
        $this->adminEmailMessenger($title,$body);
        return redirect('/help');
      }else{
       return redirect('/help');
      }
    }
  }

  public function adminEmailMessenger($title,$content){
    $admins = ['faddalibrahim@gmail.com','mrfimpong@gmail.com','abdullai.tahiru@gmail.com','assanenathaniel@gmail.com']; 
    foreach ($admins as $adminEmail) {
      mail($adminEmail,$title,$content,'From: Qbelly-Messenger');
    }
  }
  public function showReportPage($type,$id){
    if($type =="paper"){
      $found = PaperPiece::where('id',$id)->with('user')->first();
    }
    elseif($type =="pic"){
      $found = PicturePiece::where('id',$id)->with('user')->first();
    }
    elseif($type =="pdf"){
      $found = PdfPiece::where('id',$id)->with('user')->first();
    }
    return view('dashboard-pages.report-paper',compact('found'));
  }
  public function getHelp(){
    return view('help');
  }
  public function showDashboardProfile(){
    return view('dashboard-pages.profile');
  }
  public function showPDFgenerate(){
    return view('PDF-page');
  }
 
  public function createOurPdf($id){
    $found = PaperPiece::where('id',$id)->with('user','subcourse')->first();
      $date = $found->created_at->englishDayOfWeek.', '. $found->created_at->day.' '.$found->created_at->shortEnglishMonth.' '. $found->created_at->year; 
    $html = $this->generateHTML($found->title,$found->body,$found->course,$found->user->name,$date,$found->subcourse->name);
    $pdf = \PDF::loadHTML($html); 
    $unique = uniqid();
    $stripped = str_replace(' ','-',$found->title);
    return $pdf->download('QB-'.$stripped.'-downloadBy-'.Auth::user()->name.'-'.$unique.'.pdf'); 
  }
  public function generateHTML($pieceTitle,$pieceBody,$course,$owner_name, $dateCreated,$subcourse){
    $body = "<div style='margin:0px'> 
        <div style='width:100%; background:crimson;padding:10px 50px; margin:0px !important'> 
          <div style='float:right; margin-right:40px;margin-top:10px;'> 
            <small><a href='#' style='color:white'>www.questionbelly.com</a></small>
            <br><small style='color:white;margin-bottom:5px;'>created on: $dateCreated</small>
            <br><small style='color:white; font-family:sans-serif;text-transform:uppercase'><b>$course</b>,<span style='text-transform:capitalize; margin-left:4px;'>$subcourse</span></small>
            <br><small style='color:#FFC107; font-family:sans-serif;'><b>Year 1 First Sem Students</b>
            </div>
          <br><small style='color:white;font-family:sans-serif;'><b>By $owner_name </b></small>
          <h1 style='color:white; font-family:sans-serif;  margin-top:0px;  text-shadow: 1px 2px 1px black;'>QuestionBelly</h1>
        </div>
        <div style='    min-height: 500px;padding:10px 30px;line-height:1.5;font-size:medium;font-family: sans-serif'>
          <h2><center>$pieceTitle</center></h2>
          <p style='white-space: pre-wrap'>$pieceBody </p>
        </div>
      </div>";
      return $body;
  }
  public function getLatestTextNews(){
    $news = PaperPiece::where("course",Auth::user()->course)
    ->with('likes','user.reputation','subcourse')
    ->paginate(15);
    return $news;
  }
  public function getLatestPicNews(){
    $news = PicturePiece::where("course",Auth::user()->course)
    ->with('user.reputation','likes','subcourse')
    ->paginate(15);
    return $news;
  }
  public function getUserPdfs(){
    $set = PdfPiece::where('user_id',Auth::user()->id)
    ->orderBy('id','DESC')
    ->with('subcourse')
    ->paginate(20);
    return $set;
  }
  public function returnCommentFragment($id){
    $app_comments = Comment::where('paper_piece_id',$id)
    ->take(30)
    ->orderBy('id','DESC')
    ->get();
    return view('fragments.modal_comments',compact('app_comments'));
  }
  public function returnPicCommentFragment($id){
    $app_comments = Comment::where('picture_piece_id',$id)
    ->take(30)
    ->orderBy('id','DESC')
    ->get();
    return view('fragments.modal_comments',compact('app_comments'));
  }
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
    $related  = PdfPiece::where('course','=',Auth::user()->course)->orderBy("id",'DESC')->with('user.reputation','subcourse')->skip($point * 10)->take(10)->get();
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
    $user = User::where(['id'=>$id,'name'=>$name])
    ->with('picturePieces','paperPieces','reputation')
    ->firstOrFail(); 
    $papers = PaperPiece::where('user_id',$user->id)
    ->latest()
    ->paginate(3); 
    $pictures = PicturePiece::where('user_id',$user->id)
    ->latest()->paginate(3);
    $settings = Setting::where('user_id',Auth::user()->id)
    ->first();
    $publishes = User::where('id',Auth::user()->id)
    ->with('picturePieces','paperPieces')
    ->first();
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
      elseif($comment->picture_piece_id =="L"){
        $found = PaperPiece::where('id',$comment->paper_piece_id)->first();
        $found->update(["comments_count"=>$found->comments_count -1]);
         $this->decreaseReputation(4,$found->user_id);
      }
      $this->decreaseReputation(1,Auth::user()->id);
      $comment->delete();
    }
  }

  public function paperView($id){
    $found = PaperPiece::where('id',$id)->with('comments','likes','user','subcourse')->firstOrFail();
    $id = $found->id;
    //do not bring the papers that belong to me 
    $similar = PaperPiece::latest()
    ->search($found->course)
    ->where('user_id','!=',Auth::user()->id)
    ->where('id','!=',$found->id)
    ->with('user','subcourse')
    ->paginate(6);
    $user_has_liked =$found->likes->where('user_id',Auth::user()->id)->first();
    $app_comments = Comment::where('paper_piece_id',$id)
    ->orderBy('id','DESC')
    ->with('user')
    ->paginate(30);
    $this->newViewage("paper",$id);
    return view('search',compact('found','similar','app_comments','user_has_liked'));
  }
  
  public function shotView($id){
    $found = PicturePiece::where('id',$id)->with('comments','likes','user','subcourse')
    ->firstOrFail();
    $similar = PicturePiece::latest()
    ->search($found->course)
    ->where('user_id','!=',Auth::user()->id)
    ->where('id','!=',$found->id)
    ->with('user','subcourse')
    ->paginate(6);
    $user_has_liked =$found->likes->where('user_id',Auth::user()->id)->first();
    $app_comments = Comment::where('picture_piece_id',$id)
    ->orderBy('id','DESC')
    ->with('user')
    ->paginate(30);
    $this->newViewage("pic",$id);
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
      //find the piece that is being commented on
      //find the owner of the piece that has been commented on
      //update the comments count on piece
      if($request->type == "paper"){
        $foundPiece = PaperPiece::where('id',$request->pieceID)->first();
        $foundPiece->update(['comments_count'=>$foundPiece->comments_count + 1]);
        $email_title = "New comment on '".$foundPiece->title."' by ".Auth::user()->name;
      }
      elseif($request->type =="picture"){
         $foundPiece = PicturePiece::where('id',$request->pieceID)->first();
          $foundPiece->update(['comments_count'=>$foundPiece->comments_count + 1]);
          $email_title = "New comment on '".$foundPiece->description."' by ".Auth::user()->name;
        }
      //commentor gets a 2, and the creator of the piece gets a 5
      if(Auth::user()->id != $foundPiece->user_id){
        $this->addReputation(5,$foundPiece->user_id);
      }
      $this->addReputation(2,Auth::user()->id);
      //send notification
      //if its not the same user commenting on his/her own piece
      if(Auth::user()->id !== $foundPiece->user_id){
        //then, find the owner with their settings
        $ownerOfPiece = User::where('id',$foundPiece->user_id)->with('settings')->first(); 
        //if they have signed up for notifications, send
        if($ownerOfPiece){ //if user is actually found
          if($ownerOfPiece->settings->comment_notification == 1){
            $body = '" '.$request->body.' "';
            $this->sendEmail($email_title,$body,$ownerOfPiece->email);
          }
        }
      }
      return "TRUE";
    }
    else{
      return "FALSE";
    }
  }
  public function getComments($id,$type){
    if($type == "picture"){
      $commentsOfPiece =Comment::where('picture_piece_id',$id)
      ->with('user')
      ->orderBy('id','DESC')
      ->get();
      return $commentsOfPiece;
    }
    elseif($type=="paper"){
      $commentsOfPiece = Comment::where('paper_piece_id',$id)
      ->with('user')
      ->orderBy('id','DESC')
      ->get();
      return $commentsOfPiece;
    }
  }
  public function pictureLike(Request $request){
    //the liker of a piece gets a 5 and the creator gets a 10. Unlike and both loose the give reps
     //exception: if you like your own piece, only get a 5
    $exists = Like::where(["user_id"=>$request->user_id, "picture_piece_id" =>$request->picture_piece_id])->first();
    if($exists){
      $exists->delete();
      $likedPiece = PicturePiece::where("id",$request->picture_piece_id)
      ->with('likes')
      ->first(); 
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
        $likedPiece = PicturePiece::where("id",$request->picture_piece_id)
        ->with('likes')
        ->first(); 
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
      $likedPiece = PaperPiece::where("id",$request->paper_piece_id)
      ->with('likes')
      ->first();
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
        $likedPiece = PaperPiece::where("id",$request->paper_piece_id)
        ->with('likes')
        ->first();
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
  
  public function refreshNews(){
    //usefull for returning latest updates on pieces in the same 
    //news set 
    $point = Session::get('newsGatherPoint');  
    return $this->gatherNews($point);
  }
  public function gatherNews($point){
    //10 is the number of posts the user can retrieve each time they hit this link
    //point will be sent via the route to rep where in the db the user has reached
    // point * 10 would equal the number of items that the user can see
    //so the nextSetPoint will set the limit of the next set of values by adding 10 to "alreadySent"
    //now get paginated values with respect to "nextSetPoint" 
    //then cut away the oldValues with "alreadySent" point then send only the next 10
    //*make the users choose other courses they would like to see news(questions) on
    //there is actually an eloquent fxnality called "skip" use it later!
    $alreadySent = $point * 5;
    $nextSetPoint  = $alreadySent + 5;
    $texts = PaperPiece::where('course', Auth::user()->course)
    ->with('user.reputation',"likes",'subcourse')
    ->skip($alreadySent)
    ->take(15)
    ->orderBy('id','DESC')
    ->get();
    $pics = PicturePiece::where('course',Auth::user()->course)
    ->with('user.reputation',"likes",'subcourse')
    ->skip($alreadySent)
    ->take(15)
    ->orderBy('id','DESC')
    ->get();
    $texts = $this->objectToArray($texts);
    $pics = $this->objectToArray($pics);
    $merged =  array_merge($texts,$pics);
    $shuffled = shuffle($merged);
    Session::put('newsGatherPoint',$point);
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
      $user->update([ 'phone'=>$request->phone ]);
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
    $found = PicturePiece::where('id',$id)->with('user')->first(); 
    if($found){
      //delete image from the directory 
      unlink($found->picture_link);
      unlink($found->reduced_path);
      unlink($found->thumb_path);
      if($found->type =="multiple"){
        foreach (explode("<==>",$found->extra_images) as $path) {
          unlink($path);
        }
      }
      //delete image from the database
    	if (Auth::user()->id == $found->user->id){
        Comment::where('paper_piece_id',$found->id)->delete();
        Like::where('paper_piece_id',$found->id)->delete();
        $found->delete();
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
    $firstPicSet = Auth::user()
    ->picturePieces()
    ->orderBy('id','DESC')
    ->with('subcourse')
    ->paginate(6); 
		return $firstPicSet;
	}
	public function getPapers(){
    $firstTextSet = Auth::user()
    ->paperPieces()
    ->orderBy('id','DESC')
    ->with('subcourse')
    ->paginate(6); 
		return $firstTextSet;
	}
	public function deletePaper($id){
		//find the paper, if it is found, check if the user owns the paper, then delete( turn the delete column to 1)
		$foundPaper = PaperPiece::find($id); 
		if($foundPaper){
			if (Auth::user()->id == $foundPaper->user->id){
        Comment::where('paper_piece_id',$foundPaper->id)->delete();
        Like::where('paper_piece_id',$foundPaper->id)->delete();
        $this->decreaseReputation(12,Auth::user()->id);
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
    $Paper->course = Auth::user()->course;
    $Paper->paper_term = $request->paper_term;
		if( $Paper->save()){
      $this->addReputation(20,Auth::user()->id);
      $this->addSubCourse($Paper->id,'paper',$request->subcourse);
      return ['justSavedItem'=>$Paper,'status'=>'True']; 
      Session::forget('progress');
		}
	}
    public function getAuthUser(){
    	
    	return User::where('id',Auth::user()->id)->with('reputation')->first();
    }

    public function dummy(){ 
      return User::where('id',Auth::user()->id)->with('reputation')->first();
    }

}
