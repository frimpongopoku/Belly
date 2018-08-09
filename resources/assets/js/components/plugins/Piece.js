import React from 'react'; 
import PropTypes from 'prop-types';
class Piece extends React.Component{


	render(){
		return (
				<div>
					<div className ='col-md-4' style = { styles.pieceFinish } >
                        <div className = ''>
                            <div className ='my-card z-depth-1-half' data-toggle='modal' data-target={'#piece-'+this.props.ID}> 
                                <center>
                                    <p className='title-flag' style ={{textTransform:'uppercase'}}> <b>{this.props.title}</b>
                                    </p>
                                </center>
                                    <p><b>Name:</b> {this.props.owner}</p>
                                    <p><b>Course:</b> {this.props.course}</p>
                                    <p><b>File-type:</b> <span style={{borderRadius:0}} className = 'label label-danger z-depth-1 red'>{this.props.fileType} </span></p>
  
                            </div>
                                <div className='my-card-footer z-depth-1-half clearfix' style={{borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                                    <small className = 'angel'><i className = 'fa fa-timer'></i> 3 months ago</small>

                                </div>
                        </div>
                    </div>
                </div>
			);

	}
}
const styles = { pieceFinish:{ marginBottom:10 }}

Piece.propTypes = { 
	title: PropTypes.string.isRequired,
	owner: PropTypes.string.isRequired, 
	course: PropTypes.string.isRequired, 
	fileType: PropTypes.string.isRequired, 
    ID:PropTypes.number.isRequired

}

export default Piece;