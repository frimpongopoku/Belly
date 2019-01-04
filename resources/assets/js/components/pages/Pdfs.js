import React, { Component } from 'react';
import PdfCard from './../plugins/PdfCard';
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
        return <div key={loopIndex}><PdfCard 
          deletePDFFunction ={thisClass.props.deletePDFFunction}
          id = {file.id} 
          user = {thisClass.props.user} 
          pdf_link = {file.pdf_link} 
          title={file.title} 
          course={file.course} 
          created_at ={file.created_at} 
          owner={file.user} 
          
         
        />
        </div>
      });
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
        <center> 
           <p style={{fontSize:"1.9rem",color:"black"}}>All the latest PDFs in <b>{this.props.user !==null ? this.props.user.course :''}</b></p>
        </center>
        <div className="col-lg-10 col-md-offset-1 col-md-10 mobile-commot-paddings mobile-commot-margins" style={{padding:20}}> 
        {
          this.ejectFiles()
        }
        <button className="btn btn-default btn-block" onClick={()=>{this.searchForMoreNews();this.spinnerTrick()}}>
          Load More 
         <span className="fa fa-spinner fa-spin" style={{ marginLeft: 5, display:"none" ,color:"black"}} id="pdf-load-spinner"></span>
        </button> 
        </div>
      </div>
    );
  }
}

export default PDFs;
//WHERE YOU ARE NOW, YOU GOTTA WIRE "LOAD MORE"