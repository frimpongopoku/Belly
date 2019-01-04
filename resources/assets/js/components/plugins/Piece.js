import React from 'react'; 
import PropTypes from 'prop-types';
import * as moment from 'moment';
class Piece extends React.Component{

  sendPieceInformation(){
    let dataTrain = {
      title:this.props.title, 
      owner: this.props.owner, 
      course:this.props.course, 
      fileType: this.props.fileType, 
      body:this.props.body,
      ID: this.props.ID,
      likes_count: this.props.likes_count,
      comments_count:this.props.comments_count
    };
    if (this.props.indicator !== this.props.ID){
      this.props.currentTextStateFunction();
      this.createOptionsAndPages();
      this.props.openPieceFunction(dataTrain);
    }
  }
  createOptionsAndPages(){
    this.props.textModalCleanUpFunction();
    this.props.initAllPagesFunction(this.props.title,this.props.body,this.props.ID);
    this.props.createSideOptionsFunction();
  }
 
	render(){
		return (
			<div> 
				<div className ='col-md-4 col-sm-6 col-xs-12' style = { styles.pieceFinish } >
          <div className = ''>
            <div className ='my-card z-depth-1-half' 
              onClick = {()=>{this.sendPieceInformation()}} 
              data-toggle='modal' 
              data-target="#universal-text-modal"> 
              <center>
                <p className='title-flag'
                   style ={{textTransform:'uppercase'}}> 
                   <b>{this.props.title}</b>
                </p>
              </center>
                <p><b>Name:</b> {this.props.owner}</p>
                <p><b>Course:</b> {this.props.course}</p>
                <p style={{color:"#ccc"}}><b>File-type:</b> <span 
                >{this.props.fileType} </span></p>
            </div>
            <div className='my-card-footer z-depth-1-half clearfix' 
              style={{borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
              <small className = 'angel number-font'><i className = 'fa fa-timer'></i> {moment(this.props.created_at).format("LL")}</small>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
const styles = { pieceFinish:{ marginBottom:10 }};
Piece.propTypes = { 
  openPieceFunction: PropTypes.func,
  currentTextStateFunction:PropTypes.func,
	title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
	owner: PropTypes.string.isRequired, 
	course: PropTypes.string.isRequired, 
	fileType: PropTypes.string.isRequired, 
  ID:PropTypes.number.isRequired
}
export default Piece;