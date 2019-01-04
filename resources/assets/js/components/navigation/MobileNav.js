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
        <div  className="thumbnail z-depth-1 app-color mobile-top-margin b-app-color" style={{padding:"15px 5px",borderRadius:0}}>
          <center>
            <button className="btn btn-default p-r-fix black-text" onClick = {()=>{this.switchPage('dashboard',"mobile")}}><i className="fa fa-dashboard"></i></button>
            <button className="btn btn-default p-r-fix black-text" onClick = {()=>{this.switchPage('gist',"mobile")}}><i className="fa fa-globe"></i></button>
            <button className="btn btn-default p-r-fix black-text" onClick={() => { this.switchPage('profile',"mobile") }}><i className="fa fa-user"></i></button>
            <button className="btn btn-default p-r-fix black-text" onClick={() => { this.switchPage('create-page',"mobile") }}><i className="fa fa-plus"></i> </button>
            <button className="btn btn-default p-r-fix black-text" onClick={() => { this.switchPage('pdfs',"mobile") }}><i className="fa fa-file-pdf-o"></i></button>
            <button className="btn btn-default p-r-fix btn-sm " onClick={() => { window.location = "/logout";}}><i className="fa fa-sign-out"></i> Logout</button>
          </center>
        </div>
      </div>
    );
  }
}

export default MobileNav;
