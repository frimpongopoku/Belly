import React from 'react'; 
import Dropdown from './MyDropdown';
import CommentPad from './CommentPad';


class GistPaperCard extends React.Component{
	constructor(props){
		super(props); 
    this.showComment = this.showComment.bind(this);
    this.checkIfUserLiked = this.checkIfUserLiked.bind(this);
    this.state ={ 
      auth_user_liked:false,
      my_comments:null
    }
    
		this.options = [ 
      { title:'Unpublish', fa:'fa-globe',function:null}, 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      { title:'whatsapp', fa:'fa-whatsapp', function:null}
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
    this.checkIfUserLiked();
  }
  checkIfUserLiked(){
    let thisClass = this;
    for (let i = 0; i < this.props.likesArray.length; i++) {
      console.log("I am just in the lopooooop")
      const aLike = this.props.likesArray[i];
      if(aLike.user_id === this.props.user.id && aLike.paper_piece_id === this.props.id){
        this.setState({auth_user_liked:true});
        console.log("Iam in the for if loop show thine self!!!!!!")
        return null;

      }
    }
    //thisClass.setState({auth_user_liked:false})
  }
  doLike(){
    this.props.newLikeFunction({user_id:this.props.user.id,paper_piece_id:this.props.id},this.props.allNews);
    console.log("Your like has been sent");
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
	render(){
    console.log("logthegistThis::: ",this.state);
		return (
				<div className ="">
					<div className ='panel panel-default' style = {{width:"100%",marginBottom:0,marginTop:50}}> 
						<div className = ' panel-body clearfix' style={{paddingLeft:0, paddingRight:0}}> 
							<div className = ' pull-right ' style={{paddingRight:10}}> 
								<Dropdown  options = { this.options } name="Frimpi"></Dropdown>
							</div>
							<a href='#' className = 'name-badge   my-depth-2 margin-climb-up'  
              	style={{background:this.props.details.bcolor,position:'absolute', marginTop:-30, marginLeft:-36 }}> @{this.props.details.owner.name} 
          		</a> 
          		<div className =" paper-title-div " >
          			<h4>{this.props.title+ " - " + this.props.id }</h4>
          		</div>
          		<small style={{padding:10}}> 
          			<span className = ' text text-primary font-small number-font'><i className='fa fa-clock-o'></i> 3 seconds ago </span>
          		</small>
          		<div data-zoomed="false" onClick = {()=>{this.zoomText(this.props.id);}} className = {" gist-paper-body-text "+"t-d-"+this.props.id} style={{padding:20,cursor:'pointer', minHeight:200, maxHeight:200,overflowY:'hidden' }}> 
	          		<p className ={"paper-paragraph-"+this.props.id}>{this.props.body}
								</p>
          		</div>
          		<div >
          			<div className = ' school-course-div' style={{paddingLeft:5}}> 
                  <small className = ' label label-info info-bg-color z-depth-1 p-r-fix'><i className ='fa fa-graduation-cap p-r-fix'></i> 
                  { this.props.details.owner.school}
                  </small>
          				<small className = ' label label-default z-depth-1'><i className ='fa fa-book p-r-fix'></i> { this.props.course } </small>
          			</div>
        			 <div className = ' semi-footer clearfix' style={{padding:"5px 20px"}}>
		              <small className = "number-font t-black" >
                    <span className = "fa fa-thumbs-up"></span> 
                    <span> { this.props.likes} </span> 
                  </small> 
		              <small className = "number-font t-black "><span className = "fa fa-comments p-r-fix"></span> <span> { this.props.commentsCount} </span> </small> 
		              <small className = " label label-primary pull-right gist-coin-display number-font"> 
                    <b>C</b> {this.props.coins} 
                  </small>
		            </div>
          		</div>
						</div>
						<div className = 'panel-footer'> 
            <a href='#' className= 'action-btn font-small-ish' style={ this.state.auth_user_liked ? styles.likedColor:{} }
              onClick={(e) => { e.preventDefault(); this.doLike() }}>
              <i className = 'fa fa-thumbs-up'></i> Like
              </a>
	            <a  className='action-btn font-small-ish ' 
	            	id ={'comment-button-'+this.props.type+'-'+this.props.id} 
	            	data-shown="false" data-toggle="modal" data-target="#universal-comment-board"
	            	onClick={(e)=>{e.preventDefault();this.props.showComments(this.props.id,"paper",this.props.title);}}>
	            	<i className='fa fa-comment'></i> 
	            	 Comment
	            </a>
	            <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-grab-o'></i> Grab</a>
						</div>
					</div>
										{/*======================+++END OF PANEL ====================*/}
            <CommentPad 
              id ={this.props.id} 
              type={this.props.type} 
             
            />
						
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