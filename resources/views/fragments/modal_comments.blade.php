 @forelse($app_comments as $comment)
  <div style="margin:6px" >
    <div class="comment-item-text rounded" id="lil-comment-{{$comment->id}}"> 
      <small class='comment-item-title dark-text' style=""><b>{{$comment->user->name}}</b></small> 
      @if(Auth::user()->id == $comment->user_id)
        <small><a href="#" class="lil-com" data-id="{{$comment->id}}"style="color:crimson">delete</a></small>
      @endif
        <small  class=''><p>{{$comment->body}}</p></small>
      
    </div>
  </div>
@empty
  <center> 
      <p style="margin:15px"> Be the first to comment <span class='fa fa-search'></span></p>
  </center>
@endforelse