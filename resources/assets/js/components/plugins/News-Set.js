import React, { Component } from 'react';
import ImageCard from "./GistImageCard"; 
import TextCard from "./GistPaperCard";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { likeActions} from "./../imports/actions";
class Set extends Component {
  //this class will accept an object that contains two arrays (texts and pics array)
  constructor(props) {
    super(props);
    this.state = { val: null, user: null }
  }
  ejectPics() {
    return this.props.pieces.pics.map(function (item, index) {
      return (
        <li key={index}>
          <ImageCard
            id = {item.id }
            details = { {bcolor:'green', owner:item.user}}
            description = { item.descriptions}
            course = { item.course } 
            image_link = { item.picture_link}
            created_at={item.created_at}
            likes={item.likes.length}
            likesArray = { item.likes}
            comments={Math.round(Math.random(500) * 100)}
            course={item.course}
            coins={Math.round(Math.random(50000) * 1000)}
            school={item.user.school}

          />
        </li>
      );
    });
  }
  componentDidMount  () {
      this.saveAuthUser();
  };
  
  componentDidMount() {
    this.generateId();
  }
  generateId() {
    let num = Math.round(Math.random(1000) * 100000000000);
    let val = "btn-number-" + num.toString();
    console.log(val)
    this.setState({ val: val });
  }
  doNext() {
    document.getElementById(this.state.val).style.display = 'none';
    this.props.next();
  }
  ejectTexts(){
    let thisClass = this;
    return this.props.pieces.texts.map(function (item, index) {
      return (
        <li key={index}>
          <TextCard 
            type = { item.type } 
            details = {{ bcolor:'black',owner:item.user}}
            id = { item.id }
            user = { thisClass.props.authenticatedUser}
            title = { item.title} 
            body = { item.body }
            created_at = { item.created_at}
            likes = {item.likes.length}
            comments={Math.round(Math.random(500) * 100)}
            course = { item.course }
            coins={Math.round(Math.random(50000) * 1000)}
            school = { item.user.school }
            newLikeFunction = {thisClass.props.newLikeAction}
           
          />
        </li>
      );
    });
  }
  render() {
    return (
      <div>
          <button onClick = {()=>{ console.log("state me: ", this.props.original, this.props.newLikeAction)}}>Le click </button>
        <ul style = { styles.ulFix }>
          {this.ejectTexts()}
        </ul>
      
        <ul style = { styles.ulFix }>
          {this.ejectPics()}
        </ul>
        
        <center><button className="btn btn-warning btn-block " id={this.state.val} onClick={() => { this.doNext() }}>More </button></center>
      </div>
    );
  }
}
const styles = { 
  ulFix: { 
    listStyleType: 'none', 
    margin:0, 
    padding:0
  }
}

function mapStateToProps(state){
  return {
    original: state.newsFeed,
    authenticatedUser: state.authUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newLikeAction: likeActions.sendNewLike
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Set);
  /*
    SIDE NOTES: 
      This function is like a template for display! 
      It just receives an object of text-piece-array and pic-piece-array and just displays them, 
      check the proptypes to see other props that will be passed on. 
      WEIRD TRICK 1: 
      When this component is mounted, generate a random value, and store it in the state. 
      That state value is going to represent the id of the "load more" button when it is clicked on to recreate 
      another component of "set". 
      The IDs will help Js to be able o access the button later to be hidden after it has been clicked.
      If the IDs of the buttons are not distinct, it wont work. IF it were not for this piece of code, 
      anytime you clicked the button at the bottom to load more news, the button would not vanish! 

  
  */