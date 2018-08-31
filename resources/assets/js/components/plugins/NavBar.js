import React from 'react'; 
import QB from './../../imgs/QB.png';

class NavBar extends React.Component{

	render(){
		return (
				<div>
					<nav className="navbar navbar-default  nav-bar-stick z-depth-1 zero-radius " 
						style = { {margin:0,padding:0, borderBottomColor:"black",background:"black"} }>
		        <div className="container-fluid clearfix" style = {{}}>
		          <div className="navbar-header">
		            <a className="navbar-brand" href="#" style={{padding:15}}>
		             <span  className = 'QB'>QB</span> <span className = "fa fa-tint QB-tint"></span>
		            </a>
		          
		          </div>
		          <div className = "pull-right" style={{marginTop:10}}>
		          	<small className = ' ' style={{color:"white",margin:7,fontSize:"2.2rem"}}><i className = ' fa fa-bell nav-icon'></i></small>
		            <small className = '' style={{color:"white",margin:7,fontSize:"2.2rem"}}><i className = ' fa fa-dashboard nav-icon'></i></small>
		            
		          </div>
		        </div>
		      </nav>
				</div>
			);
	}
}

export default NavBar