@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="" style='margin-top:50px;'>
                <center> 
                    <p style="font-size:medium;color:#312e2e;">Create an account with <b><span style="color:black;font-weight:900;">Question</span> <span style="color:crimson;font-weight:900">Belly</span></b> to get unlimited access to <br> all questions per-course available in your school</p>
                </center>
                <div class="panel panel-finish z-depth-1" style='padding:30px;'>
                   <center>
                     <small style="color:#ccc;font-weight:500;">A D R O P I</small><br>
                    <h1  style="display:inline-block;margin-top:0px;padding-top:2px;color:black;font-weight:900;font-size:-webkit-xxx-large ; cursor:pointer;" id="the-ico">Q<span style="color:crimson">B</span><i class="tint-slow fa fa-tint" style="font-size:22px; position:relative"></i></h1>
                   
                  </center>
                    <div clasName = 'panel panel-default '>
                        <div class='panel-body '>
                            <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                                {{ csrf_field() }}

                                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                    <label for="name" class="col-md-4 control-label register-font"> First Name</label>

                                    <div class="col-md-6">
                                        <input id="name" type="text" placeholder="First Name"class="form-control" name="name" value="{{ old('name') }}" required autofocus>
                                        @if ($errors->has('name'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastname" class="col-md-4 control-label register-font"> Last Name</label>

                                    <div class="col-md-6">
                                        <input id="lastname" type="text" placeholder="Last Name"class="form-control" name="last_name" required>
                                        @if ($errors->has('lastname'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('lastname') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">E-Mail Address</label>

                                    <div class="col-md-6">
                                        <input id="email" placeholder="email"type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                        @if ($errors->has('email'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">Gender</label>
                                    <input type='hidden' name='gender' class='gender-value' value='' />
                                    <div class="col-md-6">
                                        <select class='form-control gender'> 
                                            <option>Choose</option>
                                           <option >Male</option> 
                                           <option>Female </option>
                                        </select>
                                    </div>
                                   
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">University</label>

                                    <div class="col-md-6">
                                        <input id="school" placeholder="University" type="hidden" class="form-control" name="school"  required>
                                         <select class='form-control school-chooser'> 
                                            <option>Choose</option>
                                           <option >KNUST - Kwame Nukrumah University Of Science & Technology</option> 
                                           <option>University Of Ghana, Legon</option>
                                           <option>University Of Ghana, Cape Coast </option>
                                           <option>Webster University Ghana</option>
                                           <option>University Of Education, Winneba </option>
                                           <option>All Nations University </option>
                                           <option>University Of Mines And Technology </option>
                                           <option>University Of Professional Studies</option>
                                           <option>University Of Development Studies </option>
                                           <option>Sikkim Manipal University DDE Ghana Learning Center</option>
                                           <option>Ashesi University </option>
                                           <option>Accra Institute Of Ghana</option>
                                           <option>Christian Service University College</option>
                                           <option>Islamic University College</option>
                                           <option>Methodist University College, Ghana</option>
                                           <option>Pentecost University College</option>
                                           <option>Presbyterian University College</option>
                                           <option>Central University College</option>
                                           <option>Catholic Institute Of Business And Technology</option>
                                           <option>Narh-Bita School Of Nursing</option>
                                           <option>Ghana Institute Of Languages</option>
                                           <option>Blue Crest College</option>
                                           <option>Regional Maritime University</option>
                                           <option>St. Paul Seminary</option>
                                           <option>St. Peters Seminary</option>
                                           <option>St. Victor's Seminary</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="course" class="col-md-4 control-label register-font">Course</label>

                                    <div class="col-md-6">
                                        <input id="course" placeholder="Course" type="hidden" class="form-control" name="course"  required>
                                        <select class='form-control course-chooser'> 
                                            <option>Choose</option>
                                           <option >Actuarial Science</option> 
                                           <option>Agriculture</option>
                                           <option >Computer Science</option> 
                                           <option>Dondology</option>
                                           <option>Physics</option>
                                           <option>Information Science</option>
                                           <option>Statistics</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">Hall</label>

                                    <div class="col-md-6">
                                        <input id="hall" type="text"placeholder="Hall"class="form-control" name="hall"  required>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">Phone</label>

                                    <div class="col-md-6">
                                        <input id="phone" type="number" placeholder="phone"class="form-control" name="phone"  required>
                                    </div>
                                </div>
                                
                                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                    <label for="password" class="col-md-4 control-label register-font">Password</label>

                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-control" name="password" required>

                                        @if ($errors->has('password'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password-confirm" class="col-md-4 control-label register-font">Confirm Password</label>

                                    <div class="col-md-6">
                                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                                    </div>
                                </div>
                                

                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-4">
                                      
                                        <button type="submit" class="btn btn-primary">
                                            Register
                                        </button>
                                         <a href="/login" class="btn btn-default">Login Instead</a>
                                      
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('styles')
    <style> 
        body{
            background:rgb(83, 157, 241);
        }
    </style>
@endsection
@section('scripts')
    <script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
    <script>
        
         setInterval(function(){
             var value = $('.gender').val();
             var sChooser = $('.school-chooser').val();
             var cChooser = $('.course-chooser').val();
              $('.gender-value').val(value);
               $('#school').val(sChooser);
               $('#course').val(cChooser);
         },900);
         $('#the-ico').click(function(){
          window.location = "/";
        })
    </script>
@endsection