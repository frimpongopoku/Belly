@extends('layouts.appnav')
@section('title')
  QBelly Help
@endsection
@section('custom-style')
  <style> 
    body{
      background:antiquewhite !important;
    }
    p {
      font-size:large;
    }

    h3{
      color:black;
    }
    @media only screen and (max-width: 785px){
      .row{
        padding:10px 35px !important; 

      }
      .container{
        padding:0px !important; 
      }
    }
  </style>
@endsection
@section('content') 
  <div class="container" style="margin-top:80px;"> 
    <div class="row" style="padding:10px 65px"> 
      <h3><i class="fa fa-question-circle-o"></i> <b>Question<span style="color:crimson">Belly</span></b> Help Documentation</h3>
      <p>This page is set aside to explain all the features of the QuestionBelly Platform.<br>
        We encourage hardwork and expect every student to succeed. That is why  
        QuestionBelly has provided very useful features that will make your revision worth-while 
        and as easy as possible.<br> 
        Continue reading to get a general sense of what all icons and features do.
      </p>
      <p style="color:#1882c3; font-weight:400; border:solid 3px navajowhite; padding:15px; border-radius:10px;">
        QuestionBelly is solely dedicated to housing revision questions for tertiary schools<br> 
        and delivering the most suitable questions related to every user's course.<br> 
        Any content that is neither educational nor for revision, will be immediately removed.<br> 
        Feel free to report such content with our "report" feature.
      </p>

      <h3>General Overview</h3> 
      <p>
        On QuestionBelly, you have the chance to typeout questions, upload pictures <b>of questions</b>, or upload  
        PDF files of questions. QuestionBelly provides tabs to help you navigate through 
        your personal uploads -- whether normal texts, pictures or PDFs.
        There is a Gist Page provided to bring you any latest papers that are uploaded by 
        people in your school, studying your course. 
        You will not see papers from different courses and different schools on your Gist Page,
        but if you wish to see papers on your course from other schools, you can search them up with 
        the advance searchbox on your dashboard.
      </p>
      <h3>Upload Feature</h3>
        <p>QuestionBelly allows it's users to upload all types of images, <br> 
        as long as they are under <b><span style="color:green;font-family:sans-serif;">2MB</span></b>. We believe At <b><span style="color:green;font-family:sans-serif;">2MB</span></b>, every word on a paper can be<br>
         clearly made out.<br> 
        The platform will also decline all PDF files that exceed <b><span style="color:green;font-family:sans-serif;">5MB</span></b> limit.
        </p>
        <h4>Multiple uploads are also available, as long as none of them exceed the size limits.</h4>
     
      <h3>How Reputation Increases </h3>
        <p> 
          When a user appreciates a paper, and he/she likes the piece, the uploader 
            gets <span class="number-font"><b>10</b></span> points, and the user that appreciates the paper also gets <span class="number-font"><b>5</b></span> points
            <br> When a user comments on a paper, the owner of the paper gets <span class="number-font"><b>5</b></span> points,
            and the one commenting gets 2 points. <br>
            In the case where the comment is deleted, the person who commented looses his <span class="number-font"><b>2</b></span>,
            but the owner of the paper only looses <span class="number-font"><b>4 out of the 5</b></span> given.
            <br> The creation of a new text piece, fetches <span class="number-font"><b>12</b></span> points. <br/>
            These points will be lost when the particular piece is deleted
            <br>Picture and PDF uploads do not fetch any upload points.
           <br><b><span style="color:black">In situations where a paper is reported, reputation points will be deducted from the owner of the piece if the piece is reviewed and not found to uphold the standards of othe QuestionBelly Society.</span></b>
        </p>
        <h3>Icons And Their Meaning</h3>
      <p> 
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-forward"></i><br> </button>
          This icon indicates that the particular paper can be maximized 
          or seen in full view. 
          <br>   Whenever you wnat  a full view of amy interesting paper, click on this button.
          This will help you read through a whole paper before the decision to download.
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-plus"></i><br> </button>
          Click this button, if you want to zoom in on a picture piece <br> 
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded" style="background:tomato; color:white;"><span><b>Xt</b><br> </button>
          This button can only be seen on pictures, in your news feed. <br>
          It only notifies a user that there are extra images under that particular paper <br> 
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-download"></i><br> </button>
          This means the particular paper is downloadable.<br> 
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-thumbs-up"></i><br> </button>
          This button allows you to like a piece. When you like a piece, the uploader's reputation will be increased. 
          <br>
          More reputation simply means, the person's uploads can be trusted. 
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-comment"></i><br> </button>
          This allows for commenting<br> 
        </span> <br>
        <button class="btn z-depth-1 btn-default rounded"><span> <i class="fa fa-lightbulb-o"></i><br> </button>
          Whenever a user navigates to full view of a text paper, they are provided with this bulb icon.<br>
          The feature clears out all bright colors from the page, to protect the user's eyes during night studies. 
        </span> 
      </p>
      <a href="/home" class="btn btn-success btn-block" style="text-transform: uppercase; margin-top:10px;">HOME</a>
    </div> 
    
  </div>
@endsection
@section('script')
@endsection