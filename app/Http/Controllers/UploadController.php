<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class UploadController extends Controller
{

    public function uploadImage(Request $request){
    	$results = $this->checkFile($request->image); 
    	if($results['status'] =='pass' ){
    		//upload the file
    		$newFileName = uniqid().'-USER-ID-'.Auth::user()->id.'-time-'.time().'.'.$results['info']['ext'];
    		if($request->image->move('users/pictures', $newFileName)){
    			return $results['info'];
    		}else{
    			return ['status'=>'fail'];
    		}
    	}else{
    		//return error and other details
    		return ['status'=>'fail','errors'=>$results['errors']]; 
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
					'name'=>$image->getClientOriginalName(),
					'ext'=>$type,
					'size'=>$size
				]
			];
		}
	}
}
