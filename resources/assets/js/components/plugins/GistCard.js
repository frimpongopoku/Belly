import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './../../components/Plugins/MyDropdown';
import Wager from './../../components/Plugins/Wager';
class GistCard extends Component {
  constructor(props){
    super(props); 
    this.options = [ 
      { title:'Unpublish', fa:'fa-globe',function:null}, 
      { title:'facebook', fa:'fa-facebook',function:null}, 
      { title:'whatsapp', fa:'fa-whatsapp', function:null}
    ];
  }

  nothing(){};
  render() {
    return (
      <div>
        <div className = 'panel panel-default solid-p-w'> 
          <a href='#' className = 'name-badge   my-depth-2 margin-climb-up'  
              style={{background:this.props.details.bcolor,position:'absolute' }}> @{this.props.details.name} 
          </a> 
          <div style={{marginBottom:15, paddingTop:15}} ></div>
          <div className = ' pull-right ' style={{paddingRight:10}}> 
                <Dropdown  options = { this.options } name="Frimpi"></Dropdown>
          </div>
          {/* ================== PANEL-BODY ============== */}
          <div className = 'panel-body clearfix' style ={{padding:'0px '}}> 
            <div className = ' paper-title-div'style={{padding:15}}>
              <p> And the something happend @Euligi and what is this things!!!  Guys it is happening </p>
            </div>
            <div className = ' school-course-div pull-right' style={{paddingLeft:5, marginBottom:5}}> 
              <small className = ' label label-info info-bg-color z-depth-1 p-r-fix'><i className ='fa fa-graduation-cap p-r-fix'></i> KNUST </small>
              <small className = ' label label-default z-depth-1 p-r-fix'><i className ='fa fa-book p-r-fix'></i> Computer Science </small>
            </div>
            <span style={{padding:10 }} className = ' text text-primary font-small number-font'><i className='fa fa-clock-o'></i> 3 seconds ago </span>
            
          {/* ================== IMAGE  ============== */}
            <img src = '/imgs/knust.jpg' className='img-responsive gist-img' />
            <div className = ' semi-footer clearfix' style={{padding:"5px 20px"}}>
              <small className = "number-font t-black"><span className = "fa fa-thumbs-up"></span> <span> 150 </span> </small> 
              <small className = "number-font t-black"><span className = "fa fa-comments"></span> <span> 40 </span></small> 
              <small className = " label label-primary pull-right gist-coin-display number-font"> <b>C</b> 400 </small>
            </div>
           
          {/* ================== WAGER BOX ============== */}
            <Wager></Wager>
          </div> 
        {/* ================== PANEL-FOOTER ============== */}
          <div className = 'panel-footer'> 
            <a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> Like</a>
            <a href='#' className='action-btn font-small-ish'><i className='fa fa-comment'></i> Comment</a>
            <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-grab-o'></i> Grab</a>
          </div>
        </div> 
      </div>
    );
  }
}

GistCard.propTypes = { 
    details: PropTypes.object,
    bcolor: PropTypes.string, 
    name: PropTypes.string 
}

export default GistCard;
