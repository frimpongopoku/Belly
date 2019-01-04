import React, { Component } from 'react';

class ResultsPad extends Component{
  render() {
    return (
      <div>
        <div data-toggled="false" className= "clearfix thumbnail z-depth-1 vanish tablet-results-fix results-pad mobile-results-fix" 
          style={{
            zIndex: 100, padding: 50, paddingTop:20,position: "absolute", width: "100%",}} id="results-pad">
        
          <div className="search-result-item" id="search-results-second-div"style={{minHeight: 250, maxHeight: 250, overflowY:
              "scroll"}}>
            <div id ="search-loading" style={{marginTop:50}}> 
              <center> 
                <h1 className = "black-text"><i className ="fa fa-spinner fa-spin"></i></h1> 
                <h4 className= "black-text">searching...</h4>
              </center>
            </div>
            <div id="no-results-div" className= "vanish">
              <center>
                <h1> <span className="fa fa-search"></span></h1>
                <h3>No results found </h3>
              </center>
            </div>
            <div className= "col-lg-6 col-md-6 col-sm-6" id="js-paper-results-container"> 
              
            </div> 
            
            <div className="col-lg-6 col-md-6 col-sm-6" id="js-pic-results-container"> 
              
            </div>
          </div>
          <div className="pull-right" style={{ position: 'absolute', bottom: 30, right: 50 }}>
            <button className="btn btn-danger z-depth-1" 
              onClick={() => { this.props.toggleFunction(); }}>
              Close
          </button>
          </div>
          
        </div>  
      </div>
    );
  }
}

export default ResultsPad;
