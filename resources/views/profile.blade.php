@extends('layouts.appnav')

@section('title')
  {{$user->name}}
@endsection 
@section('custom-style')
  <style> 
      body{
        background:navajowhite !important;
      }
      .p-pic{
        height:250px; 
        width:250px; 
        border-radius:100%; 
        border: solid 4px #585858;
      }
      .dark-text{
        color:black;
      }
      .number-font{
        font-family:helvetica;
      }
      .profile-piece{
        padding:20px; 
        background:#f1d49e; 
        border-color:transparent;
        cursor:pointer;
      }
      .profile-piece:hover{
        background:#cc942e; 
        transition: .5s ease-in-out all;
      }
      .a-fix{
        color:black !important;
      }
      .b-margin{
        margin:100px;
      }

      @media only screen and (max-width: 600px){
        .b-margin{
          margin:100px 0px;
        }
      }
  </style>
@endsection
 
@section('content')
  <div class="container"> 
    <div class ="row b-margin" > 
      <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12 dark-text" style="margin-bottom:10px;">
        <center>
          <h4 class="dark-text"><b>{{$user->name}}'s PROFILE</b></h4>
          <img src="{{asset($user->settings->profile_picture)}}" class="p-pic" />
          <h3>{{$user->name}}</h3> 
            <h5>{{$user->school}}</h5>
            <h4 class="number-font">{{$user->reputation->points}}+ rep</h4>
            <div>
              <small class="number-font">{{$paperNumber}} <i class="fa fa-newspaper-o"></i> | {{$pictureNumber}} <i class="fa fa-camera"></i></small>
            </div>
            <a class="btn btn-primary z-depth-1" target="_blank" href="/{{$settings->facebook_link}}" ><i class="fa fa-facebook"></i></a>
            <a class="btn btn-default z-depth-1" target="_blank" href="/{{$settings->linked_in_link}}"><i class="fa fa-linkedin"></i></a>
            <button class="btn btn-success z-depth-1" data-toggle="modal" data-target="#whatsapp-display"><i class="fa fa-whatsapp"></i></button>
        </center>
      </div>
      <div class="col-md-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        @forelse($papers as $paper)
          <div class="thumbnail profile-piece clearfix dark-text"> 
            <small class="pull-right number-font text text-success" ><i class="fa fa-clock-o"></i> {{$paper->created_at->diffForHumans()}}</small>
              <h4 class=""><i class="fa fa-file-text"></i> <a class="a-fix" href="/paper-view/MBZyU9WoGvD3M3OcszZ8skHvoPputaKIhq9uPmW6ZqImU8iwby1xOdirul1w2gGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/{{$paper->id}}" target="_blank">{{$paper->title}}</a></h4> 
          </div>
        @empty
        @endforelse
        @forelse($pictures as $picture)
          <div class="thumbnail profile-piece clearfix dark-text"> 
            <small class="pull-right number-font text text-success" ><i class="fa fa-clock-o"></i> {{$picture->created_at->diffForHumans()}}</small>
              <h4 class=""><i class="fa fa-camera text text-danger"></i> <a <a class="a-fix" href="/shot-view/J3zUZ9WoGvD3M3OcszZ8skHvoPputaKIShq9uPmW6ZqImU8iwby1xOdirul1wgGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/{{$picture->id}}" target="_blank">{{$picture->description}}</a></h4> 
          </div>
        @empty
        
        @endforelse
      </div>
    </div> 
  </div> 
   <div class='modal fade my-depth-1' id="whatsapp-display">
      <div class='modal-dialog modal-sm'>
        <div class='modal-content'>
          <div class='modal-body'> 
            <center> 
                  <small><b>{{$user->name}}'s</b> whatsapp number </small>
              <p><h3 class="number-font black-text">{{$settings->whatsapp_number}}</h3></p>
            </center>
          </div>
        </div>
      </div>
    </div>
@endsection