import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './MyDropdown';
import Wager from './Wager';
import * as moment from 'moment';
class GistImageCard extends Component {
  constructor(props){
    super(props); 
    this.doLike = this.doLike.bind(this);
    this.zoom= this.zoom.bind(this);
    this.options = [ 
      { title:'facebook', fa:'fa-facebook',function:null}, 
    ];
    this.state = { 
      authorise:false, 
      refinedOptions:[],
      current_date: new Date().toISOString()
    }
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
  componentDidMount() {
      // if ($('#home').attr('data-session-page') !== "gist") {
      //   let img = document.createElement('img');
      //     img.src = item.image_link;
          
      //     img.onload = function () {
      //       //do nothing
      //       console.log("I have downloaded :: ", item.image_link)
      //     }
      // }
  };
  

  bringLike() {
    let thisClass = this;
    for (var item of this.props.likesArray) {
      if (Number(item.user_id) === Number(thisClass.props.user.id)) {
        return (
          <a href='#' className={"action-btn-act-liked action-btn font-small-ish pic-like-action-" + this.props.id} 
            style={{}}
            onClick={(e) => { 
              e.preventDefault(); 
              var timer = setTimeout(() => {
                this.doLike();
              }, 1000);
              thisClass.simulateLike('Second');
              }}>
            <i className='fa fa-thumbs-up'></i> Like
             <div style={{ width: 0, display: 'none'}}id={"pic-like-state-div-" + this.props.id} data-liked="On"></div>
        </a>
        );
      }
    };
    //if it actually gets to this point then user prolly hasnt like it nti show the other type
    return (
      <a href='#' className={"action-btn font-small-ish pic-like-action-" + this.props.id} 
       style={{}}
        onClick={(e) => { 
          e.preventDefault(); 
          var myTimer = setTimeout(() => {
            this.doLike()
          }, 1000);
          this.simulateLike('first');
          }}>
        <i className='fa fa-thumbs-up'></i> Like
        <div style={{ width: 0,display:'none' }} id={"pic-like-state-div-" + this.props.id} data-liked="Off"></div>
      </a>
    );
  }
  simulateLike(whichBtn) {
    var likeCountSpans = document.getElementsByClassName('pic-like-count-span-'+this.props.id);
    var likeCountValue = likeCountSpans[0].innerText;
    var toggledValue = $('#pic-like-state-div-'+this.props.id).attr('data-liked');
    if (toggledValue === "Off"){
      $('.pic-like-action-' + this.props.id).addClass('action-btn-act-liked');
     likeCountSpans[0].innerText = Number(likeCountValue)+1;
     likeCountSpans[1].innerText = Number(likeCountValue)+1; 
     $('#pic-like-state-div-'+this.props.id).attr('data-liked', 'On');

    }
    else if (toggledValue === "On") {
      if (whichBtn === "first"){
        $('.pic-like-action-' + this.props.id).removeClass('action-btn-act-liked').css({color:'rgb(107, 106, 106)'});
        likeCountSpans[0].innerText = Number(likeCountValue) - 1;
        likeCountSpans[1].innerText = Number(likeCountValue) - 1;
        $('#pic-like-state-div-'+this.props.id).attr('data-liked', 'Off');
      } 
      else if(whichBtn ==="Second"){
        $('.pic-like-action-' + this.props.id).removeClass('action-btn-act-liked');
        likeCountSpans[0].innerText = Number(likeCountValue) - 1;
        likeCountSpans[1].innerText = Number(likeCountValue) - 1;
        $('#pic-like-state-div-'+this.props.id).attr('data-liked', 'Off');
      }
    }
  }

  zoom(ID){
    var zoomed = $('.img-zoom-pointer-'+ID).attr('data-zoomed'); 
    if (zoomed=== "false"){
      $('.img-zoom-pointer-'+ID)
      .css({
        transform:'scale(1.3)',
        borderRadius:20, 
        transition:'0.2s ease-in all', 
        boxShadow:'0 3px 3px gray'
      }); 
      $('.img-zoom-pointer-'+ID).attr('data-zoomed','true');      
    }else if(zoomed="true"){
      $('.img-zoom-pointer-'+ID)
      .css({
        transform:'scale(1)',
        borderRadius:0, 
        transition:'0.2s ease-in all',
        boxShadow:'0 0px 0px gray'
      }); 
      $('.img-zoom-pointer-'+ID).attr('data-zoomed','false');  
    }
  }

  doLike() {
    this.props.likeFunction({ user_id: this.props.user.id, picture_piece_id: this.props.id }, this.props.allNews,this.props.picNewsData);
  }
  checkOwner(){
    if(this.props.user.id === this.props.details.owner.id){
      let opt = [...this.options, { title: 'delete', fa: 'fa-trash', function: null }, ];
      this.setState({authorise: true,refinedOptions:opt});
    }
    else{
      this.setState({refinedOptions:this.options});
    }
  }
  imageType(){ 
    if(this.props.image_type==="multiple"){
      return(
        <a className="btn raise btn-default xtra-gist-imgs btn-sm rounded pull-right" href={"/shot-view/J3zUZ9WoGvD3M3OcszZ8skHvoPputaKIShq9uPmW6ZqImU8iwby1xOdirul1wgGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/" + this.props.id} target="_blank" >
          Xt
        </a>   
      )
    }
  }
  allowReportFeature(){
    if(this.props.user.id !== this.props.details.owner.id){
      return(
        <small className="pull-right report-button">
          <a target="_blank" href={"/report-this-pic-juD7ir-" + this.props.id}>
          Report</a>
        </small>
      );
    }
  }
  
  
  render() {
    return (
      <div style={{marginTop:40}}>
        <div className = 'panel panel-default solid-p-w clearfix' style={{ marginBottom:0}}> 
          {this.allowReportFeature()}
          <a href={"/profile/ImU8iwby1xOdiru-" + this.props.details.owner.id + "-PputaKIShq9/" + this.props.details.owner.name} className = 'mob-name-fix name-badge  g-p-n  my-depth-2 margin-climb-up'  
            style={{background:this.props.details.bcolor,position:'absolute' }}> 
            @{this.props.details.owner.name} 
            <span style={{color:'#ffd400',marginLeft:3,fontSize:'small',fontWeight:600,fontFamily: 'sans-serif',}}>
              <i style={{marginRight:1}} className="fa fa-arrow-up"></i>
              {this.props.details.owner.reputation.points}
            </span>
          </a> 
          <div style={{marginBottom:15, paddingTop:15}} ></div>
          <div className = 'pull-right' style={{padding:10}}> 
            {/* <Dropdown  
            options = { this.state.refinedOptions } 
            name={"dropy-pic-"+this.props.id}>
            </Dropdown> */}
          </div>
          {/* ================== PANEL-BODY ============== */}
          <div className = 'panel-body clearfix' style ={{padding:'0px '}}> 
            <div className = ' paper-title-div'style={{padding:15}}>
              <p> {this.props.description} </p>
            </div>
            <div className = ' school-course-div pull-right' style={{paddingLeft:5, marginBottom:5}}> 
              <small className = ' label label-info info-bg-color rounded raise' style={{marginRight:5}}>
                <i className='fa fa-graduation-cap ' ></i> {this.props.details.owner.school.split('-')[0]} 
              </small>
              <small className = ' label label-default raise rounded p-r-fix'>
                {this.props.subcourse}
              </small>
            </div>
            <small style={{ padding: 10, fontSize: 'smaller' }}>
              <span className=' text text-primary number-font'><i className='fa fa-clock-o' style={{ marginRight: 3 }}></i> 
              {' '+moment.duration(moment(this.state.current_date).diff(moment(this.props.created_at))).humanize()} ago 
            </span>
            </small>
            <small style={{ fontWeight: 600, fontFamily: 'sans-serif', color: 'sandybrown', fontSize: 'smaller' }}>
              {this.props.paper_term !== null ? this.props.paper_term !== "" ? this.props.paper_term.split('-')[0] : 'Year 1 First Sem' : 'Year 1 First Sem'}
            </small>
            
          {/* ================== IMAGE ============== */}
            <img src = {this.props.image_link}
              onClick={()=>{this.zoom(this.props.id)}} 
              className={'mob-img-fix img-responsive gist-img cursor img-zoom-pointer-'+this.props.id} 
              data-zoomed="false" 
            />
              {/* ===========================SEMI FOOTER ====================== */}
            <div className = 'semi-footer clearfix' style={{padding:"5px 20px"}}>
              <small className = "number-font t-black"><span className = "fa fa-thumbs-up"></span> <span className={"pic-like-count-span-"+this.props.id}> {this.props.likes} </span> </small> 
              <small className = "number-font t-black"><span className = "fa fa-comments"></span> <span> {this.props.comments} </span></small> 
            
               <a href ={"/shot-view/J3zUZ9WoGvD3M3OcszZ8skHvoPputaKIShq9uPmW6ZqImU8iwby1xOdirul1wgGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/"+this.props.id} target="_blank" className = "btn-sm btn btn-secondary pull-right" style={{borderRadius:55}}><i className ="fa fa-forward"></i></a>
               {this.imageType()}
               {/* <small className = " label label-primary pull-right gist-coin-display number-font"> <b>C</b> {this.props.coins} </small> */}
            </div>
          {/* ================== WAGER BOX ============== */}
            <Wager></Wager>
          </div> 
         {/* ================== PANEL-FOOTER ============== */}
          <div className = 'panel-footer clearfix'>
          <button 
            onClick = {()=>{ this.zoom(this.props.id)}} style={{borderRadius:55}}
            className = ' btn-sm btn btn-default pull-right zero-border'>
            <i className = 'fa fa-plus'></i>
          </button> 
              {/* <a  className = 'action-btn font-small-ish'onClick = {(e)=>{e.preventDefault();this.doLike()}}>
                <i className = 'fa fa-thumbs-up'></i> Like</a> */}
            {this.bringLike()}
            <a 
            id ={'comment-button-'+this.props.type+'-'+this.props.id} 
              onClick={(e) => { e.preventDefault(); this.props.showComments(this.props.id, "picture", "Shot")}} 
              className='action-btn font-small-ish'
               data-shown="false" data-toggle="modal" data-target="#universal-comment-board">
              <i className='fa fa-comment'></i> Comment</a>
           
          </div>
        </div> 
       
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
