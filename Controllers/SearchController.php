<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PaperPiece;
use App\PicturePiece;
use App\PdfPiece;
use Auth;
class SearchController extends Controller
{
    public function doSearch(Request $request){
      $paperResults= PaperPiece::latest()
      ->search($request->search_value)
      ->where('deleted','!=',1)
      ->where('course',Auth::user()->course)
      ->with('user')
      ->paginate(30);
      $pictureResults = PicturePiece::latest()
      ->search($request->search_value)
      ->where('course',Auth::user()->course)
      ->with('user')
      ->paginate(30);
      $pdfResults = PdfPiece::latest()
      ->search($request->search_value)
      ->where('course',Auth::user()->course)
      ->with('user')
      ->paginate(30);
      $empty = ""; 
      if(count($paperResults) ==0 && count($pictureResults) ==0 && count($pdfResults)==0){
        $empty = "true";
      }
      else{
        $empty ="false";
      }
      return [ 'papers'=>$paperResults, 'pics'=>$pictureResults,'pdfs'=>$pdfResults, 'empty'=>$empty];
    }

    public function goToSearch(){
      return view('Search');
    }
}
