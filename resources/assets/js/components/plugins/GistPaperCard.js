import React from 'react'; 
import Dropdown from './MyDropdown';
import * as moment from 'moment';


class GistPaperCard extends React.Component{
	constructor(props){
		super(props); 
    this.showComment = this.showComment.bind(this);
 
    this.state ={ 
      my_comments:null,
      authorise:false, 
      refinedOptions:[],
      current_date: new Date().toISOString()
    }
    
		this.options = [ 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      
    ];
	}
  
  grabComments(){
    if(this.state.my_comments ===null){
      this.getComments();
    }
  }

  getComments(){
    let thisClass= this;
    $.ajax({ method: 'get', url: '/me/get-comments/' + this.props.id + "/paper" })
      .done(function (response){
        thisClass.setState({ my_comments: response });
    });
  }
  componentDidMount(){
    var thisClass = this;
    //thisClass.checkOwner();
  }
 
  doLike(){
    this.props.newLikeFunction({user_id:this.props.user.id,paper_piece_id:this.props.id},this.props.allNews,this.props.textNewsData);
  }
	zoomText(id){
		let val = $('.t-d-'+id).attr('data-zoomed'); 
		if( val ==='false'){
			$('.paper-paragraph').animate({opacity:0},10)
				setTimeout(function(){
					$('.t-d-'+id).addClass('p-text-view z-depth-2');
					$('.t-d-'+id).attr('data-zoomed','true')
					setTimeout(function(){
						$('.paper-paragraph-'+id).animate({opacity:1});
					},600)
				},100)
		}
		else{
			$('.t-d-'+id).removeClass('p-text-view z-depth-2').addClass('ease-in-slow');
			$('.t-d-'+id).attr('data-zoomed','false')
		}
	}
	
	showComment(ID,type){
		let togVal = $('#comment-button-'+type+'-'+ID).attr('data-shown');
		if( togVal === 'false'){
			$('.js-comment-on-piece-'+type+'-'+ID).removeClass('vanish'); 
      $('.js-comment-on-piece-'+type+'-'+ID).addClass('appear'); 
      setTimeout(function(){
        $('.js-comment-on-piece-'+type+'-'+ID).addClass('comment-box-entry');
      },80);
			$('#comment-button-'+type+'-'+ID).attr('data-shown','true');
		}
		else{
			$('.js-comment-on-piece-'+type+'-'+ID).removeClass('appear'); 
      $('.js-comment-on-piece-'+type+'-'+ID).addClass('vanish'); 
			$('.js-comment-on-piece-'+type+'-'+ID).removeClass('comment-box-entry');
			$('#comment-button-'+type+'-'+ID).attr('data-shown','false');
		}
  }
  
  checkOwner(){
    if (this.props.user.id === this.props.details.owner.id) {
      let opt = [...this.options, { title: 'special', type: 'delete' }];
      this.setState({ authorise: true, refinedOptions: opt });
    }
    else{
      this.setState({ refinedOptions: this.options });
    }
  }
 
  bringLike(){
    let thisClass =  this;
    for (var item of this.props.likesArray){
      if(Number(item.user_id) === Number(thisClass.props.user.id)){
        return (
          <a href='#' className={"action-btn-act-liked action-btn font-small-ish text-like-action-" + this.props.id}
            style={{}}
            onClick={(e) => {
              e.preventDefault();
              var timer = setTimeout(() => {
                this.doLike();
              }, 1000);
              thisClass.simulateLike('Second');
            }}>
            <i className='fa fa-thumbs-up'></i> Like
             <div style={{ width: 0, display: 'none' }} id={"text-like-state-div-" + this.props.id} data-liked="On"></div>
          </a>
        );
      }
    };
    //if it actually gets to this point then user prolly hasnt like it nti show the other type
    return (
      <a href='#' className={"action-btn font-small-ish text-like-action-" + this.props.id}
        style={{}}
        onClick={(e) => {
          e.preventDefault();
          var myTimer = setTimeout(() => {
            this.doLike()
          }, 1000);
          this.simulateLike('first');
        }}>
        <i className='fa fa-thumbs-up'></i> Like
        <div style={{ width: 0, display: 'none' }} id={"text-like-state-div-" + this.props.id} data-liked="Off"></div>
      </a>
    );
  }
  simulateLike(whichBtn) {
    var likeCountSpans = document.getElementsByClassName('text-like-count-span-' + this.props.id);
    var likeCountValue = likeCountSpans[0].innerText;
    var toggledValue = $('#text-like-state-div-' + this.props.id).attr('data-liked');
    if (toggledValue === "Off") {
      $('.text-like-action-' + this.props.id).addClass('action-btn-act-liked');
      likeCountSpans[0].innerText = Number(likeCountValue) + 1;
      likeCountSpans[1].innerText = Number(likeCountValue) + 1;
      $('#text-like-state-div-' + this.props.id).attr('data-liked', 'On');

    }
    else if (toggledValue === "On") {
      if (whichBtn === "first") {
        $('.text-like-action-' + this.props.id).removeClass('action-btn-act-liked').css({ color: 'rgb(107, 106, 106)' });
        likeCountSpans[0].innerText = Number(likeCountValue) - 1;
        likeCountSpans[1].innerText = Number(likeCountValue) - 1;
        $('#text-like-state-div-' + this.props.id).attr('data-liked', 'Off');
      }
      else if (whichBtn === "Second") {
        $('.text-like-action-' + this.props.id).removeClass('action-btn-act-liked');
        likeCountSpans[0].innerText = Number(likeCountValue) - 1;
        likeCountSpans[1].innerText = Number(likeCountValue) - 1;
        $('#text-like-state-div-' + this.props.id).attr('data-liked', 'Off');
      }
    }
  }
  allowReportFeature() {
    if (this.props.user.id !== this.props.details.owner.id) {
      return (
        <small className="pull-right report-button">
          <a target="_blank" href={"/report-this-paper-juD7ir-" + this.props.id}>
            Report</a>
        </small>
      );
    }
  }
	render(){
		return (
				<div>
					<div className ='panel panel-default' style = {{width:"100%",marginBottom:0,marginTop:50}}> 
						<div className = ' panel-body clearfix' style={{paddingLeft:0, paddingRight:0}}> 
							<div className = ' pull-right ' style={{paddingRight:10}}> 
                  {/* <Dropdown  insertDetailsFunction = {this.props.insertDetailsFunction} 
                    options = { this.state.refinedOptions } 
                    name={Math.round(Math.random()*1000).toString()+'-'+this.props.id}>
                    paperTitle ={this.props.title}
                    paperID = {this.props.id}
                    paperType = "paper"
                  </Dropdown> */}
							</div>
              {this.allowReportFeature()}
            <a href={ "/profile/ImU8iwby1xOdiru-"+this.props.details.owner.id+"-PputaKIShq9/"+this.props.details.owner.name} className = 'mob-name-fix name-badge g-p-n  my-depth-2 margin-climb-up'  
              	style={{background:this.props.details.bcolor,position:'absolute', marginTop:-30, marginLeft:-20 }}> 
                @{this.props.details.owner.name} 
                <span style={{ color: '#ffd400', marginLeft: 3, fontSize: 'small', fontWeight: 600, fontFamily: 'sans-serif', }}>
                  <i style={{ marginRight: 1 }} className="fa fa-arrow-up"></i>
                  {this.props.details.owner.reputation.points}
                </span>
          		</a> 
          		<div className =" paper-title-div " >
          			<h4>{this.props.title }</h4>
          		</div>
          		<small style={{padding:10,fontSize:'smaller'}}> 
                <span className = ' text text-primary number-font'><i className='fa fa-clock-o'style={{marginRight:3}}></i> 
                {moment.duration(moment(this.state.current_date).diff(moment(this.props.created_at))).humanize()} ago </span>
          		</small>
              <small style={{fontWeight:600,fontFamily: 'sans-serif',color:'sandybrown',fontSize:'smaller'}}>
                {this.props.paper_term !==null? this.props.paper_term !=="" ? this.props.paper_term.split('-')[0] :'Year 1 First Sem':'Year 1 First Sem'}
              </small>
          		<div data-zoomed="false" onClick = {()=>{this.zoomText(this.props.id);}} className = {" gist-paper-body-text "+"t-d-"+this.props.id} style={{padding:20,cursor:'pointer', minHeight:200, maxHeight:200,overflowY:'hidden' }}> 
	          		<p className ={" save-white paper-paragraph-"+this.props.id}>{this.props.body}
								</p>
          		</div>
          		<div >
          			<div className = ' school-course-div' style={{paddingLeft:5}}> 
                  <small className = ' label label-info info-bg-color raise p-r-fix rounded'><i className ='fa fa-graduation-cap'></i> 
                  { this.props.details.owner.school.split('-')[0]}
                  </small>
          				<small className = ' label label-default raise rounded'>
                   { this.props.subcourse } </small>
          			</div>
        			 <div className = ' semi-footer clearfix' style={{padding:"5px 20px"}}>
		              <small className = "number-font t-black" >
                  <span className="fa fa-thumbs-up" style={{ marginRight: 5 }}></span> 
                  <span className={"text-like-count-span-" + this.props.id} >{this.props.likes}</span> 
                  </small> 
		              <small className = "number-font t-black "><span className = "fa fa-comments p-r-fix"> </span> 
                    <span id={"com-text-"+this.props.id}> { this.props.commentsCount} </span> </small> 
                    {/* <small className = " label label-primary pull-right gist-coin-display number-font"> 
                      <b>C</b> {this.props.coins} 
                    </small> */}
                    <a href ={"/give-me-pdf/"+this.props.id} target="_blank" className = "btn btn-default btn-sm raise pull-right" style={{borderRadius:55,borderWidth:0}}><i className ="fa fa-download"></i></a>
                    <a href ={"/paper-view/MBZyU9WoGvD3M3OcszZ8skHvoPputaKIhq9uPmW6ZqImU8iwby1xOdirul1w2gGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/"+this.props.id} target="_blank" className = "btn btn-secondary btn-sm pull-right" style={{borderRadius:55}}><i className ="fa fa-forward"></i></a>
		            </div>
          		</div>
						</div>
						<div className = 'panel-footer'> 
              {/* <a href='#' id="like-action" className= 'action-btn font-small-ish' style={ this.state.auth_user_liked===true ? $('like-action').removeClass('action-btn') :{} }
                onClick={(e) => { e.preventDefault(); this.doLike() }}>
                <i className = 'fa fa-thumbs-up'></i> Like
                </a> */}
                {this.bringLike()}
	            <a  className='action-btn font-small-ish ' 
	            	id ={'comment-button-'+this.props.type+'-'+this.props.id} 
	            	data-shown="false" data-toggle="modal" data-target="#universal-comment-board"
	            	onClick={(e)=>{e.preventDefault();this.props.showComments(this.props.id,"paper",this.props.title);}}>
	            	<i className='fa fa-comment p-r-fix'></i> 
	            	 Comment
	            </a>
             {/* <a href='#' className='action-btn font-small-ish' onClick={() => { console.log("I am the state->>", this.state) }}><i className='fa fa-hand-grab-o'></i> Grab</a> */}
						</div>
					</div>
										{/*======================+++END OF PANEL ====================*/}
          
				</div>
			);
	}
}

const styles ={
  likedColor:{
    color:'crimson !important'
  }
}

export default GistPaperCard;