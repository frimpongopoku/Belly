import React, { Component } from 'react';

class UniversalComment extends Component {
  constructor(props){
    super(props); 

  }

  render() {
    return (
      <div>
        <div className='modal fade my-depth-1' id="universal-comment-board">
          <div className='modal-dialog modal-md'>
            <div className='modal-content'>
              <div className =" modal-header" id="js-piece-title-comment-box">
                 
              </div>
              <div className='modal-body' id='js-comment-modal-body' style ={{paddingTop:15, height:450, maxHeight:450, minHeight: 450,overflowY:'scroll'}}>
                
                <div id = "js-comment-spinner">
                  <center><h1 style={{margin:100}}><i className= "fa fa-spinner fa-spin"></i></h1></center>
                </div>
              </div>
              <div className = "modal-footer ">
                <div className="col-lg-12" id="js-comment-board-footer">
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <textarea type='text' placeholder="Write a comment..." id ="comment-textbox"ref="comment"
                      className=' comment-box rounded form-control  ' style={{}}>
                    </textarea>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default UniversalComment;
