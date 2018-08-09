import React from 'react'; 
import './../../app.css';


class SnackBar extends React.Component{


	render(){
		return (

					<div id={ this.props.ID } className ={ this.props.color + " " + 'my-depth-1 snack-bar' }>
	                    { this.props.notice }
	                </div>
			
			);
	}
}

export default SnackBar