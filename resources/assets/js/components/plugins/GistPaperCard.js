import React from 'react'; 
import Dropdown from './MyDropdown';
import CommentPad from './CommentPad';

class GistPaperCard extends React.Component{
	constructor(props){
		super(props); 
		this.showComment = this.showComment.bind(this);
		this.options = [ 
      { title:'Unpublish', fa:'fa-globe',function:null}, 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      { title:'whatsapp', fa:'fa-whatsapp', function:null}
    ];
	}
	nothing(){};
	zoomText(){
		let val = $('.t-d').attr('data-zoomed'); 
		if( val ==='false'){
			$('.paper-paragraph').animate({opacity:0},10)
				setTimeout(function(){
					$('.t-d').addClass('p-text-view z-depth-2');
					$('.t-d').attr('data-zoomed','true')
					setTimeout(function(){
						$('.paper-paragraph').animate({opacity:1});
					},600)
				},100)
		}
		else{
			$('.t-d').removeClass('p-text-view z-depth-2').addClass('ease-in-slow');
			$('.t-d').attr('data-zoomed','false')
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
		return (
				<div className ="">
					<div className ='panel panel-default' style = {{width:"100%",marginBottom:0,marginTop:50}}> 
						<div className = ' panel-body clearfix' style={{paddingLeft:0, paddingRight:0}}> 
							<div className = ' pull-right ' style={{paddingRight:10}}> 
								<Dropdown  options = { this.options } name="Frimpi"></Dropdown>
							</div>
							<a href='#' className = 'name-badge   my-depth-2 margin-climb-up'  
              	style={{background:this.props.details.bcolor,position:'absolute', marginTop:-30, marginLeft:-36 }}> @{this.props.details.name} 
          		</a> 
          		<div className =" paper-title-div " >
          			<h4>THE FROG IS PLAYING PIANO</h4>
          		</div>
          		<small style={{padding:10}}> 
          			<span className = ' text text-primary font-small number-font'><i className='fa fa-clock-o'></i> 3 seconds ago </span>
          		</small>
          		<div data-zoomed="false" onClick = {()=>{this.zoomText();}} className = " gist-paper-body-text t-d " style={{padding:20,cursor:'pointer', minHeight:200, maxHeight:200,overflowY:'hidden' }}> 
	          		<p className ="paper-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
          		</div>
          		<div >
          			<div className = ' school-course-div' style={{paddingLeft:5}}> 
          				<small className = ' label label-info info-bg-color z-depth-1 p-r-fix'><i className ='fa fa-graduation-cap p-r-fix'></i> KNUST </small>
          				<small className = ' label label-default z-depth-1'><i className ='fa fa-book p-r-fix'></i> Computer Science </small>
          			</div>
        			 <div className = ' semi-footer clearfix' style={{padding:"5px 20px"}}>
		              <small className = "number-font t-black"><span className = "fa fa-thumbs-up"></span> <span> 150 </span> </small> 
		              <small className = "number-font t-black "><span className = "fa fa-comments"></span> <span> 40 </span></small> 
		              <small className = " label label-primary pull-right gist-coin-display number-font"> <b>C</b> 400 </small>
		            </div>
          		</div>
						</div>
						<div className = 'panel-footer'> 
							<a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> Like</a>
	            <a  className='action-btn font-small-ish ' 
	            	id ={'comment-button-'+this.props.type+'-'+this.props.id} 
	            	data-shown="false" 
	            	onClick={(e)=>{e.preventDefault();this.showComment(this.props.id,this.props.type)}}>
	            	<i className='fa fa-comment'></i> 
	            	 Comment
	            </a>
	            <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-grab-o'></i> Grab</a>
						</div>
					</div>
										{/*======================+++END OF PANEL ====================*/}
						<CommentPad id ={this.props.id} type={this.props.type}/>
						
				</div>
			);
	}
}

export default GistPaperCard;