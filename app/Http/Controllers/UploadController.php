<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\PicturePiece;
class UploadController extends Controller
{

	public function check(){
		echo $this->fullOfSpaces("          ");
	}


	public function saveUserImageUpload(Request $request){
		//1. check if the file is accepted type
		//2. create a new instance of the picture piece DB 
		//fix the appro. details into the instance 
		//check if the user left description blank, then put in some default text
		//3. if the image passes the type test, pass it on for upload, 
		//4. if the upload is successfull, save the instance of the picture piece DB then.. 
		//5. return information about the piece
		$results = $this->checkFile($request->image); 
		$picture = new PicturePiece();
    	$picture->name = Auth::user()->name; 
    	$picture->user_id = Auth::user()->id; 
    	if($request->description != "" && $this->fullOfSpaces($request->description) !="true"){
    		$picture->description = $request->description ;
    	}
    	else{
    		$picture->description = " Brand new gist from @". Auth::user()->name;
    	}
    	if($results['status']=='pass'){
    		$newFileName = uniqid().'-USER-ID-'.Auth::user()->id.'-time-'.time().'.'.$results['info']['ext'];
    		$picturePath = 'users/pictures/';
    		$picture->picture_link = $picturePath.$newFileName;
    		if($this->uploadFile($request->image, $picturePath, $newFileName) =='true'){
    			//return details about the upload text 
    			$results['info']['newName'] = $newFileName; 
    			$data = $picture->save(); 
    			//return picture >> laravel has added the id into the |$picture array .... so I am gonna send that over to my javascript, loool hoolalaaaaa!
    			return $picture;
    		}
    		else{
    			return ['errors'=>'File could not upload'];
    		}
    	}
    	else{
    		//return error and other details
    		return ['status'=>'fail','errors'=>$results['errors']]; 
    	}
	}
    public function uploadFile($image,$directory, $fileName){
		//upload the file
		if($image->move($directory,$fileName)){
			return 'true';
		}
		else{
			return 'false';
		}  	
    }

    public function checkFile($image){
		//check file size, image type and return status if passed or not
		$type = $image->getClientOriginalExtension(); 
		$size = $image->getClientSize(); 
		$errors = []; 
		$errorCount = 0;
		$acceptedExtensions = ['png','PNG','jpg','JPG','jpeg','JPEG','gif','GIF','bmp','BMP','pdf'];
		//check extension
		if( !in_array($type, $acceptedExtensions)){
			$errorCount ++;
			array_push($errors,"File type is not accepted");
		}
		//check size
		if( $size > 2000500 ){
			$errorCount ++;
			array_push($errors,"File too large");
		}

		if($errorCount > 0 ){
			return [
				'status'=>'fail',
				'errors'=>$errors, 
				'info'=>[
					'name'=>$image->getClientOriginalName(),
					'ext'=>$type,
					'size'=>$size
				]
			];
		}else{
			return [
				'status'=>'pass',
				'errors'=>null, 
				'info'=>[
					'oldName'=>$image->getClientOriginalName(),
					'newName'=>'',
					'ext'=>$type,
					'size'=>$size
				]
			];
		}}

	public function fullOfSpaces($string){
		$spaceValue = 32; 
		$charList = str_split($string);
		$finalAnswer = $spaceValue * count($charList);
		$calcAnswer = 0;
		foreach($charList as $char){
			$calcAnswer  = $calcAnswer + ord($char);
		}
		echo "<br>";
		echo "calc answer: $calcAnswer"; 
		echo "<br>";
		echo "final answer: $finalAnswer";
		echo "<br>";
		echo "<br>";
		if($calcAnswer === $finalAnswer){
			return "true";
		}else{
			return "false";
		}}
}
