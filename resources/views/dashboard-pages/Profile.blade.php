@extends('layouts.app')

@section('content')
<div class="container" style="padding:0; margin:0; width:100%">
    <div id='profile' data-session-page={{Session::get('page_name')}}></div>
</div>
@endsection
@section('scripts')
  <script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
@endsection 
