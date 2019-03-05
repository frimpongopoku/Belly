import React, { Component } from 'react';
import * as moment from 'moment';
class PDFCard extends Component {

  constructor(props){
    super(props); 
    this.state = { 
       current_date: new Date().toISOString()
    }
  }
  generateCourseColor(){
    
    switch (this.props.course) {
      case "Agriculture":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#524212'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Computer Science":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#d8c120',color:'black'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Biology":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#20d0d8',color:'black'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Statistics":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#7f6ede'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Physics":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#d62323'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Dondology":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#3e23d6'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Actuarial Science":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#ffc107',color:'black'}}>
            {this.props.subcourse}
          </small>
        )
        break;
      case "Information Science":
        return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'#524212'}}>
            {this.props.subcourse}
          </small>
        )
        break;
    
      default:
         return (
          <small className=" rounded label " 
            style={{ padding: 7, marginLeft: 4 ,background:'black'}}>
            {this.props.subcourse}
          </small>
        )
        break;
    }
  }

  
  deleteAuthority(){
    if(this.props.user.id === this.props.owner.id){
      return (<button className ="btn btn-sm btn-default" style={{color:"crimson", marginLeft:5,marginRight:5,borderRadius:55}} onClick ={()=>{this.doDelete()}}><i className ="fa fa-minus"></i></button>)
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
    this.props.deletePDFFunction(this.props.id);
  }
  allowReportFeature() {
    if (this.props.user.id !== this.props.owner.id) {
      return (
        <small className="pull-right report-button">
          <a target="_blank" href={"/report-this-pdf-juD7ir-" + this.props.id}>
            Report</a>
        </small>
      );
    }
  }
  render() {
    return (
      <div id={"pdf-item-box-"+this.props.id} >
        <div className="thumbnail mob-pad-fix cursor clearfix pdf-page-card">
          <div className="pull-left pdf-left-design mobile-vanish-key">
            <center> 
              <h1 className="angel" style={{fontFamily:'sans-serif',textTransform:'uppercase', textShadow:'1px 1px 1px #3F51B5'}}>
              {this.props.title.charAt(0)+ this.props.title.charAt(this.props.title.length -1)}</h1>
              </center>
          </div>
          <div className="just for space" style={{marginBottom:20}}></div>
          <small className="rounded pull-right " style={{padding: 7, marginRight: 4 }}>
         
          <a style={{textDecoration:"none" }} className="pdf-profile-name" target="_blank" href={"profile/ImU8iwby1xOdiru-"+this.props.owner.id+"-PputaKIShq9/"+this.props.owner.name}>
            <b>@{this.props.owner.name}</b>
              <span style={{ color: '#bb6629', marginLeft: 3, fontWeight: 600, fontFamily: 'sans-serif'}}>
              <i style={{marginRight:1}}className="fa fa-arrow-up"></i> 
                {this.props.owner.reputation.points}
              </span>
            </a>
          </small>
          <p className="pdf-card-title">   <a href={this.props.pdf_link} target="_blank" >{this.props.title}</a></p>
          <small style={{ fontWeight: 600, fontFamily: 'sans-serif', color: '#795548', fontSize: 'smaller' }}>
            {this.props.paper_term !== null ? this.props.paper_term !== "" ? this.props.paper_term.split('-')[0] : 'Year 1 First Sem' : 'Year 1 First Sem'}
          </small>
          {this.deleteAuthority()}
          {this.allowReportFeature()}
    
          <div className="pull-right">
            <small><b>Posted </b> <span className="number-font">{moment.duration(moment(this.state.current_date).diff(moment(this.props.created_at))).humanize()} ago </span></small>
            {this.generateCourseColor()}
             {/* <small className=" rounded label label-success" style={{ padding: 7, marginLeft: 4 }}>{this.props.course}</small> */}
          </div>
        </div>
      </div>
    );
  }
}
export default PDFCard;
