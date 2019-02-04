<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\PicturePiece;
use App\PdfPiece;
use Image;
class UploadController extends Controller
{

  public function upTest(Request $request){
		$type = $request->image[0]->getClientOriginalExtension(); 
    $request->image[0]->move('users/PDF/','asdfasdf'.time().'.'.$type);
    return 'Done';
  }


	public function check(Request $request){
		print_r($request->image[0]);
		echo "<br>"; 
		echo "<br>"; 
	}

  public function myReduceImage($imagePath,$parentImage,$otherName, $width,$height){
    //imagePath should contain the file name
    $img =  Image::make($imagePath.$parentImage)->resize($width, $height,function($constraint){
      $constraint->aspectRatio();
    });
    $img->save($imagePath.$otherName);
    unlink($imagePath.$parentImage);
  }
	public function extraImagesStringMaker($images){
		//get filenames and turn then into a string with "<==>" so they can ge split later on to retain the file names 
		$prepString = ""; 
		foreach($images as  $image){
			$prepString = $prepString ==="" ? $prepString . $image : $prepString . "<==>". $image;
		}
		return $prepString;
	}

	public function extraImagesUpload($extraImages){
		//overview: check file first, if it passes, upload , then add it to the list that will be later stringified
		$prepList = []; 
		foreach ($extraImages as $image) {
			$results = $this->checkFile($image); 
			//if the image passes,
			if ($results['status'] =='pass'){
        $directory = "users/pictures/";
				//generate a distinct file name
				$newFileName = uniqid().'-USER-ID-'.Auth::user()->id.'-time-'.time().'.'.$results['info']['ext'];
				//upload it,
				$this->uploadFile($image,$directory, $newFileName); 
				//update the "prepList": this list that will be sent to another fxn later to be stringified
				array_push($prepList ,$directory.$newFileName); 
			}
			else{
				//if the image doesnt pass, dont upload, just skip this one
				continue;
			}
			
		}
		$stringified = $this->extraImagesStringMaker($prepList); 
		//return the stringified version of the successfully uploaded extra images
		return $stringified;

  }
  public function separateImageAndPDF($content){
    //this function will only be ran, after the filetype check has already taken place
    $imageArray =[]; 
    $PDFArray  =[]; 
    foreach ($content as $item) {
      if($item->getClientOriginalExtension() =="pdf"){
        array_push($PDFArray, $item);
      }
      else{
        array_push($imageArray, $item);
      }
    }
    return ['PDFArray'=>$PDFArray, 'imageArray'=>$imageArray];
  }

  public function pdfUpload($content,$title,$course){
    foreach ($content as $file) {
      $results = $this->checkFile($file); 
      $newFileName = uniqid().'-USER-ID-'.Auth::user()->id.'-time-PDF-'.time().'.'.$results['info']['ext'];
      $path = "users/PDFs/";
      if($results['status']=="pass"){
        if( $this->uploadFile($file,$path,$newFileName) =="true"){
           $this->saveUserPDFDetails($title,$path.$newFileName,$course);
        }
      }
    }
    return "It is done";
  }
  public function saveUserPDFDetails($title,$path,$course){
    $new = new PdfPiece(); 
    $new->title = $title; 
    $new->user_id = Auth::user()->id; 
    $new->pdf_link = $path; 
    $new->course = $course;
    $new->name = Auth::user()->name; 
    $new->save();
  }
  
	public function saveUserUploads(Request $request){
    //1. extract the tile,
    //2. separet image files from PDFs 
    //3. upload PDFs save PDF details
    //4. upload images save image details 
    $description = "";
    if($request->description != "" && $this->fullOfSpaces($request->description) !="true"){
        $description = $request->description ;
      }
    else{
      $description = " Brand new gist from @". Auth::user()->name;
    }
    $splitFiles = $this->separateImageAndPDF($request->image);
    $imageArray = $splitFiles['imageArray']; 
    $PDFArray = $splitFiles['PDFArray']; 
    
    $this->pdfUpload($PDFArray,$description,$request->pic_course_select);
    $firstImageCheck= $this->checkFile($imageArray[0]);
    if($firstImageCheck['status']=="pass"){
      $picture = new PicturePiece();
      $picture->name = Auth::user()->name; 
      $picture->user_id = Auth::user()->id; 
      $picture->course = $request->pic_course_select;
      $picture->description = $description;
      //how resizing works 
      //upload the original into the normal folder, the thumbnail folder, and the reduced folder
      //now resize the ones in the thumb, and the reduced folder
      $newFileName = uniqid().'-USER-ID-'.Auth::user()->id.'-time-'.time();
      $newFileNameWithExt = $newFileName.'.'.$firstImageCheck['info']['ext'];
      $thumbFileName = $newFileName.'-thumbnail'.'.'.$firstImageCheck['info']['ext'];
      $reducedFileName = $newFileName.'-red'.'.'.$firstImageCheck['info']['ext'];
      $picturePath = "users/pictures/";
      $picture->picture_link = $picturePath.$newFileNameWithExt;
      $picture->thumb_path = $picturePath.'thumbnails/'.$thumbFileName; 
      $picture->reduced_path = $picturePath.'little/'.$reducedFileName; 
      $this->uploadFile($imageArray[0],$picturePath, $newFileNameWithExt);
      copy($picture->picture_link, $picturePath.'thumbnails/'.$newFileNameWithExt);
      $this->myReduceImage($picturePath.'thumbnails/',$newFileNameWithExt,$thumbFileName,300,200);
      copy($picture->picture_link, $picturePath.'little/'.$newFileNameWithExt);
      $this->myReduceImage($picturePath.'little/',$newFileNameWithExt,$reducedFileName,591,400);
      if(count($imageArray) >1){
        $extraImages = array_slice($imageArray,1); //start cut the list form the second item
        $extraImagesToString = $this->extraImagesUpload($extraImages); 
        $picture->extra_images = $extraImagesToString; 
        $picture->type = "multiple";
        if($picture->save()){
          return $picture;
        }
        else{
          return "Save not successful!";
        }
      }
      else{
        $picture->type="single"; 
        if($picture->save()){
          return $picture;
        }
        else{
          return "Save not successfull!";
        }
      }
    }
    else{
      return $firstImageCheck;
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
