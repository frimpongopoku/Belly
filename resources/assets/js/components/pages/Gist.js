import React, { Component } from 'react';
import NewsContainer from "./../plugins/NewsContainer";

import { Provider } from "react-redux";
import {store } from "./../../redux-setup/store";
class Gist extends Component {

 
  
  goPDFNews() {
    //fade out the news/gist page, and get the value stored in the currentpage box and then fade to that page! 
    $('#gist').fadeOut(500);
    $('#nav-bar').fadeOut(500);
    setTimeout(function () {
     // let curr = $('#current-page-box').val();
      $('#gist-button').removeClass('side-active');
      $('#pdfs-button').addClass('side-active');
      $('#pdfs').fadeIn(200);
      $('.side-nav').fadeIn(200);
      $('#current-page-box').val("pdfs");
      //$('#'+curr).css({marginLeft:50});

    }, 600)
  }
  render() {
    return (
      <div className ='page-margin' style = {{marginTop:80}}>
      <button className =" btn btn-primary z-depth-2 zero-border" 
      onClick = {()=>{this.goPDFNews()}}
        style={{background:"crimson",borderTopLeftRadius:50, borderBottomLeftRadius:50,position:"fixed", top:100, right:0}}>
        PDF Gist 
      </button>
        <div className = 'container'> 
          <div className = 'row'>
            <div className='col-md-10 col-lg-10 col-lg-offset-1 col-md-offset-1'> 
              <div className = 'col-md-12 col-lg-12' > 
                <div className = 'col-md-10 col-md-offset-1 '>
                <div style = {{ marginTop:80}}></div>
                  <Provider store = { store }>
                    <NewsContainer />
                  </Provider>
                    {/* <GPCard details ={{name:'Agyingo', bcolor:'green'}} type='text' id ='1'></GPCard>
                    <GCard details ={{name:'Agyingo', bcolor:'green'}} type='pic' id="1"></GCard>
                    <GPCard details ={{name:'Agyingo', bcolor:'green'}} type='text' id ='2'></GPCard> */}
                      
                </div>
              </div> 
            </div>
          </div> 
        </div> 
      </div>
    );
  }
}
export default Gist;
