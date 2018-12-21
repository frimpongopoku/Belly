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
      my_comments:null,
      authorise:false, 
      refinedOptions:[]
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
    thisClass.checkOwner();
  
  }
  checkIfUserLiked(){
    var thisClass =this;
    console.log("deye dyed eyd eyd eyd eye dye dy")
    this.props.likesArray.forEach(function(itm){
      if(itm.user_id === thisClass.props.user.id){
        thisClass.setState({auth_user_liked:true});
        console.log("User had liked it!!!");
        return
      }
      else{
        console.log("dfs fa f d s d fd f")
      }
    });
  }
  doLike(){
    this.props.newLikeFunction({user_id:this.props.user.id,paper_piece_id:this.props.id},this.props.allNews);
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
  
  checkOwner() {
    if (this.props.user.id === this.props.details.owner.id) {
      let opt = [...this.options, { title: 'special', type: 'delete' }];
      this.setState({ authorise: true, refinedOptions: opt });
    }
    else{
      this.setState({ refinedOptions: this.options });
    }
  }
  bringLike(){
    if(this.state.auth_user_liked === true){
      return(
        <a href='#' id="like-action" className='action-btn font-small-ish' style={this.state.auth_user_liked === true ? $('like-action').removeClass('action-btn') : {}}
          onClick={(e) => { e.preventDefault(); this.doLike() }}>
          <i className='fa fa-thumbs-up'></i> DO DO Like
        </a>

      );
    }
    else{
      <a href='#' id="like-action" className='action-btn font-small-ish' style={this.state.auth_user_liked === true ? $('like-action').removeClass('action-btn') : {}}
        onClick={(e) => { e.preventDefault(); this.doLike() }}>
        <i className='fa fa-thumbs-up'></i> Like
              </a>
    }
  }
	render(){
    this.checkIfUserLiked();
		return (
				<div>
					<div className ='panel panel-default' style = {{width:"100%",marginBottom:0,marginTop:50}}> 
						<div className = ' panel-body clearfix' style={{paddingLeft:0, paddingRight:0}}> 
							<div className = ' pull-right ' style={{paddingRight:10}}> 
                <Dropdown  insertDetailsFunction = {this.props.insertDetailsFunction} 
                  options = { this.state.refinedOptions } 
                  name={Math.round(Math.random()*1000).toString()+'-'+this.props.id}>
                  paperTitle ={this.props.title}
                  paperID = {this.props.id}
                  paperType = "paper"
                </Dropdown>
							</div>
            <a href={ "/profile/ImU8iwby1xOdiru-"+this.props.details.owner.id+"-PputaKIShq9/"+this.props.details.owner.name} className = 'name-badge   my-depth-2 margin-climb-up'  
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
		              <small className = "number-font t-black "><span className = "fa fa-comments p-r-fix"> </span> <span> { this.props.commentsCount} </span> </small> 
		              <small className = " label label-primary pull-right gist-coin-display number-font"> 
                    <b>C</b> {this.props.coins} 
                  </small>
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
            <a href='#' className='action-btn font-small-ish' onClick={() => { console.log("I am the state->>", this.state) }}><i className='fa fa-hand-grab-o'></i> Grab</a>
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