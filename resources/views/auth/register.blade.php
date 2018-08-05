@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="" style='margin-top:50px;'>

                <div class="panel my-depth-1" style='padding:50px;box-shadow: 0px 1px 1px gray;'>
                    <div clasName = 'panel panel-default '>
                        <div class='panel-body'>
                            <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                                {{ csrf_field() }}

                                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                    <label for="name" class="col-md-4 control-label register-font">Name</label>

                                    <div class="col-md-6">
                                        <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>
                                        @if ($errors->has('name'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">E-Mail Address</label>

                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

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
                                            <option></option>
                                           <option >Male</option> 
                                           <option>Female </option>
                                        </select>
                                    </div>
                                   
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">School</label>

                                    <div class="col-md-6">
                                        <input id="school" type="text" class="form-control" name="school"  required>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="course" class="col-md-4 control-label register-font">Course</label>

                                    <div class="col-md-6">
                                        <input id="course" type="text" class="form-control" name="course"  required>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">Hall</label>

                                    <div class="col-md-6">
                                        <input id="hall" type="text" class="form-control" name="hall"  required>
                                    </div>
                                </div>
                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-md-4 control-label register-font">Phone</label>

                                    <div class="col-md-6">
                                        <input id="phone" type="number" class="form-control" name="phone"  required>
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
              $('.gender-value').val(value);
              console.log($('.gender-value').val());

         },900);
    </script>
@endsection