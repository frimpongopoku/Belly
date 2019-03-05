<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Setting;
use App\Rep;
use Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */



     public function sendActivationEmail(){
         $userName = Auth::user()->name;
         $activation_link = "questionbelly.com/activate-me/iTUxD-".Auth::user()->id."/".Auth::user()->name;
         mail(Auth::user()->email,"Activate Your Account","Hi $userName, \n Please Activate your account with this link \n $activation_link", "From: QuestionBelly");
     }
     public function showActivationPage(){
         $this->sendActivationEmail();
         return view('auth.activation');
     }
     public function activateLink($id, $name){
      $user = User::where('id',$id)->first(); 
      $user->update(['activated'=>'YES']); 
      return view('help');
    }

     public function chooseDP(){
       $path = 'imgs/avatars/'; 
       $female_dp_array = ['female-avatar.png','hijab-avatar.png'];
       $male_dp_array = ['hoodie-avatar.jpg','nose-mask-avatar.jpg',];
       $needle = rand(0,1);
       if(Auth::user()->gender =="Male" ){
         return $path.$male_dp_array[$needle];
       }elseif (Auth::user()->gender =="Female") {
         return $path.$female_dp_array[$needle];
       }
     }
    public function index()
    {
      $reps = Rep::where('user_id',Auth::user()->id)->first();
      if(!$reps){
        $user_rep = new Rep(); 
        $user_rep->user_id = Auth::user()->id; 
        $user_rep->points = 10;
        $user_rep->save();
      }
      $setting = Setting::where('user_id',Auth::user()->id)->first();
      if(!$setting){
        $new = new Setting(); 
        $new->user_id = Auth::user()->id;
        $new->profile_picture = $this->chooseDP();
        $new->save(); 
        //use defaults!
      }
       if(Auth::user()->activated !="NO"){
          Session::put('page_name','dashboard');
            return view('home');
      }
      else{
          return redirect('/5c66032865819/activate-account');
      }
    }
}
