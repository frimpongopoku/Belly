import React from 'react'; 
import logo from './../../imgs/f-spinner-2.png';
import * as moment from 'moment';

class PicPiece extends React.Component{
 
  sendPieceInformation(){
    let dataTrain = { 
      imageURL:this.props.image_url,
      body:this.props.body,
      id:this.props.piece_id,
      created_at: this.props.created_at,
      type: this.props.type,
      extras: this.props.extras,
      likes_count:this.props.likes_count,
      comments_count:this.props.comments_count,
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
					<div className ='col-md-4' >
            <div className = '' style={{marginBottom: 10,}}>
              <div className ='mobile-l-r-margin my-pic-card z-depth-1-half' > 
              <div onClick={() => { this.sendPieceInformation() }} className={' shots-img  shots-img-' + this.props.piece_id} style={{ height: 0, opacity: 0.1, }} 
                  data-toggle='modal' data-target='#universal-pic-modal'>
                </div>
                <div className = {' spinner spinner-'+ this.props.piece_id} style = {{paddingTop:'30%'}}>
                  <center>
                    <img src={logo}  className = 'spinner-logo' style={{height:50,width:50}}/>
                  </center>
                </div>
              </div> 
                <div className='mobile-l-r-margin my-card-footer z-depth-1-half clearfix' style={{borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
              <small className='angel number-font'><i className='fa fa-timer'></i> {moment(this.props.created_at).format("LL")}</small>
              <small style={{ marginLeft: 5, padding: 5, fontFamily: 'sans-serif', color: '#FFEB3B' }}>{this.props.paper_term !== null ? this.props.paper_term !== "" ? this.props.paper_term.split('-')[1] : 'Y1FS' : 'Y1FS'}</small>

                  <div className = 'pull-right'>
                <small className=""><a target="_blank" href={'/shot-view/J3zUZ9WoGvD3M3OcszZ8skHvoPputaKIShq9uPmW6ZqImU8iwby1xOdirul1wgGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/' + this.props.piece_id} style={{ color: "orange" }}><i className="fa fa-forward"></i></a></small>
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