import React, { Component } from 'react';
import PdfCard from './../plugins/PdfCard';
import Sidebar from './../navigation/Sidebar';

class PDFs extends Component {

  constructor(props){
    super(props);
    this.state ={badgeNumber:0};
  }
  searchForMoreNews(){
    let nextBadge = Number(this.state.badgeNumber + 1); 
    this.props.getMorePDFNewsFunction(this.props.pdfNews,nextBadge); 
    this.setState({badgeNumber:nextBadge});
  }
  ejectFiles(){
    if(this.props.pdfNews !== null){
      let thisClass = this;
      return this.props.pdfNews.map(function(file){
        var num = Math.round(Math.random(1000000) * 100000000000);
        var loopIndex = "news-pdf-" + num.toString();
        return <div key={loopIndex}>
        <PdfCard 
          deletePDFFunction ={thisClass.props.deletePDFFunction}
          id = {file.id} 
          user = {thisClass.props.user} 
          pdf_link = {file.pdf_link} 
          title={file.title} 
          course={file.course} 
          subcourse={file.subcourse !== null ? file.subcourse.name : ''}
          created_at ={file.created_at} 
          owner={file.user} 
          paper_term={file.paper_term}
        />
        </div>
      });
    }
  }
  empty(){
    if(this.props.pdfNews !== null){
      if(this.props.pdfNews.length ===0){
        return (<div> 
          <center>
            <p style={{ fontSize: 'medium', fontWeight: 600, color: "black" }}>There are no
                  <span className='text text-warning'> PDF</span> gists available for this course yet.<br /> Start creating...</p>
            <button className="btn btn-default" style={{marginBottom:6}}
              onClick={() => { let sideBar = new Sidebar(); sideBar.switchPage('create-page') }}>
              <span className="fa fa-plus"></span></button>
          </center>
        </div>);
      }
    }
  }
  ejectButton(){
    if (this.props.pdfNews !== null) {
      if (this.props.pdfNews.length === 10) {
        return(
          <button className={"btn btn-default btn-block"} onClick={() => { this.searchForMoreNews(); this.spinnerTrick() }}>
            Load More
         <span className="fa fa-spinner fa-spin" style={{ marginLeft: 5, display: "none", color: "black" }} id="pdf-load-spinner"></span>
          </button> 
        )
      }
    }
  }
  spinnerTrick(){
    $('#pdf-load-spinner').fadeIn(function(){
      setTimeout(() => {
        $('#pdf-load-spinner').fadeOut();
      }, 1000);
    })
  }
  render(){ 
    return (
      <div style={{margin:10, padding:20}}>
        
           <p className="mobile-margin-top-20" style={{fontSize:"1.9rem",color:"black"}}>
           All the latest Pdfs in <b>{this.props.user !==null ? this.props.user.course :''} </b>
            Uploaded by students who offer your programme in your school.
           </p>
        
        <div className="pdf-page-m-fix col-lg-12  col-md-12 mobile-commot-paddings mobile-commot-margins" style={{padding:20}}> 
        {this.empty()}
        {
          this.ejectFiles()
        }
        {this.ejectButton()}
        
        </div>
      </div>
    );
  }
}

export default PDFs;
//WHERE YOU ARE NOW, YOU GOTTA WIRE "LOAD MORE"