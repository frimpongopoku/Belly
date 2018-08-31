<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>QBelly</title>

        <!-- Fonts -->
         <link rel="stylesheet" href="/css/app.css">
         <link rel="stylesheet" href="/css/welcome.css">
          <link rel="stylesheet" href="{{ asset('font/css/font-awesome.min.css') }} ">
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


    </head>
    <body>
        <div class='home-overlay'> 
        </div>
            <div class='first blur'>
            <div class='container'>
                <div class='row' style='padding:30px;'>
                    <div style ='margin-bottom: 60px;'></div>     
                    <div class='col-md-4'> 
                        <h1 class=' juice-text'> Juice Hub</h1> 
                        <h4 class='font-angel ' style='text-transform: uppercase; text-align: center;'><strong>"Yentia )kasia whoa so mpr3nsa."</h4>
                        <p class='font-angel paragraph-font'></strong><br> Let'ts learn from our mistakes. Register with juice hub, to get access to old exam questions/latest gists. 
                            You can upload questions of your own, all features are totaly free.</p>
                        
                    </div>
                    <div class='col-md-2'> 
                    </div>
                    <div class='col-md-6 ' > 
                        <div class='card sign-in-board' style='height:90%; padding:50px 20px;'> 
                            <div class='card-body'> 
                                <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                                    {{ csrf_field() }}
                                                    <p class='' style = 'text-align: center; color:black;'>Get started, right away. </p>
                                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <label for="email" class="col-md-4 control-label" style=''>E-Mail Address</label>

                                        <div class="col-md-6">
                                            <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}"  autofocus>

                                            @if ($errors->has('email'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('email') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <label for="password" class="col-md-4 control-label" style=''>Password</label>

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
                                        <div class="col-md-6 col-md-offset-4">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-md-8 col-md-offset-4">
                                            <button type="submit" class="btn btn-primary">
                                                Login
                                            </button>

                                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                                Forgot Your Password?
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class='container second' style='padding:20px;'>
            <center>
                <h1 class='' style='color:#707070'> MEET THE TEAM </h1>
                <p class='' style='color:#707070'>Meet the team behind this juicy platform </p>
            
            </center>
            <div class='row'>
                
                <div class='col-md-4 col-lg-4 col-sm-6 col-xs-12'> 
                    <center>
                         <img src='{{asset("imgs/avatars/hoodie-avatar.jpg")}}'  class='profile-pic'/>
                         <h3 class='' style ='text-transform: uppercase;'>chairman of nonsense</h3>
                        <p class='' style='color:#707070'>Lorem ipsum, dolor sit a  eveniet repudiandae  suscipit et, iste enim architecto quisquam.
                        </p>
                        <a href='#'class='btn btn-primary'><i class='fa fa-facebook'></i></a>
                        <a href='#'class='btn btn-blue-grey'><i class='fa fa-instagram'></i></a>
                        <a href='#'class='btn btn-elegant'><i class='fa fa-github'></i></a>
                    </center>
                </div> 
                <div class='col-md-4 col-lg-4 col-sm-6 col-xs-12'> 
                    <center>
                         <img src='{{asset("imgs/avatars/hoodie-avatar.jpg")}}'  class='profile-pic'/>
                         <h3 class='' style ='text-transform: uppercase;'>chairman of nonsense</h3>
                        <p class='' style='color:#707070'>Lorem ipsum, dolor sit a  eveniet repudiandae  suscipit et, iste enim architecto quisquam.
                        </p>
                        <a href='#'class='btn btn-primary'><i class='fa fa-facebook'></i></a>
                        <a href='#'class='btn btn-blue-grey'><i class='fa fa-instagram'></i></a>
                        <a href='#'class='btn btn-elegant'><i class='fa fa-github'></i></a>
                    </center>
                </div> 
                <div class='col-md-4 col-lg-4 col-sm-6 col-xs-12'> 
                    <center>
                         <img src='{{asset("imgs/avatars/hoodie-avatar.jpg")}}'  class='profile-pic'/>
                         <h3 class='' style ='text-transform: uppercase;'>chairman of nonsense</h3>
                        <p class='' style='color:#707070'>Lorem ipsum, dolor sit a  eveniet repudiandae  suscipit et, iste enim architecto quisquam.
                        </p>
                        <a href='#'class='btn btn-primary'><i class='fa fa-facebook'></i></a>
                        <a href='#'class='btn btn-blue-grey'><i class='fa fa-instagram'></i></a>
                        <a href='#'class='btn btn-elegant'><i class='fa fa-github'></i></a>
                    </center>
                </div> 
            </div> 
        </div>
        <footer  class='footer'> 

        </footer>
        </div>
        <script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
        <script src="{{asset('js/welcome.js')}}"></script>

    </body>
</html>
