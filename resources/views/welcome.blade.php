
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
          /* MOBILE PHONE */
  @media only screen and (max-width: 785px){
     .mobile-appearance-key{
      display:block;
    }
   
    .mobile-vanish-key{
      display:none;
    }
  }
   @media only screen and (min-width: 786px) and ( max-width:991px){
     .tablet-vanish-key{
        display:none;
      }
      .tablet-appearance-key{
        display:block;
      }
   }
   @media only screen and (min-width: 992px){
     .pc-vanish-key{
        display:none;
      }
      .pc-appearance-key{
        display:block;
      }
   }

          .in-btw-text{
            margin:10px 0px;
          }
          .name-box{
            padding: 20px;
            background: #FF9800;
            width: 105%;
            font-size: unset;
            text-transform: capitalize;
            font-weight: 300 !important;
            margin-left:5px;
            margin-top:0px;
            margin-bottom:40px;
            text-align:center; 
            border-radius:55px;
            cursor:pointer;
        }
        .name-box:hover{
          background:cornsilk; 
          transition: .4s ease-in-out all; 
        }

        .text-para{
          font-size:large; 
          color:#626565; 
          font-weight:100 !important; 
          line-height:1.7;
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
          .triangle{
            width: 30px;
            border:solid 30px #f1f1f1;
            border-top-color: white;
            border-left-color: white;
            border-right-color: white;
          }
          .pio-img{
            height: 174px;
            width: 170px;
            border-radius: 100%;
            border: solid 4px white;
            /* box-shadow: -6px -4px 3px 0px #9E9E9E; */
            object-fit: cover;
            object-position: center center;
            opacity:.9; 
            cursor:pointer;
          }
          .pio-img-s{
            height: 174px;
            width: 170px;
            border-radius: 100%;
            border: solid 4px white;
            /* box-shadow: -6px -4px 3px 0px #9E9E9E; */
            object-fit: cover;
            object-position: center center;
            opacity:.9; 
            cursor:pointer;
          }
          .pio-img:hover{
            transform: scale(1.2); 
            opacity:1; 
            transition: .3s ease-in-out all;
          }
          .pio-img-s:hover{
            transform: scale(1.2); 
            object-fit:contain;
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
            <div class="p-5" style="padding:20px 110px">
              <h4 class="display-4" style="margin-top:50px; margin-bottom:20px;color:crimson;">OUR MISSION</h4>
              <p  class="text-para" style="">
                QuestionBelly is an online platform that contains millions of questions in numerous fields of tertiary education.
                  On this platform, users can upload, download, like, comment and rate uploads from other users. 
                  <br><span class="in-btw-text">Users may also point out errors in uploaded 
                  questions and also provide solutions for them.</span></p>
                 <p class="text-para" > It is an interactive platform that aims to create ease in access to past/revision questions in the universities in Ghana.
                  <br><span class="in-btw-text">QuestionBelly provides a wide a variety of functionalities to collect and deliver questions. 
                  If you are a fun of sending pictures to friends, this time take a picture of that sheet of paper 
                  your professor gave you. </span></p>
                 <p class="text-para" ><span class="in-btw-text">If not, just take out that question paper and type away! QuestionBelly provides
                  that functionality too. Or, upload the pdf version of your question in two clicks!
                  Thanks to QuestionBelly's smart finder algorithm, you are sure to receive any latest questions anyone in your
                  school makes avaiable -- how awesome.</span></p>
                  <p class="text-para" ><br>In the long run, QuestionBelly seeks to quicken and make exam revisions more effective and 
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
          <center>
          <img src="{{asset('imgs/qu-page-best.png')}}" style="width:95%" class="pc-appearance-key tablet-vanish-key mobile-vanish-key" style="margin-left:-30px; margin-bottom:30px;"/>
          <img src="{{asset('imgs/qu-page-ori.jpg')}}" class="tablet-appearance-key pc-vanish-key mobile-vanish-key" style=" margin-bottom:30px;"/>
          <img src="{{asset('imgs/qu-page-ori-phone.jpeg')}}" style="width:90%"class="tablet-vanish-key pc-vanish-key mobile-appearance-key" style="margin-left:-30px; margin-bottom:30px;"/>
          </center>
        </div>
      </div>
    </section>
    <section> 
      <div class="container">
        <h1 class="" style="color:#ccc;margin-top:30px;margin-left:30px;font-size:-webkit-xxx-large;font-weight:300 !important;">Brought to you by</h1>
        <div class="row align-items-center" style="margin-top:40px">
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <center>
              <img src="imgs/Frimpong.jpg" class="pio-img z-depth-1" />
              <div class="triangle"></div>
            </center>
            <p class="name-box  pio-bage  z-depth-1" data-toggle="popover" title="Frimpong Opoku Agyemang" data-placement="top"  data-content="Hello There">frimpong o. agyemang</p>
          </div> 
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
           <center>
              <img src="imgs/Faddal.jpg" class="pio-img-s z-depth-1" />
              <div class="triangle"></div>
            </center>
            <p class="name-box pio-bage z-depth-1">Faddal Ibrahim</p>
          </div> 
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <center>
              <img src="imgs/Assan.jpg" class="pio-img-s z-depth-1" />
              <div class="triangle"></div>
            </center>
            <p class="name-box pio-bage z-depth-1"  >Assan Ewudzi Nathaniel</p>
           
          </div> 
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
            <center>
              <img src="imgs/ta-2.jpg" class="pio-img z-depth-1" />
              <div class="triangle"></div>
            </center>
             <p class="name-box pio-bage z-depth-1"  >Abdullah Tahiru</p>
    
          </div> 
      </div>
    </section>
    <section> 
      <div class="container"> 
        <div class="" style="padding:30px; color:darkgray;"> 
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <p><span>Send issues and bugs to</span> <a href="mailto:issues@questionbelly.com"><span style="color:black;"><i><b>issues@questionbelly.com</i></b></span><span></a></p>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <p><span>Send ideas and enquiries to</span> <a href="mailto:message@questionbelly.com"><span style="color:black;"><i><b>message@questionbelly.com</i></b></span></a></p>
          </div>
        </div> 
      </div>
    </section>

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
        <script> 
          $(function(){
            $('[data-toggle="popover"]').popover();
          })
        </script>
    </body>
</html>
