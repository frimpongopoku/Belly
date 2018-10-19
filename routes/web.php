<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('home', 'HomeController@index')->name('home');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::group(["prefix"=>"me", "as"=>"user","midddleware"=>"auth"],function(){
	Route::get('get-auth-user','Main@getAuthUser');
	Route::get('save-text-piece',['as'=>'textpiece.save','uses'=>'Main@saveTextPiece']);
	Route::get('delete-paper/{id}',['as'=>'paper.delete','uses'=>'Main@deletePaper']);
	Route::get('get-all-text-papers',['as'=>'papers.get','uses'=>'Main@getPapers']);
	Route::get('get-all-pic-papers',['as'=>'papers.pics.get','uses'=>'Main@getPicPapers']);
	Route::get('edit-piece',['as'=>'paper.edit','uses'=>'Main@editPaper']);
	Route::get('get-token','Main@getToken');
	Route::get('delete-pic-item-{id}','Main@deletePicture');
  Route::get('save-profile-edits','Main@saveProfile');
  Route::get('get-news/{point}','Main@gatherNews');
  Route::get('get-all-courses','Main@getAllCourses');
  Route::get('like','Main@like');
  Route::Get('picture-like','Main@pictureLike');
});
Route::group(['middleware'=>'auth'],function(){
	Route::post('upload-image','UploadController@saveUserImageUpload');
});



Route::get('dummy','Main@dummy');
Route::post('check','UploadController@check');
Route::get('up-test',"UploadController@upTest");
Route::get('testing',function(){
	$arr = [1,'something',2,3,4,5,6,6,69]; 
	foreach (array_slice($arr,5) as  $value) {
		echo $value;
		echo "<br>"; 
		echo "<br>";
	}
	echo count($arr); 
	echo "<br>"; 
	echo count([1,0]);
});