import React from 'react'; 
import Dropdown from './MyDropdown';
class GistPaperCard extends React.Component{
	constructor(props){
		super(props); 
		this.options = [ 
      { title:'Unpublish', fa:'fa-globe',function:null}, 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      { title:'whatsapp', fa:'fa-whatsapp', function:null}
    ];
	}
	nothing(){};

	render(){
		return (
				<div className ="">
					<div className ='panel panel-default paper-panel' style = {{width:"100%"}}> 
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
          		<div className = "" style={{padding:20, minHeight:200, maxHeight:300, }}> 
	          		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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
		              <small className = "number-font t-black"><span className = "fa fa-comments"></span> <span> 40 </span></small> 
		              <small className = " label label-primary pull-right gist-coin-display number-font"> <b>C</b> 400 </small>
		            </div>
          		</div>
						</div>
						<div className = ' panel-footer'> 
							<a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> Like</a>
	            <a href='#' className='action-btn font-small-ish'><i className='fa fa-comment'></i> Comment</a>
	            <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-grab-o'></i> Grab</a>
						</div>
					</div>
				</div>
			);
	}
}

export default GistPaperCard;