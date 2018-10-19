import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './MyDropdown';
import Wager from './Wager';
import CommentPad from './CommentPad';
class GistImageCard extends Component {
  constructor(props){
    super(props); 
    this.doLike = this.doLike.bind(this);
    this.zoom= this.zoom.bind(this);
    this.options = [ 
      { title:'Unpublish', fa:'fa-globe',function:null}, 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      { title:'whatsapp', fa:'fa-whatsapp', function:null},
      { title:'Report', fa:'fa-flag', function:null}
    ];
  }
  showComment(ID,type){
    let togVal = $('#comment-button-'+type+'-'+ID).attr('data-shown');
    if( togVal === 'false'){
      $('.js-comment-on-piece-'+type+'-'+ID).removeClass('vanish'); 
      $('.js-comment-on-piece-'+type+'-'+ID).addClass('appear'); 
      setTimeout(function(){
        $('.js-comment-on-piece-'+type+'-'+ID).addClass('comment-box-entry');
      },80);
      $('#comment-button-'+type+'-'+ID).attr('data-shown','true');
    }
    else{
      $('.js-comment-on-piece-'+type+'-'+ID).removeClass('appear'); 
      $('.js-comment-on-piece-'+type+'-'+ID).addClass('vanish'); 
      $('.js-comment-on-piece-'+type+'-'+ID).removeClass('comment-box-entry');
      $('#comment-button-'+type+'-'+ID).attr('data-shown','false');
    }
  }
  zoom(ID){
    var zoomed = $('#img-zoom-pointer-'+ID).attr('data-zoomed'); 
    if (zoomed=== "false"){
      $('#img-zoom-pointer-'+ID)
      .css({
        transform:'scale(1.3)',
        borderRadius:20, 
        transition:'0.2s ease-in all', 
        boxShadow:'0 3px 3px gray'
      }); 
      $('#img-zoom-pointer-'+ID).attr('data-zoomed','true');      
    }else if(zoomed="true"){
      $('#img-zoom-pointer-'+ID)
      .css({
        transform:'scale(1)',
        borderRadius:0, 
        transition:'0.2s ease-in all',
        boxShadow:'0 0px 0px gray'
      }); 
      $('#img-zoom-pointer-'+ID).attr('data-zoomed','false');  
    }
  }

  doLike() {
    this.props.likeFunction({ user_id: this.props.user.id, picture_piece_id: this.props.id }, this.props.allNews);
    console.log("Your like has been sent");
  }
  nothing(){};
  render() {
    return (
      <div style={{marginTop:40}}>
        <div className = 'panel panel-default solid-p-w' style={{ marginBottom:0}}> 
          <a href='#' className = 'name-badge   my-depth-2 margin-climb-up'  
              style={{background:this.props.details.bcolor,position:'absolute' }}> @{this.props.details.owner.name} 
          </a> 
          <div style={{marginBottom:15, paddingTop:15}} ></div>
          <div className = ' pull-right ' style={{paddingRight:10}}> 
                <Dropdown  options = { this.options } name="Frimpi"></Dropdown>
          </div>
          {/* ================== PANEL-BODY ============== */}
          <div className = 'panel-body clearfix' style ={{padding:'0px '}}> 
            <div className = ' paper-title-div'style={{padding:15}}>
              <p> {this.props.description} </p>
            </div>
            <div className = ' school-course-div pull-right' style={{paddingLeft:5, marginBottom:5}}> 
              <small className = ' label label-info info-bg-color z-depth-1 p-r-fix'><i className ='fa fa-graduation-cap p-r-fix'></i> {this.props.details.owner.school} </small>
              <small className = ' label label-default z-depth-1 p-r-fix'><i className ='fa fa-book p-r-fix'></i> {this.props.course}</small>
            </div>
            <span style={{padding:10 }} className = ' text text-primary font-small number-font'><i className='fa fa-clock-o'></i> 3 seconds ago </span>
            
          {/* ================== IMAGE  ============== */}
            <img src = {this.props.image_link}
              onClick={()=>{this.zoom(this.props.id)}} 
              className='img-responsive gist-img cursor' id={"img-zoom-pointer-"+this.props.id} 
              data-zoomed="false" 

            />
            <div className = ' semi-footer clearfix' style={{padding:"5px 20px"}}>
              <small className = "number-font t-black"><span className = "fa fa-thumbs-up"></span> <span> {this.props.likes} </span> </small> 
              <small className = "number-font t-black"><span className = "fa fa-comments"></span> <span> {this.props.comments} </span></small> 
              <small className = " label label-primary pull-right gist-coin-display number-font"> <b>C</b> {this.props.coins} </small>
            </div>
          {/* ================== WAGER BOX ============== */}
            <Wager></Wager>
          </div> 
         {/* ================== PANEL-FOOTER ============== */}
          <div className = 'panel-footer clearfix'>
          <button 
            onClick = {()=>{ this.zoom(this.props.id)}}
            className = ' btn-sm btn btn-default pull-right zero-radius'>
            <i className = 'fa fa-eye'></i>
          </button> 
            <a href='#' className = 'action-btn font-small-ish'onClick = {()=>{this.doLike()}}>
              <i className = 'fa fa-thumbs-up'></i> Like</a>
            <a 
            id ={'comment-button-'+this.props.type+'-'+this.props.id} 
              onClick ={(e)=>{e.preventDefault();this.showComment(this.props.id, this.props.type)}} 
              className='action-btn font-small-ish' data-shown="false">
              <i className='fa fa-comment'></i> Comment</a>
            <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-grab-o'></i> Grab</a>
          </div>
        </div> 
        <CommentPad id = {this.props.id} type ={ this.props.type} />
      </div>
    );
  }
}

GistImageCard.propTypes = { 
  //details has = name, bcolor, owner
    details: PropTypes.object, 
    type: PropTypes.string,
    id: PropTypes.number
}

export default GistImageCard;
