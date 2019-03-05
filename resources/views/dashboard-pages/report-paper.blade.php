@extends('layouts.app') 
@section('title')
  Report Paper 
@endsection 
@section('custom-style')
  <style> 
    body{
       background:antiquewhite !important;
    }
    .textarea{
      border:0px; 
      border-radius: 40px; 
      border-top-right-radius: 0px !important; 
      border-top-left-radius: 0px !important; 
      font-size:large; 
      border:solid 2px;
      border-color:#ccc; 
      padding:40px;
    }

    .name{
      font-weight: 600; 
      color:black;
    }
    .aud{
      font-weight: 600; 
      color:black;
      font-family: sans-serif;
    }
  </style>
@endsection
@section('content') 
  <div className="container">
    <div className="row"> 
      <center> 
        <h4 style="text-transform:uppercase;margin:50px;margin-bottom:0px;color:black;">Thank you for taking time out to help <br>
          uphold the esteemed Question<span style="color:crimson">Belly</span> 
          values
        </h4>
        <p style="padding:20px">You have decided to report a piece that was created by 
          <br><span class="name">{{$found->user->name}}</span> for <span class="aud">{{$found->paper_term}} students.</span> 
          <br>Would you care to briefly explain how this piece does not 
          <br>typically fit the Question<span style="color:crimson">Belly</span> standards?
          <form action="send-report" method="get">
            <div class="col-md-6 col-md-offset-3 col-lg-6">
              <input type="hidden" value = "{{$found->id}}" name="paper_id" /> 
              @if($found->file_type =="text")
                <input type="hidden" value = "paper" name="type" />
              @elseif($found->file_type =="image")
                 <input type="hidden" value = "pic" name="type" />
              @else 
                 <input type="hidden" value = "pdf" name="type" />
              @endif

              <textarea name="message_body" placeholder="Why do you think this is not good?" class="textarea form-control"></textarea>
            </div>
            <div class="col-md-12">
              <br>
              <button class="btn btn-default"><span class="fa fa-paper-plane" style="margin-right:3px"></span>Send</button>  
            </div>
          </form>
        </center>
    </div> 
  </div>
@endsection