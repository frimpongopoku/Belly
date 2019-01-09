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
        $new->save(); 
        //use defaults!
      }
      Session::put('page_name','dashboard');
        return view('home');
    }
}
