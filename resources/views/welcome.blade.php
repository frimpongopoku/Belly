
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Question Belly</title>

        <!-- Fonts -->
         <link rel="stylesheet" href="/css/app.css">
          {{--  <link rel="stylesheet" href="/css/welcome.css">  --}}
          <link rel="stylesheet" href="{{ asset('font/css/font-awesome.min.css') }} ">
        <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet">
        <link href="{{asset('css/one-page-wonder.css')}}" rel="stylesheet">
        <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet">
    </head>
       <body>
        <style>
          .name-box{
            padding: 20px;
            background: #e8c411;
            width: 105%;
            font-size: unset;
            text-transform: capitalize;
            font-weight: 300 !Important;
            margin-left:5px;
            margin-top:0px;
        }
          body{
            font-size:large;
          }
          .name-edits{
            margin:10px;
            color:#656565;
          }
          .my-social + span:hover{
            text-shadow:1px 3px 2px black; 
          }
          .pio-img{
            margin:5px;
            width:105%;
            height:500px;
            opacity:.9;
            cursor: pointer;
            margin-bottom:0px;
          }
          .pio-img:hover{
            transform: scale(.93); 
            opacity:1; 
            transition: .3s ease-in-out all;
          }
          .t-overlay{
            background:black; 
            opacity:.5;
            height:500px;
            margin:0px;
             
            z-index:10000000;

          }
        </style>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top z-depth-1" style="border-radius:0px;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <span class='QB'>Q<span style="color:crimson">B</span></span> 
          <span class="fa fa-tint tint-slow QB-tint"></span>
		    </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/register" style="font-size:smaller"><span class="fa fa-user"></span> Sign Up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login" style="font-size:smaller"><span class="fa fa-sign-in"></span> Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <header class="masthead text-center text-white" style="box-shadow:7px 4px 3px -1px #777777;">
      <div class="masthead-content">
        <div class="container">
          <h1 class="masthead-heading mb-0">Question Belly</h1>
          <p class="masthead-subheading mb-0" style="color:black; font-weight:300;font-size:2.5rem;padding-top:20px;">Ghana's number <span class="label label-success z-depth-1" style="cursor:pointer">#1</span> past questions platform <br>for tertiary school students</p>
          <a href="/login" class="btn own-button btn-xl rounded-pill mt-5 z-depth-1" style="font-size:small;padding:20px 55px;margin:5px;"><span class="fa fa-sign-in"></span>  LOGIN</a>
          <a href="/register" class="btn own-button-r btn-xl rounded-pill mt-5 z-depth-1" style="font-size:small;padding:20px 55px;margin:5px;"><span class="fa fa-user"></span>  SIGN UP</a>
        </div>
      </div>
      <div class="bg-circle-1 bg-circle"></div>
      <div class="bg-circle-2 bg-circle"></div>
      <div class="bg-circle-3 bg-circle"></div>
      <div class="bg-circle-4 bg-circle"></div>
    </header>

    <section>
      <div class="container">
        <div class="row align-items-center">
          
          <div class="col-lg-12 order-lg-1">
            <div class="p-5">
              <h4 class="display-4" style="margin-top:50px; margin-bottom:20px;color:crimson;text-shadow:1px 1px 1px black;">OUR MISSION</h4>
              <p style="font-size:large; color:#626565; font-weight:100 !important; line-height:1.7;">
                QuestionBelly, an online platform that contains millions of questions in numerous fields of tertiary education
                  On this platform, users can upload, download, like, comment and rate uploads from other users. 
                  Users may also point out errors in uploaded 
                  questions and also provide solutions for them.
                  It is an interactive platform that aims to create ease in access to past questions in universities in Ghana.
                  QuestionBelly provides a wide a variety of functionalities to collect and deliver questions. 
                  If you are a fun of sending pictures to friends, this time take a picture of that sheet of paper 
                  your professor gave you. If not, just take out that question paper and type away! QuestionBelly provides
                  that functionality too. Or, upload the pdf version of your question in two clicks!
                  Thanks to QuestionBelly's smart finder algorithm, you are sure to receive any latest questions anyone in your
                  school makes avaiable -- how awesome.
                  In the long run, QuestionBelly seeks to quicken and make exam revisions more effective and 
                  consequently increase the success rate in university education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section> 
      <div class="container"> 
        <div class="row"> 
          <img src="{{asset('imgs/qu-page-ori.png')}}" style="margin-left:-30px; margin-bottom:30px;"/>
        </div>
      </div>
    </section>
    <section> 
      <div class="container">
        <h1 class="masthead-heading mb-0" style="color:#31a049;text-shadow:1px 1px 1px black;margin-left:30px;">MEET US</h1>
        <div class="row align-items-center" style="margin-top:40px">
          <div class="col-lg-6 col-md-6 ">
            <img src="{{asset('imgs/01.jpg')}}" class="pio-img" />
            <p class="name-box">frimpong opoku agyemang</p>
          </div> 
          <div class="col-lg-6 col-md-6 ">
            <img src="{{asset('imgs/01.jpg')}}" class="pio-img" />
            <p class="name-box">Faddal Ibrahim</p>
          </div> 
          <div class="col-lg-6 col-md-6 ">
            <p class="name-box"  style="margin-bottom:0px;">Assan Ewudzi Nathaniel</p>
            <img src="{{asset('imgs/01.jpg')}}" class="pio-img" style="margin-top:0px;" />
            
          </div> 
          <div class="col-lg-6 col-md-6 ">
             <p class="name-box"  style="margin-bottom:0px;">Abdullah Tahiru</p>
            <img src="{{asset('imgs/01.jpg')}}" class="pio-img"  style="margin-top:0px;"/>
           
          </div> 
         
      </div>

    </section>

      {{--  <section>
        <div class="container">
          
          <div class="row align-items-center">
            
            <div class="col-lg-3">
              <div class="p-5">
                
                <center>
                  
                  <img class="img-fluid rounded-circle" src="{{asset('imgs/02.jpg')}}" alt="">
                  <h3  class="name-edits">Frimpong Opoku Agyemang</h3>
                </center>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="p-5">
                <center>
                  <img class="img-fluid rounded-circle" src="{{asset('imgs/02.jpg')}}" alt="">
                  <h3 class="name-edits">Assan Ewudzi Nathaniel</h3>
                </center>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="p-5">
                <center>
                  <img class="img-fluid rounded-circle" src="{{asset('imgs/02.jpg')}}" alt="">
                  <h3 class="name-edits">Faddal Ibrahim</h3>
                </center>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="p-5">
                <center>
                  <img class="img-fluid rounded-circle" src="{{asset('imgs/02.jpg')}}" alt="">
                  <h3 class="name-edits">Tahiru Abdullah</h3>
                </center>
              </div>
            </div>
          </div>
        </div>
      </section>  --}}

   

    <!-- Footer -->
    <footer class="py-5 bg-black"  style="margin-top:40px;">
      <div class="container">
        <center>
          <button class = "btn btn-primary btn-lg  z-depth-1"><i class="fa fa-facebook"></i></button>
           <button class = "btn btn-info btn-lg z-depth-1"><i class="fa fa-twitter"></i></button>
          <button class = "btn btn-secondary btn-lg z-depth-1"><i class="fa fa-instagram"></i></button>
          <p class="m-0 text-center text-white small" style="margin:10px !important">Copyright &copy; Question<span style="color:crimson">Belly</span> 2019</p>
        </center>
      </div>
      <!-- /.container -->
    </footer>

        <script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
         <script src="{{asset('js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('js/welcome.js')}}"></script>
    </body>
</html>
