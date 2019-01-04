import React, { Component } from 'react';

class PDFCard extends Component {

    
  generateColor(){
    let num = Number(Math.round(Math.random(3)*100));
    console.log("sdfkjslkdjfd:::: ",num)
    switch (num) {
      case num < 50 :
        return  "label-success";
        break;
      case num > 50 && num <90:
        return "label-danger";
        break;
      case num > 90:
        return "label-warning";
        break;
      default:
        return "";
        break;
    }
  }

  
  deleteAuthority(){
    if(this.props.user.id === this.props.owner.id){
      return (<small><a style={{color:"crimson", paddingLeft:4}} onClick ={()=>{this.doDelete()}}>delete</a></small>)
    }
  }
  doDelete(){
    let pdfItem = $("#pdf-item-box-"+this.props.id); 
    let thisClass = this;
    //this.props.deletePDFFunction(this.props.id);
    setTimeout(() => {
      pdfItem.addClass("remove-trick"); 
      pdfItem.fadeOut();
    }, 200);
  }
  render() {
    return (
      <div id={"pdf-item-box-"+this.props.id} >
        <div className="thumbnail cursor clearfix pdf-page-card">
          <small className={" rounded pull-right " + this.generateColor()} style={{ padding: 7, marginRight: 4 }}>
          <a style={{textDecoration:"none" }} className="pdf-profile-name" target="_blank" href={"profile/ImU8iwby1xOdiru-"+this.props.owner.id+"-PputaKIShq9/"+this.props.owner.name}>
            <b>@{this.props.owner.name}</b>
            </a>
          </small>
          <p className="pdf-card-title">   <a href={this.props.pdf_link} target="_blank" >{this.props.title}</a></p>
          <small><i className="fa fa-eye"></i> <span className="number-font">35 people have seen this </span></small>
          {this.deleteAuthority()}
    
          <div className="pull-right">
            <small><b>posted:</b> <span className="number-font">{this.props.created_at}</span></small>
            <small className=" rounded label label-success" style={{ padding: 7, marginLeft: 4 }}>{this.props.course}</small>
          </div>
        </div>
      
      </div>
    );
  }
}

export default PDFCard;
