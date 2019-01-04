import React from 'react'; 
import QB from './../../imgs/QB.png';

class NavBar extends React.Component{

	goToDashboard(type){
		//fade out the news/gist page, and get the value stored in the currentpage box and then fade to that page! 
		$('#gist').fadeOut(500); 
		$('#nav-bar').fadeOut(500);
		setTimeout(function(){
			let curr = $('#current-page-box').val(); 
			$('#gist-button').removeClass('side-active');
      if(curr ==='gist'){
        //under normal circumstances, the current page textbox is never going to filled with "gist"
        //unless a use visits that page via the gist link which is "/home/new/"
        //so always check if the current page box is filled with 'gist' then fade dashboard in
        $('#dashboard').fadeIn(200); 
        $('#dashboard-button').addClass('side-active');
        $('#current-page-box').val('dashboard');
      }
      else{
        $('#' + curr).fadeIn(200);
        $('#' + curr + '-button').addClass('side-active');
      }
      if(type==="mobile"){
        $('#mobile-nav').fadeIn(200);
      }
      else{
        $('.side-nav').fadeIn(200); 
      }
			
     
      
			
		},600)
  }
  goToMobileDashboard(type) {
    //fade out the news/gist page, and get the value stored in the currentpage box and then fade to that page! 
    $('#gist').fadeOut(500);
    $('#nav-bar').fadeOut(500);
    setTimeout(function () {
      let curr = $('#current-page-box').val();
      $('#gist-button').removeClass('side-active');
      if (curr === 'gist') {
        //under normal circumstances, the current page textbox is never going to filled with "gist"
        //unless a use visits that page via the gist link which is "/home/new/"
        //so always check if the current page box is filled with 'gist' then fade dashboard in
        $('#dashboard').fadeIn(200);
        $('#dashboard-button').addClass('side-active');
        $('#current-page-box').val('dashboard');
      }
      else {
        $('#' + curr).fadeIn(200);
        $('#' + curr + '-button').addClass('side-active');
      }
      //$('.side-nav').fadeIn(200);
    }, 600)
  }
	render(){
		return (
				<div>
					<nav className="navbar navbar-default app-color b-app-color nav-bar-stick z-depth-1 zero-radius " 
						style = { {margin:0,padding:0} }>
		        <div className="container-fluid clearfix" style = {{}}>
            <div className="navbar-header" style={{display: 'inline-block'}}>
		            <a className="navbar-brand" href="#" style={{padding:15,}}>
		             <span  className = 'QB'>QB</span> <span className = "fa fa-tint tint-slow QB-tint"></span>
		            </a>
		          </div>
		          <div className = "pull-right" style={{marginTop:10}}>
		          	  {/* <small  className = '' style={{color:"white",margin:7,fontSize:"2.2rem"}}><i className = ' fa fa-bell nav-icon'></i></small> */}
		            <small onClick = {()=>{ this.goToDashboard("non-mobile")}} className = 'mobile-vanish-key tablet-vanish-key pc-appearance-key' style={{color:"white",margin:7,fontSize:"2.2rem"}}>
		            	<i className = ' fa fa-dashboard nav-icon'></i>
                </small>  
              <small onClick={() => { this.goToDashboard("mobile") }} className='mobile-apperance-key tablet-appearance-key pc-vanish-key' style={{ color: "white", margin: 7, fontSize: "2.2rem" }}>
                <i className=' fa fa-dashboard nav-icon'></i>
              </small>  
		          </div>
		        </div>
		      </nav>
				</div>
			);
	}
}

export default NavBar