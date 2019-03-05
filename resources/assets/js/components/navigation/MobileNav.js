import React, { Component } from 'react';

class MobileNav extends Component {
  constructor(props){
    super(props);
    this.menuItems = [
      {
          fa: 'fa-globe',
          name: 'gist'
        },
          {
            fa: 'fa-dashboard',
            name: 'dashboard'
          },
          {
            fa: 'fa-user',
            name: 'profile'
          },
          {
            fa: 'fa-plus',
            name: 'create-page'
          },
          {
            fa: 'fa-file-pdf-o',
            name: 'pdfs'  
      },
    ]
  }
  switchPage(choicePage,type) {
    this.menuItems.filter(item => choicePage !== item.name).forEach(itemB => {
      $('#' + itemB.name + '-button').removeClass('side-active');
    });
    $('#' + choicePage + '-button').addClass('side-active');
    let currentPage = $('#current-page-box').val();
    if (choicePage === currentPage) { } //do nothing 
    else {
      $('#' + currentPage).fadeOut(300, function () {
        $('#' + choicePage).fadeIn(200, function () {
          //if the page the user its attempting to enter is the news page, dont update the box
          if (choicePage === 'gist'){}
          else {
            $('#current-page-box').val(choicePage);
          }
        });
      });
    }
    if (choicePage === "gist") {
      $('.side-nav').fadeOut(400);
      $('#mobile-nav').fadeOut(400);
      $('#nav-bar').fadeIn(200);
    }
    else {
      if(type==="mobile"){
        $('#mobile-nav').fadeIn(400);
      }
      else{
        $('.side-nav').fadeIn(400);
      }
    }
  }
  render() {
    
    return (
      <div>
        <div className="thumbnail z-depth-1 app-color mobile-top-margin b-app-color" style={{
          top: 0, position: 'fixed', zIndex: 50, width: '100%', background:'#ffadad',fontSize:'x-large',height:85,borderWidth:0,borderRadius:0}}>
          <button style={{
            borderRadius: 0,
            background: 'black',
            borderBottomRightRadius: 55,
            borderBottomLeftRadius: 55,
            color: '#20e828',
            position: 'fixed',
            marginLeft: 50,
            top: 0,
            zIndex: 200,
            }} 
            onClick={()=>{window.location="/help";}}
            className="see-me btn">
            <i className="fa fa-question-circle"></i>
          </button>
          <button style={{
            borderRadius: 0,
            background: 'white',
            borderBottomRightRadius: 55,
            borderBottomLeftRadius: 55,
            color: 'black',
            position: 'fixed',
            marginLeft: 104,
            top: 0,
            zIndex: 200,
            }} 
            data-toggle="modal"
            data-target="#settings-modal"
            className="see-me btn">
            <i className="fa fa-cog"></i>
          </button>
          <div onClick={() => { this.switchPage('dashboard', "mobile") }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
            <i className="fa fa-dashboard"></i>
          </div>
          <div onClick={() => { this.switchPage('gist', "mobile") }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-newspaper-o"></i>
            </div>
          <div onClick={() => { this.switchPage('pdfs', "mobile") }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-file-pdf-o"></i>
            </div>
          <div onClick={() => { this.switchPage('create-page', "mobile") }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-plus"></i>
            </div>
          <div onClick={() => { this.switchPage('profile', "mobile") }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-user"></i>
            </div>
          <div onClick={() => { this.props.leatherCurtainDown() }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-trophy"></i>
            </div>
          <div onClick={() => { window.location = "/logout"; }} className="z-depth-1 col-1-fix mob-nav-option-item col-xs-1 col-md-2 col-sm-3">
               <i className="fa fa-sign-out"></i>
            </div>
            {/* <center>
              <button className="btn btn-default p-r-fix black-text" onClick = {()=>{this.switchPage('dashboard',"mobile")}}><i className="fa fa-dashboard"></i></button>
              <button className="btn btn-default p-r-fix black-text" onClick = {()=>{this.switchPage('gist',"mobile")}}><i className="fa fa-globe"></i></button>
              <button className="btn btn-default p-r-fix black-text" onClick={() => { this.switchPage('profile',"mobile") }}><i className="fa fa-user"></i></button>
              <button className="btn btn-default p-r-fix black-text" 
              onClick={() => { this.switchPage('create-page',"mobile") }}><i className="fa fa-plus"></i> </button>
              <button className="btn btn-default p-r-fix black-text" 
              onClick={() => { this.switchPage('pdfs',"mobile") }}><i className="fa fa-file-pdf-o"></i></button>
              <button className="btn btn-default p-r-fix btn-sm black-text" 
              onClick={() => { window.location = "/help";}}><i className="fa fa-question-circle"></i> Help</button>
              <button className="btn btn-default p-r-fix btn-sm black-text" 
              onClick={() => { window.location = "/logout";}}><i className="fa fa-sign-out"></i> Logout</button>
            </center> */}
        </div>
      </div>
    );
  }
}

export default MobileNav;
