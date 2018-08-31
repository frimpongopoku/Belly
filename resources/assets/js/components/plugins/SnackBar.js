import React from 'react'; 
import './../../app.css';


class SnackBar extends React.Component{


	render(){
		return (

					<div id={ this.props.ID } className ={ this.props.color + " " + 'my-depth-1 snack-bar m-r-fix' }>
	                    <span className = "m-rigt-bit">{ this.props.notice }</span> <span className ='fa fa-spinner fa-spin'></span>
	                </div>
			
			);
	}
}

export default SnackBar