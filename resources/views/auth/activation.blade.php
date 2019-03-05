@extends('layouts.app')

@section('title')
  QB - Activate Account
@endsection 

@section('content') 
  <div class="container" style="margin-top:100px; color:black;"> 
    <div class="row"> 
      <center> 
        <h2>A link has been sent to your email, activate your account by <br>clicking the link</h2>
        <br> 
        <h1 style="color:black;">Question<span style="color:crimson">Belly</span></h1>
        <a href="/5c66032865819/activate-account/">Resend link</a>
      </center>
    </div> 
  </div>
@endsection