import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Set from "./News-Set";
import ImageCard from "./GistImageCard"; 
import TextCard from "./GistPaperCard";
import UniCommentBoard from "./../plugins/UniversalComment";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gistActions} from "./../imports/actions";

class NewsContainer extends Component{
  //this class contains all the necessary functions that will load the next sets of data for the gist page
  constructor(props){
    super(props);
    this.createCommentComponents = this.createCommentComponents.bind(this);
    this.saveComment =this.saveComment.bind(this); 
    this.cleanUp = this.cleanUp.bind(this);
    this.createIndCommentDisplays = this.createIndCommentDisplays.bind(this);
    this.create= this.create.bind(this);
    this.createTitle = this.createTitle.bind(this);
    this.clearTitle = this.clearTitle.bind(this);
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
             comments={item.comments.length}
             showComments={thisClass.create}
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
              commentsArray = {item.comments}
              commentsCount={ item.comments.length }
              showComments = { thisClass.create}
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

  saveComment(piece_id,type,pieceTitle){
    //laravel save, and then recall createComment components
    let thisClass= this;
    let body = $('#comment-textbox').val(); 
    let pieceID = piece_id;
    let dataTrain = {body:body, type: type, pieceID: pieceID};
    if($.trim(body) !==""){
      $.ajax({method:'get',url:'/me/save-comment/',data:dataTrain})
      .done(function(response){
        if(response ==="TRUE"){
          thisClass.create(piece_id,type,pieceTitle);
          $('#comment-textbox').val("");
        }
        else{
          alert('save impossible!');
        }
      });
    }
    else{
      alert("Type something before you comment!")
    }
  }


  clearTitle(){
    document.getElementById('js-piece-title') !== null ? document.getElementById('js-piece-title').remove() : '';
  }
  cleanUp(){  
    document.getElementById('js-comment-container') !==null ?document.getElementById('js-comment-container').remove():''; 
    document.getElementById('js-comment-button') !==null ?document.getElementById('js-comment-button').remove():'';
   
  }

  createIndCommentDisplays(user,body,parent){
    let commentItem = document.createElement('div');
    commentItem.className = "js-comment-item";
    let commentItemText = document.createElement('small');
    commentItemText.className = "comment-item-text rounded";
    commentItem.style.marginBottom = "10px";
    let commentTitle = document.createElement('small');
    commentTitle.className = "comment-item-title black-text";
    let bold = document.createElement('b');
    bold.textContent = user;
    commentTitle.appendChild(bold);
    let bodyText = document.createElement('p');
    bodyText.textContent = body;
    commentItemText.appendChild(commentTitle);
    commentItemText.appendChild(bodyText);
    commentItem.appendChild(commentItemText);
    parent.appendChild(commentItem);
  }
  createTitle(piece_title){
    let pieceTitle = document.createElement('h3');
    pieceTitle.className = " modal-title";
    pieceTitle.id = "js-piece-title";
    pieceTitle.textContent = piece_title;
    document.getElementById('js-piece-title-comment-box').appendChild(pieceTitle);
  }
  createCommentComponents(commentsArray,piece_title,pieceID,type){
    let thisClass= this;
    //if (this.props.currentPieceComments !==null){
    let commentContainer = document.createElement('div');
    commentContainer.id = "js-comment-container";
    commentsArray.forEach(function(comment){
      thisClass.createIndCommentDisplays(comment.user.name, comment.body, commentContainer);
    });
    let footerButtonDiv = document.createElement('div');
    footerButtonDiv.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2";
    footerButtonDiv.id = "js-comment-button";
    let commentButton = document.createElement('button');

    commentButton.className = "user-badge-comment btn btn-default rounded pull-right";
    commentButton.style.padding = 7;
    commentButton.style.fontSize = "1.2rem";
    commentButton.addEventListener('click',function(){ 
      thisClass.saveComment(pieceID,type,piece_title);
    });
    commentButton.textContent = "@"+this.props.authenticatedUser.name;
    footerButtonDiv.appendChild(commentButton);
    console.log("I am the  CommentContainer:::: ", commentContainer);
    console.log("I am the footerdiv::: ", footerButtonDiv);
    document.getElementById('js-comment-modal-body').appendChild(commentContainer);
    document.getElementById('js-comment-board-footer').appendChild(footerButtonDiv);
    //}
  
  }

  create(pieceID,type,pieceTitle){
    let thisClass = this;
    $('#js-comment-spinner').fadeIn(50);
    this.cleanUp(); 
    this.clearTitle();
    $.ajax({method:'get',url:'/me/get-comments/'+pieceID+'/'+type})
    .done(function(response){
      setTimeout(() => {
        $('#js-comment-spinner').fadeOut();
        thisClass.createTitle(pieceTitle);
        thisClass.createCommentComponents(response,pieceTitle,pieceID,type);
      },2000);
     
    });
  }
  render() {
    return (
      <div id="app-news-container">
        <button className="btn btn-warning" data-target="#universal-comment-board" data-toggle="modal"
          onClick={() => {
            this.props.getNews(this.state.badgeNumber,this.props.allNews);
            this.setState({ badgeNumber: Number(this.state.badgeNumber + 1) })
          }}>
          Next Data
          <i className="fa fa-forward" style={{ margin: 5 }}></i>
        </button>
        <ul style = {styles.ulFix}>
          {this.ejectTexts()}
        </ul>
        <ul style={styles.ulFix}>
          {this.ejectPictures()}
        </ul>
        <p>{JSON.stringify(this.props.currentPieceComments)}</p>
        <br />
        <UniCommentBoard comments={this.props.currentPieceComments}></UniCommentBoard>
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
    authenticatedUser:state.authUser, 
    currentPieceComments:state.currentPieceComments,
  });
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    picLikeFunction:gistActions.picLikeAction,
    newLikeFunction : gistActions.newLikeAction,
    getNews: gistActions.getNewsAction, 
    getCommentsForPiece:gistActions.getCommentsForPieceAction, 
   
 
   

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
