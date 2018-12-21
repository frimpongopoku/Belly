import React, { Component } from 'react';

class UniversalDelete extends Component {

  deletePaper(){
    if(this.props.paperType ==="paper"){
      $.ajax({method:'GET',url:'delete-paper/'+this.props.paperID})
      .done(function(){
        //dismiss modal
        //reload news 
      });
    }
    else{
      //picturelink

    }
  }
  render() {
    return (
      <div id="le-delete-board">
        <div className='modal fade my-depth-1' id="universal-delete-board" >
          <div className='modal-dialog modal-sm'>
            <div className='modal-content'>
              <div className ="modal-body"> 
                <center> 
                    <p>Are you sure you want to delete <i style={{color:"crimson"}}>"<b>{this.props.paperTitle}</b>"</i></p>
                </center>
              </div>
              <div className="modal-footer ">
                <button className= "btn btn-danger" data-dismiss="modal">No</button> 
                <button className = "btn btn-success" onClick = {()=>{this.deletePaper()}}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UniversalDelete;
