<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('font/css/font-awesome.min.css') }} ">
    <link href='/css/welcome.css' />

    
@yield('custom-style')
<style> 
    .dropy-style{
    color:white !important;
  }
  .dropy-style:focus{
    color:black !important;
  }
  .log{
    color:darkred !important;
  }
  @media only screen and (max-width: 600px){
    .phone-m-less{
      padding:0px !important; 
      margin:0px !important;
    }
     .dropy-style:focus{
    color:white !important;
  }
    .log{
      color:white !important; 
    }
    .log:hover{
      color:black; 
      transition: .3s ease-in-out all;
    }
    .home-text{
      color:white !important; 
    }
    .home-text:hover{
      color:black; 
       transition: .3s ease-in-out all;
    }
  }
</style>
</head>
<body>
    <div id="app" style="margin:0 !important; padding:0 !important">
                 <nav class="navbar navbar-default navbar-static-top app-color b-app-color nav-bar-stick z-depth-1">
                    <div class="container">
                        <div class="navbar-header">
                            <!-- Collapsed Hamburger -->
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                                <span class="sr-only">Toggle Navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                            <!-- Branding Image -->
                            <a class="navbar-brand" href="#" style="padding:15px">
                                <span  class = 'QB'>QB</span> <span class = "fa fa-tint QB-tint"></span>
                            </a>
                        </div>

                        <div class="collapse navbar-collapse" id="app-navbar-collapse">
                            <!-- Left Side Of Navbar -->
                            <ul class="nav navbar-nav">
                                &nbsp;
                            </ul>

                            <!-- Right Side Of Navbar -->
                            <ul class="nav navbar-nav navbar-right">
                                <!-- Authentication Links -->
                                @guest
                                    <li><a href="{{ route('login') }}">Login</a></li>
                                    <li><a href="{{ route('register') }}">Register</a></li>
                                @else
                                   
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle dropy-style" style=""data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" v-pre>
                                            {{ Auth::user()->name }} <span class="caret"></span>
                                        </a>

                                        <ul class="dropdown-menu">
                                             <li > 
                                              <a href="/home" class='home-text'><i class="fa fa-home"></i> Home</a>
                                            </li>
                                            <li>
                                                <a href="{{ route('logout') }}" class="log" 
                                                    onclick="event.preventDefault();
                                                             document.getElementById('logout-form').submit();">
                                                    <i class="fa fa-sign-out"></i> Logout
                                                </a>

                                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                    {{ csrf_field() }}
                                                </form>
                                            </li>
                                        </ul>
                                    </li>
                                @endguest
                            </ul>
                        </div>
                    </div>
                </nav>

        @yield('content')
    </div>

    <!-- Scripts -->
    @yield('scripts')
    <script src="{{ asset('js/app.js') }}"></script>
    

</body>
</html>
