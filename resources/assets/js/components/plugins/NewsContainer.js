import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Set from "./News-Set";
import { Provider } from 'react-redux';
import { store } from './../../redux-setup/store';
class NewsContainer extends Component{
  //this class contains all the necessary functions that will load the next sets of data for the gist page
  constructor(props) {
    super(props);
    this.createSetDisplay = this.createSetDisplay.bind(this);
    this.state = {
      news: null,
      badgeNumber:0,
      next_page_url:'/me/get-news/'
    }
  }
  componentDidMount() {
    this.firstBatch();
  };
  firstBatch() {
    let thisClass = this;
    $.ajax({ url: '/me/get-news/0', method: 'get' })
      .done(function (data) {
        thisClass.setState({ news: data,badgeNumber: 1 });
        thisClass.createSetDisplay("set-0",data);
        console.log(data);
      });
  }
  fetcher(url) {
    let thisClass = this;
    let setName = "set-" + this.state.badgeNumber;
    $.ajax({ method: 'get', url: url })
      .done(function (response) {
        thisClass.setState({ news: response, badgeNumber: thisClass.state.badgeNumber+1 });
        if (setName > thisClass.state.last_page) { }
        else {
          thisClass.createSetDisplay(setName, response);
        }
      });
  }
  getNextBatch() {
    this.fetcher(this.state.next_page_url+this.state.badgeNumber);
  }
  createSetDisplay(badgeName, props) {
    console.log("I am the props",props);
    if (props.texts.length ===0 && props.pics.length ===0){}
    else{
      let compCont = document.createElement('div');
      compCont.id = badgeName;
      compCont.style.opacity = 0;
      document.getElementById('app-news-container').appendChild(compCont);
      ReactDOM.render( 
        <Provider store = { store }> 
          <Set pieces={props} next={this.getNextBatch.bind(this)} />
        </Provider>, 
    document.getElementById(badgeName));
      $("#" + badgeName).animate({ opacity: 1, transform: "translateX(30px)" }, 600);
    }
  }
  render() {
    return (
      <div id="app-news-container">
      </div>
    );
  }
}


export default NewsContainer;
  /*
    SIDE NOTES: 
    When this component is mounted, a request is sent to fetch the first set of news. 
      Fxn for this == firstBatch() =>fb
      fb calls "createDisplay" =>cd within itself to create a new div and a new component of "set"
      Then passes on the data from the response to sets. 
      Mechanism of cd: 
        create new div, give the div a new name so that a new component of set can be rendered in it, else it wont work
        give the div a distinct id, else it wont work, 
        set the opacity to 0, for fading In later,  
        Just append newly created div to the main component div called "app-news-container" and lastly 
        render the newly created Set component inside the div which was just appended!
  
  */
