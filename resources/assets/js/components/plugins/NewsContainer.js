import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Set from "./News-Set";
import ImageCard from "./GistImageCard"; 
import TextCard from "./GistPaperCard";
import UniCommentBoard from "./UniversalComment";
import UniversalDelete from "./UniversalDelete";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gistActions} from "./../imports/actions";
import * as moment from 'moment';



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
    this.insertDelDetails = this.insertDelDetails.bind(this);
    this.state = {
      news: null,
      badgeNumber:0,
      next_page_url:'/me/get-news/',
      currentPieceCommentsViewed:null,
      stillMoreTexts:null,
      current_date:new Date().toISOString(),
      deleteDetails:{
        title:null, 
        itemID:null,
        type:null,
      }
    }
  }
  checkForMore(type){
    
    if(type ==="texts"){
      if(this.props.textNews !==null){
        if(this.props.textNews.next_page_url === null){
          this.setState({stillMoreTexts:false})
          console.log("i have the state to false")
        }
        else{
          this.setState({stillMoreTexts:true})
          console.log("I have set the state to true")
        }
      }
    }
  }
  showLoadTextButton(){
    if(this.state.stillMoreTexts === true){
      return (
         <button className = "btn btn-default btn-block" style={{marginTop:10}}
            onClick ={()=>{this.loadMoreTexts()}}>
            Load More 
          </button>
      );
    }
  }
  insertDelDetails(title,itemID,type){
    this.setState({deleteDetails:{title:title,itemID:itemID,type:type}});
  }
  
  componentWillMount(){
    this.props.getPicNews(); 
    this.props.getTextNews(); 
    this.checkForMore('texts');

  }
  componentDidMount() {
    this.props.getNews(0,this.props.allNews);
    this.setState({badgeNumber: Number(this.state.badgeNumber+1)}); 
    this.spinnerTrick();
    
     
    //this.reloadAllImages();
  };
 
  ejectTexts(){
    let thisClass = this; 
    if(this.props.textNews !== null){
      if(this.props.textNews.data !==null){
        return this.props.textNews.data.map(function(item,index){
          var num = Math.round(Math.random(1000000) * 100000000000);
          var loopIndex = "news-ind-pic-" + num.toString();
          return(
            <li key={loopIndex}>
              <TextCard
                type={item.type}
                details={{ bcolor: 'black', owner: item.user }}
                id={item.id}
                user={thisClass.props.authenticatedUser}
                title={item.title}
                body={item.body}
                created_at={item.created_at}
                likesArray={item.likes}
                likes={item.likes.length}
                // commentsArray={item.comments}
                paper_term = { item.paper_term}
                commentsCount={item.comments_count}
                showComments={thisClass.create}
                course={item.course}
                subcourse={item.subcourse !==null? item.subcourse.name:''}
                coins={Math.round(Math.random(50000) * 1000)}
                school={item.user.school}
                newLikeFunction={thisClass.props.newLikeFunction}
                allNews={thisClass.props.allNews}
                school={item.user.school}
                insertDetailsFunction={thisClass.insertDelDetails}
                textNewsData = {thisClass.props.textNews}
              />
            </li>
          );
        })
      }
    }
  }
  ejectPictures(){
    let thisClass = this; 
    if(this.props.picNews !==null ){
      if(this.props.picNews.data !==null){
        return this.props.picNews.data.map(function(item,index){
          var num = Math.round(Math.random(1000000) * 100000000000);
          var loopIndex = "news-ind-pic-" + num.toString();
          return(
            <li key={loopIndex}>
              <ImageCard
                id={item.id}
                details={{ bcolor: 'green', owner: item.user }}
                description={item.description}
                user={thisClass.props.authenticatedUser}
                course={item.course}
                subcourse={item.subcourse.name}
                image_link={item.reduced_path}
                created_at={item.created_at}
                likesArray={item.likes}
                likes={item.likes.length}
                comments={item.comments_count}
                showComments={thisClass.create}
                coins={Math.round(Math.random(50000) * 1000)}
                school={item.user.school}
                likeFunction={thisClass.props.picLikeFunction}
                allNews={thisClass.props.allNews}
                school={item.user.school}
                picNewsData={thisClass.props.picNews}
                image_type={item.type}
                paper_term = {item.paper_term}
              />
            </li>
          );
        });
      }
    }
  }
  ejectNews(){
    let thisClass = this;
    if(this.props.allNews !== null){
      return this.props.allNews.news.map(function (item, index) {
        var num = Math.round(Math.random(1000000) * 100000000000);
        var loopIndex = "news-text-" + num.toString();
        if(item.file_type ==="text"){
         return (<li key={loopIndex}>
          <TextCard
              type={item.type}
              details={{ bcolor: 'black', owner: item.user }}
              id={item.id}
              user={thisClass.props.authenticatedUser}
              title={item.title}
              body={item.body}
              created_at={item.created_at}
              likesArray={item.likes}
              likes={item.likes.length}
             // commentsArray={item.comments}
               paper_term = {item.paper_term}
              commentsCount={item.comments_count}
              showComments={thisClass.create}
              course={item.course}
             subcourse={item.subcourse !== null ? item.subcourse.name : ''}
              coins={Math.round(Math.random(50000) * 1000)}
              school={item.user.school}
              newLikeFunction={thisClass.props.newLikeFunction}
              allNews={thisClass.props.allNews}
              school={item.user.school}
              insertDetailsFunction={thisClass.insertDelDetails}
              textNewsData={thisClass.props.textNews}
            />
          </li>)
        }
        else if( item.file_type ==="image"){
         return (<li key={loopIndex}>
            <ImageCard
              id={item.id}
              details={{ bcolor: 'green', owner: item.user }}
              description={item.description}
              user={thisClass.props.authenticatedUser}
              course={item.course}
              subcourse = {item.subcourse.name}
              image_link={item.reduced_path}
              created_at={item.created_at}
              likesArray={item.likes}
              likes={item.likes.length}
              comments={item.comments_count}
              showComments={thisClass.create}
              coins={Math.round(Math.random(50000) * 1000)}
              school={item.user.school}
              likeFunction={thisClass.props.picLikeFunction}
              allNews={thisClass.props.allNews}
              school={item.user.school}
              picNewsData = { thisClass.props.picNews}
              image_type = {item.type}
              paper_term = { item.paper_term}
            />
          </li>)
        }
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
          $('#comment-textbox').val("");
          thisClass.props.getRelations();
          
          thisClass.setState({currentPieceCommentsViewed:null}) //unset the currently viewed piece value so that the comments can reload
          thisClass.create(piece_id,type,pieceTitle);
          
        }
        else{
          alert('Could not save!');
        }
      });
    }
    else{
      alert("Please type something before you comment!")
    }
  }

  clearTitle(){
    document.getElementById('js-piece-title') !== null ? document.getElementById('js-piece-title').remove() : '';
  }
  cleanUp(){  
    document.getElementById('js-comment-container') !==null ? document.getElementById('js-comment-container').remove():''; 
    document.getElementById('js-comment-button') !==null ?document.getElementById('js-comment-button').remove():'';
  }

  backEndDelComment(id){
    $.ajax({method:'get',url:'/delete-comment/'+id})
    .done(function(){});
  }
  removeCommentItem(id){
    $("#"+id).fadeOut();
  }
  createIndCommentDisplays(user,body,parent,userID,commentID,created_at){
    var thisClass = this;
    var hook = Math.round(Math.random() * 1000 ).toString()+'-hook';
    var createdAt = document.createElement('small');
    let commentItem = document.createElement('div');
    createdAt.className = " text text-primary number-font"; 
    createdAt.style.margin = "0 7px";
    createdAt.textContent = moment.duration(moment(this.state.current_date).diff(moment(created_at))).humanize() + " ago" ;
    commentItem.className = "js-comment-item";
    let commentItemText = document.createElement('small');
    commentItemText.className = "comment-item-text rounded cursor clearfix";
    commentItemText.id = hook;
    commentItem.style.marginBottom = "10px";
    let commentTitle = document.createElement('small');
    commentTitle.className = "comment-item-title black-text cursor";
    let bold = document.createElement('b');
    if(userID === this.props.authenticatedUser.id){
      var delSm = document.createElement('small');
      var delA = document.createElement('a'); 
      delA.textContent ="delete";
      delA.style.cursor = "pointer";
      delA.addEventListener('click',function(){
        thisClass.backEndDelComment(commentID);
        thisClass.removeCommentItem(hook);
      });
      delA.style.color = "crimson"; 
      delSm.style.paddingLeft = "7px";
    
      delSm.appendChild(delA);
    }
    bold.textContent = user;
    commentTitle.appendChild(bold);
    let bodyText = document.createElement('p');
    bodyText.textContent = body;
    commentItemText.appendChild(commentTitle);
    if (userID === this.props.authenticatedUser.id){
      commentItemText.appendChild(delSm);
    }
    commentItemText.appendChild(createdAt);
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
    let commentContainer = document.createElement('div');
    commentContainer.id = "js-comment-container";
    commentsArray.forEach(function(comment){
      thisClass.createIndCommentDisplays(comment.user.name, comment.body, commentContainer,comment.user.id,comment.id,comment.created_at);
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
    document.getElementById('js-comment-modal-body').appendChild(commentContainer);
    document.getElementById('js-comment-board-footer').appendChild(footerButtonDiv);
  
  }
  
  create(pieceID,type,pieceTitle){
    let thisClass = this;
    if(pieceID !== this.state.currentPieceCommentsViewed ){
      $('#js-comment-spinner').fadeIn(50);
      this.cleanUp(); 
      this.clearTitle();
      $.ajax({method:'get',url:'/me/get-comments/'+pieceID+'/'+type})
      .done(function(response){
        $('#js-comment-spinner').fadeOut();
        setTimeout(() => {
          thisClass.createTitle(pieceTitle);
          thisClass.createCommentComponents(response,pieceTitle,pieceID,type);
        },1000);
      });
      this.setState({currentPieceCommentsViewed:pieceID});
    }
  }

  spinnerTrick(){
    let thisClass = this;
   setInterval(function(){
     let old = $("#load-spinner").attr('data-old-news');
     if( old !== thisClass.state.news){
       $("#load-spinner").fadeOut();
     }
   },200);
  }
  loadIndicator(){
    $("#load-spinner").fadeIn(); 
    $("load-spinner").attr('data-old-news',this.state.news);
  }

  loadMoreTexts(){
    if(this.props.textNews.next_page_url !==null){  
      this.props.moreTexts(this.props.textNews.next_page_url, this.props.textNews.data);
    }
    else{
      $('.g-text-load-more-btn').fadeOut(); 
    }
  }
  loadMorePics(){
    if(this.props.picNews.next_page_url !==null){  
      this.props.morePics(this.props.picNews.next_page_url, this.props.picNews.data);
    }
    else{
      $('.g-pic-load-more-btn').fadeOut(); 
    }
  }

  noNewsCard(){
    if(this.props.allNews ===null){
      return(
        <div className="thumbnail" style={{ cursor:'pointer',padding: 15, background:'#00bcd4',color:'white',fontSize:'large'}}> 
          <center>
            <p><i className="fa fa-bullhorn" style={{margin:10}}></i> Be the first to create gists for your course</p>
          </center>
        </div>
      );
    }
  }
  noNews(){
    if(this.props.allNews !==null){
      return (
        <button style={{marginTop:10}} className="btn btn-default btn-block"
          onClick={() => {
            this.props.getNews(this.state.badgeNumber, this.props.allNews);
            this.setState({ badgeNumber: Number(this.state.badgeNumber + 1) });
            this.loadIndicator();
          }}>
          Load More
            <span className="fa fa-spinner fa-spin" style={{ marginLeft: 5, marginBottom: 10 }} id="load-spinner"></span>
        </button>
      );
    }
  }

  noTextCard(){
    if (this.props.allNews === null) {
      return (
        <div className="thumbnail" style={{ cursor: 'pointer', padding: 15, background: 'rgb(78, 58, 28)', color: 'white', fontSize: 'large' }}>
          <center>
            <p><i className="fa fa-bullhorn" style={{ margin: 10 }}></i> Be the first to create gists for your course</p>
          </center>
        </div>
      );
    }
  }
  noPictureCard(){
    if (this.props.allNews === null) {
      return (
        <div className="thumbnail" style={{ cursor: 'pointer', padding: 15, background: 'orange', color: 'white', fontSize: 'large' }}>
          <center>
            <p><i className="fa fa-bullhorn" style={{ margin: 10 }}></i> Be the first to create gists for your course</p>
          </center>
        </div>
      );
    }
  }
 

  render() {
    return (
      <div id="app-news-container">
        <div id="pic-type-container" className ="vanish"> 
          <ul style ={styles.ulFix}>
            {this.noPictureCard()}
            {this.ejectPictures()} 
          </ul>
          <button className="btn btn-default btn-block g-pic-load-more-btn" style={{ marginTop: 10 }}
            onClick={() => { this.loadMorePics(); }}>
            Load More
          </button>
        </div> 
        <div id ="text-type-container" className = "vanish" style={{position:'relative'}}> 
          <ul style ={styles.ulFix}> 
          {this.noTextCard()}
            {this.ejectTexts()}
          </ul>
          <button className = "btn btn-default btn-block g-text-load-more-btn" style={{marginTop:10}}
            onClick ={()=>{this.loadMoreTexts();}}>
            Load More 
          </button>
        </div>
        <div id="all-types-container">
          <ul style = {styles.ulFix}>
          {this.noNewsCard()}
            {this.ejectNews()}
            {this.noNews()}
          </ul>
          <br />
        </div>
        <UniCommentBoard comments={this.props.currentPieceComments}></UniCommentBoard>
        <UniversalDelete paperType={this.state.deleteDetails.type} title={this.state.deleteDetails.title} paperID ={this.state.deleteDetails.itemID}/>
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
    textNews: state.textNews, 
    picNews:state.picNews,
  });
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    picLikeFunction:gistActions.picLikeAction,
    newLikeFunction : gistActions.newLikeAction,
    getNews: gistActions.getNewsAction, 
    getPicNews: gistActions.getLatestPicNewsAction,
    getTextNews: gistActions.getLatestTextNewsAction,
    getCommentsForPiece:gistActions.getCommentsForPieceAction, 
    getRelations:gistActions.getRelationsAction,
    moreTexts: gistActions.getMoreTextNewsAction, 
    morePics: gistActions.getMorePicNewsAction
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
