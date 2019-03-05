import React, { Component } from 'react';

class SettingsModal extends Component {
  
  yesToCommentNotification(){
    this.yesColorChange('comment-yes-btn','comment-no-btn');
    $.ajax({method:'get',url:'set-comment-notification/1'})
    .done(function(response){
      console.log(" Notification set to yes! ");
    });
  }
  noToCommentNotification(){
    this.noColorChange('comment-no-btn','comment-yes-btn');
    $.ajax({method:'get',url:'set-comment-notification/0'})
    .done(function(response){
      console.log(" Notification set to No! ");
    });
  }
  yesColorChange(yesButtonID,noButtonID){
    $('#'+yesButtonID).addClass('yes'); 
    $('#'+noButtonID).removeClass('no');
  }
  noColorChange(noButtonID,yesButtonID){
    $('#' + yesButtonID).removeClass('yes');
    $('#' + noButtonID).addClass('no');
  }

  commentNotificationsToggleButtons(){
    if(this.props.settings !==null){
      if(this.props.settings.comment_notification === 1){
        return (
          <div> 
            <button className="btn btn-default" id="comment-no-btn"
              onClick={() => { this.noToCommentNotification(); }}
            ><i className="fa fa-close"></i> No</button>
            <button className="yes btn btn-default little-m-left-right" id="comment-yes-btn"
              onClick={() => { this.yesToCommentNotification() }}
            ><i className="fa fa-check"></i> Yes</button>
          </div>
        )
      }
      else if(this.props.settings.comment_notification ===0){
        return (
          <div>
            <button className="btn no btn-default" id="comment-no-btn"
              onClick={() => { this.noToCommentNotification(); }}
            ><i className="fa fa-close"></i> No</button>
            <button className=" btn btn-default little-m-left-right" id="comment-yes-btn"
              onClick={() => { this.yesToCommentNotification() }}
            ><i className="fa fa-check"></i> Yes</button>
          </div>
        )
      }
    }
  }
  render() {
    return (
      <div>
        <div className='modal fade my-depth-1' id="settings-modal">
          <div className='modal-dialog modal-md'>
            <div className='modal-content'>
              <div className="modal-header" style={{color:'black'}}>
                <button style={{margin:9}} className="pull-right close" data-dismiss="modal"><i className="fa fa-close"></i></button> 
                <h3 className="modal-title"><i className="fa fa-cog" style={{marginLeft:20,marginRight:15}}></i>Settings</h3>
              </div>
              <div className='modal-body' style={{ background: 'antiquewhite' }}> 
                <div className="settings-body-padding mob-settings-padding" >
                  <h5><b>COMMENT NOTIFICATIONS</b></h5>
                    {this.commentNotificationsToggleButtons()}
                    <small style={{color:'black'}}>You will receive email messages on <b>"frimpong@yoo.com"</b> anytime anyone comments on your piece</small>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsModal;
