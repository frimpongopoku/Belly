import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Set from "./News-Set";
import ImageCard from "./GistImageCard"; 
import TextCard from "./GistPaperCard";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gistActions} from "./../imports/actions";

class NewsContainer extends Component{
  //this class contains all the necessary functions that will load the next sets of data for the gist page
  constructor(props){
    super(props);

    this.state = {
      news: null,
      badgeNumber:0,
      next_page_url:'/me/get-news/'
    }
  }
  componentDidMount() {
    this.props.getNews(0,this.props.allNews);
    this.setState({badgeNumber: Number(this.state.badgeNumber+1)})
  };
 
  ejectPictures(){
   let thisClass =this; 
   if(this.props.allNews.active !==false){
     return this.props.allNews.pics.map(function(item,index){
       var num = Math.round(Math.random(1000000) * 100000000000);
       var loopIndex = "news-pic-" + num.toString();
       return (
         <li key={loopIndex}>
           <ImageCard
             id={item.id}
             details={{ bcolor: 'green', owner: item.user }}
             description={item.description}
             user={thisClass.props.authenticatedUser}
             course={item.course}
             image_link={item.picture_link}
             created_at={item.created_at}
             likesArray={item.likes}
             likes={item.likes.length}
             comments={Math.round(Math.random(500) * 100)}
             course={item.course}
             coins={Math.round(Math.random(50000) * 1000)}
             school={item.user.school}
             likeFunction={thisClass.props.picLikeFunction}
             allNews={thisClass.props.allNews}
             school={item.user.school}
           />
         </li>
       );
     })
   }
  }

  ejectTexts() {
    let thisClass= this;
    if(this.props.allNews.active !==false){
      return this.props.allNews.texts.map(function(item,index){
        var num = Math.round(Math.random(1000000) *100000000000);
        var loopIndex = "news-text-"+num.toString();
        return (
          <li key={loopIndex}>
            <TextCard
              type={item.type}
              details={{ bcolor: 'black', owner: item.user }}
              id={item.id}
              user={thisClass.props.authenticatedUser}
              title={item.title}
              body={item.body}
              created_at={item.created_at}
              likesArray = {item.likes}
              likes={item.likes.length}
              comments={Math.round(Math.random(500) * 100)}
              course={item.course}
              coins={Math.round(Math.random(50000) * 1000)}
              school={item.user.school}
              newLikeFunction={thisClass.props.newLikeFunction}
              allNews= { thisClass.props.allNews}
              school = { item.user.school}
            />
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div id="app-news-container">
        <ul style = {styles.ulFix}>
            {this.ejectTexts()}
        </ul>
        <ul style={styles.ulFix}>
          {this.ejectPictures()}
        </ul>
        <br />
        <button className = "btn btn-warning" 
          onClick= {()=>
            { 
              this.props.getNews(this.state.badgeNumber,this.props.allNews);
              this.setState({ badgeNumber: Number(this.state.badgeNumber + 1) })
          }}>
          Next Data 
          <i className ="fa fa-forward" style ={{margin:5}}></i>
        </button>
      </div>
    );
  }
}

const styles = {
  ulFix: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}

function mapStateToProps(state){
  return({
    allNews: state.newsFeed,
    authenticatedUser:state.authUser
  });
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    picLikeFunction:gistActions.picLikeAction,
    newLikeFunction : gistActions.newLikeAction,
    getNews: gistActions.getNews

  },dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
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
