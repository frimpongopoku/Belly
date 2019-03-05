@extends('layouts.appnav')
@section('title')
  QB | {{$found->title}} 
@endsection
@section('content')
<div class="container" style="padding:0; margin:0; margin-top:80px;width:100%">
    <div id='paper-view'></div>
    <div class="container phone-m-less">
      <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 phone-m-less">
        <div class="thumbnail view-thumbnail clearfix" style="padding:20px;margin-bottom:5px;">
          <h2 class="t-p-title" style=" color:black; padding:7px;margin-bottom:0px;">{{$found->title}}</h2>
            <small style="font-weight: 600; font-family:sans-serif;color:#8c5716;margin-left:21px;">{{$found->paper_term}} Students</small>
          <div className = "clearfix" style="padding:20px;padding-top:0px; min-height:300px; max-height:515px;overflow-y:scroll; 
                border:solid 0px black; border-bottom-width:2px; margin-bottom:10px;">
            <p style="font-size:larger">{{$found->body}}<br>
            </p>
          </div>
          @if(Auth::user()->id == $found->user_id)
            <button class="btn btn-danger rounded btn-sm z-depth-1" id="delete"><i class="fa fa-trash"></i></button> 
          @endif
          <small class="label label-default rounded z-depth-1" style="padding:6px 10px; ">By {{'@'.$found->user->name}}</small>
          <small class="label label-primary rounded z-depth-1" style="padding:6px 10px; ">{{$found->subcourse ? $found->subcourse->name:'No Course'}}</small>
          <small class='text text-default number-font'>{{$found->created_at->diffForHumans()}}</small>
             
           
            <a href='{{"/give-me-pdf/".$found->id}}' class="btn btn-default" style="border-radius:55px;margin-left:5px;"><i class="fa fa-download"></i></a>
            <button class="btn btn-default rounded light-bulb-1 light-off" style="margin-left:30px"><i class="fa fa-lightbulb-o"></i> </button>
            <button class="btn btn-default rounded light-bulb-2 light-on" style ="display:none;margin-left:30px"><i class="fa fa-lightbulb-o"></i> </button>
          
          <div class = "pull-right"> 
            @if($user_has_liked)
             <small class="cursor text text-danger"  id="liked"><i class='fa fa-thumbs-up'></i> <span class ='number-font' id="liked-span">{{count($found->likes)}}</span></small>
              <small class="cursor"style="display:none" id="like"><i class='fa fa-thumbs-up'></i> <span class ='number-font' id="like-span">{{count($found->likes)}}</span></small>
            @else
              <small class="cursor text text-danger" style="display:none" id="liked"><i class='fa fa-thumbs-up'></i> <span class ='number-font' id="liked-span">{{count($found->likes)}}</span></small>
              <small class="cursor" id="like"><i class='fa fa-thumbs-up'></i> <span class ='number-font' id="like-span">{{count($found->likes)}}</span></small>
            @endif
             <small class="cursor"data-toggle="modal" data-target="#comments-modal-box" id="view-comments"><i class='fa fa-comment'></i> 
              <span class ='number-font comment-number'>{{count($found->comments)}}</span></small>
          </div>
        </div>
          {{--  <--------------------COMMENTING SECTION-------------->  --}}
        <div class="thumbnail zero-radius c-thumb" style="padding:20px;margin-top:5px; height:100px;background:#f54f29"> 
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8">
                  <textarea class="form-control txt-area" placeholder="say something..." id="c-body"></textarea>
                  <small class='dark-text' style='display:none;padding:7px;margin:10px;color:green;'id='c-status'><i>commenting <span class='fa fa-spinner fa-spin'></span></i></small>
                  <input type="hidden" value ="{{$found->id}}" id="c-pieceID" />
                  <input type="hidden" value ="paper" id="c-type" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <button class="btn btn-default user-badge-comment rounded v-c-b" id="c-btn" style="margin-top:10px;">Comment</button>
            </div>
          </form>
        </div>
        <div class="other-links" style=""> 
          @foreach($similar as $piece)
              <div class="col-md-3 col-lg-3 col-sm-4 col-xs-12" style="padding-right:3px; padding-left:3px;"> 
                <div class="thumbnail  dark-text similar">
                  <p ><a style="color:crimson" href="/paper-view/MBZyU9WoGvD3M3OcszZ8skHvoPputaKIhq9uPmW6ZqImU8iwby1xOdirul1w2gGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/{{$piece->id}}" target="_blank" > {{$piece->title}}</a></p>
                  <p class="angel">By {{'@'.$piece->user->name}}</p>
                  <p class="angel">{{$piece->subcourse ? $piece->subcourse->name:'No Course'}}</p>
                </div>
              </div>
          @endforeach
        </div>
      </div>
      <div class='modal fade' id="comments-modal-box" style=""> 
        <div class="modal-dialog modal-md">
          <div class="modal-content">
             <div class="modal-header clearfix">
                <h3 style="display:inline-block; margin-left:10px; margin-top:10px;">Comments</h3> 
              <button class="btn btn-danger rounded pull-right" data-dismiss="modal"><i class="fa fa-close"></i></button>
            </div>
            <div class="modal-body" id="modal-frag-area" style="max-height:400px; overflow-y:scroll;  border-radius:10px;">
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
            </div>
           
          </div>
        </div>
      </div>
    </div>    
</div>
@endsection
@section('scripts')
  <script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
	<script> 
    var paperID = {{$found->id}};
    var userID = {{Auth::user()->id}};
    $(document).ready(function(){
      var lightsOff = function(){
        $('body').css({background:'black',transition:'1s ease-in-out all'});
        $('.view-thumbnail').css({background:'#282828',color:'darkgray',borderColor:'#282828',transition:'1s ease-in-out all'})
        $('.t-p-title').css({color:'white',transition:'1s ease-in all'});
        $('.c-thumb').css({borderColor:'black',background:'gray',transition:'1s ease-in-out all'});
        $('.txt-area').css({background:'#282828', color:'white',transition:'1s ease-in-out all'});
        $('.light-bulb-1').fadeOut(function(){
          $('.light-bulb-2').fadeIn();
        }); 
      }
      var lightsOn = function(){
        $('body').css({background:'white',transition:'1s ease-in-out all'});
        $('.view-thumbnail').css({background:'white',color:'black',borderColor:'#ccc',transition:'1s ease-in-out all'})
        $('.t-p-title').css({color:'black',transition:'1s ease-in all'});
        $('.c-thumb').css({borderColor:'white',background:'#f54f29',transition:'1s ease-in-out all'});
        $('.txt-area').css({background:'white', color:'black',transition:'1s ease-in-out all'});
        $('.light-bulb-2').fadeOut(function(){
          $('.light-bulb-1').fadeIn();
        }); 
      }

    $('.light-bulb-1').click(function(){
      lightsOff();
    });
    $('.light-bulb-2').click(function(){
      lightsOn();
    });

      var deleteComment=function(id){
        $.ajax({method:"get",url:'/delete-comment/'+id})
        .done(function(){
          $('#lil-comment-'+id).fadeOut(400);
        });
      }
      var loadCommentFragment = function(){
        $("#modal-frag-area").load('/get-comment-fragment/'+paperID);
      }
      $('#view-comments').click(function(){
        loadCommentFragment();
      });

      $('.lil-com').click(function(){
        deleteComment($(this).attr('data-id'));
      });
     
      var doDelete = function(){
        $.ajax({method:'get',url:"/me/delete-paper/"+paperID})
        .done(function(){
          window.close();
        });
      }

      $('#delete').click(function(){
        doDelete();
      })
      var backEndLike = function(){
        $.ajax({method:'get',url:'/me/like',data:{paper_piece_id:paperID,user_id:userID}});
      }
      $('#like').click(function(){
        doLike();
        backEndLike();
      });
       $('#liked').click(function(){
        unLike();
        backEndLike();
      });
      var doLike=function(){
        var num = Number(document.getElementById('like-span').innerHTML) +1;
        $('#like').fadeOut(function(){
           $('#liked').fadeIn();
        });
        document.getElementById('liked-span').innerHTML=num; 
        
      };
       var unLike=function(){
        var num = Number(document.getElementById('liked-span').innerHTML) -1;
         $('#liked').fadeOut(function(){
           $('#like').fadeIn();
        });
        document.getElementById('like-span').innerHTML=num; 
       
      };
      var doCommenting = function(){
        var body = $('#c-body').val(); 
        var type = $('#c-type').val(); 
        var id= $('#c-pieceID').val();
        if($.trim(body) !==""){
          $('#c-status').fadeIn();
          $.ajax({method:'get',url:"/me/save-comment",data:{body:body, type:type, pieceID:id}})
          .done(function(){
            setTimeout(function(){
              $('#c-status').fadeOut(function(){
                 $('#c-body').val("");
                 var theNumber = Number($('.comment-number').text())+1;
                 $('.comment-number').text(theNumber);
              });
            },500)
          });
        }
        else{
          alert("You have not written anything!");
        }
      }
      $('#c-btn').on('click',function(){
        doCommenting();
      });
    });
	</script>
@endsection 
