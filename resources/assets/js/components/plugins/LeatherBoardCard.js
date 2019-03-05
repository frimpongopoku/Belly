import React, { Component } from 'react';

class LeatherBoardCard extends Component {
  cardType(){
    if(this.props.cardType === 'type-1'){
      return(
        <center>
          <h1 className="number-font l-b-left-text-raise">
            <i className="fa celebrate fa-trophy"></i>
          </h1>
          <h5 className="number-font" style={{ fontWeight: 600 }}> {this.props.position} / {this.props.totalNumber}</h5>
        </center>
      );
    }
    else if(this.props.cardType ==='type-2'){
      return (
        <center>
          <h1 className="number-font l-b-left-text-raise">
            {this.props.position} / {this.props.totalNumber}
          </h1>
        </center>
      )
    }
  }
  render() {
    return (
      <div>
        <div className="thumbnail l-b-thumb clearfix">
          <div className={"z-depth-1 l-b-left pull-left "+this.props.colorClass} style={{ padding: 40 }}>
           {this.cardType()}
          </div>
          <div>
            <h3 className="l-b-card-name">
              <a className="angel" style={{cursor:'pointer'}}
                href={"/profile/ImU8iwby1xOdiru-"+this.props.id+"-PputaKIShq9/"+this.props.firstName} 
                target="_blank">{this.props.firstName + " " +this.props.lastName}
              </a>
            </h3>
            <h4 className="l-b-user-rep number-font">
              <i className="fa fa-arrow-up" style={{ marginRight: 5 }}></i>{this.props.reputationPoints}</h4>
              <small className=" angel number-font"> 
                {this.props.numberOfPicturePieces+this.props.numberOfTextPieces+ this.props.numberOfPdfPieces} upload(s), 
              </small>
              <small className="angel number-font">
                <i className="fa fa-file-text-o little-m-left-right" >
                </i> {this.props.numberOfTextPieces} text piece(s) 
              </small>
              <small className="angel number-font">
                <i className="fa fa-camera little-m-left-right" ></i> 
                {this.props.numberOfPicturePieces} picture piece(s), 
                 <i className="fa fa-file-pdf-o little-m-left-right" ></i> {this.props.numberOfPicturePieces} pdf piece(s) and 
                 <span style={{ marginRight: 2 }}></span> 
                {+this.props.totalCommentsOnPieces + this.props.totalLikesOnPieces+" "} 
                interaction(s) on his pieces by other users 
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default LeatherBoardCard;
