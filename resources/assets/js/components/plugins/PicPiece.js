import React from 'react'; 
import logo from './../../imgs/f-spinner-2.png';

class PicPiece extends React.Component{
 
  sendPieceInformation(){
    let dataTrain = { 
      imageURL:this.props.image_url,
      body:this.props.body,
      id:this.props.piece_id,
      created_at: this.props.created_at,
      type: this.props.type,
      extras: this.props.extras
    };
    if ( this.props.indicator !== this.props.piece_id ){
      this.props.currentPicStateFunction();
      this.props.openPieceFunction(dataTrain);
      this.createAllOptionsAndPages();
    }
  }
  createAllOptionsAndPages(){
    this.props.cleanUpFunction();
    this.props.createSideOptionsFunction();
    this.props.initAllPagesFunction(this.props.piece_id, this.props.body,this.props.image_url,this.props.type,this.props.extras);
  }

	render(){
		return (
				<div>
					<div className ='col-md-4' style = { styles.pieceFinish } >
            <div className = ''>
              <div className ='my-pic-card z-depth-1-half' > 
                <div onClick = {()=>{this.sendPieceInformation()}} className = {' shots-img  shots-img-'+this.props.piece_id} style={{ height:0, opacity:0.1}} 
                  data-toggle='modal' data-target='#universal-pic-modal'>
                </div>
                <div className = {' spinner spinner-'+ this.props.piece_id} style = {{paddingTop:'30%'}}>
                  <center>
                    <img src={logo}  className = 'spinner-logo' style={{height:50,width:50}}/>
                  </center>
                </div>
              </div>
                <div className='my-card-footer z-depth-1-half clearfix' style={{borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                  <small className = 'angel'><i className = 'fa fa-timer'></i> 3 months ago</small>
                  <div className = 'pull-right'>
                    <small className = 'text text-default p-r-fix'><i className = ' fa fa-camera'></i></small>
                    <small className = 'text text-default p-r-fix number-font'><i className = 'fa fa-money'></i> 40</small>
                    <small className = 'text text-default p-r-fix number-font'><i className = 'fa fa-thumbs-up'></i> 10</small>
                  </div>
                </div>
            </div>
          </div>
				</div>
			);
	}
}

const styles = {
    peiceFinish:{
        marginBottom:10
    }
}

export default PicPiece;