import React from 'react'; 
import QB from './../../imgs/QB.png';

class NavBar extends React.Component{

	goToDashboard(){
		//fade out the news/gist page, and get the value stored in the currentpage box and then fade to that page! 
		$('#gist').fadeOut(500); 
		$('#nav-bar').fadeOut(500);
		setTimeout(function(){
			let curr = $('#current-page-box').val(); 
			$('#gist-button').removeClass('side-active');
			$('#'+curr+'-button').addClass('side-active');
			$('#'+curr).fadeIn(200);
			$('.side-nav').fadeIn(200); 
			//$('#'+curr).css({marginLeft:50});
			
		},600)
	}
	render(){
		return (
				<div>
					<nav className="navbar navbar-default app-color b-app-color nav-bar-stick z-depth-1 zero-radius " 
						style = { {margin:0,padding:0} }>
		        <div className="container-fluid clearfix" style = {{}}>
		          <div className="navbar-header">
		            <a className="navbar-brand" href="#" style={{padding:15}}>
		             <span  className = 'QB'>QB</span> <span className = "fa fa-tint QB-tint"></span>
		            </a>
		          </div>
		          <div className = "pull-right" style={{marginTop:10}}>
		          	<small  className = '' style={{color:"white",margin:7,fontSize:"2.2rem"}}><i className = ' fa fa-bell nav-icon'></i></small>
		            <small onClick = {()=>{ this.goToDashboard()}} className = '' style={{color:"white",margin:7,fontSize:"2.2rem"}}>
		            	<i className = ' fa fa-dashboard nav-icon'></i></small>  
		          </div>
		        </div>
		      </nav>
				</div>
			);
	}
}

export default NavBar