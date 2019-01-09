import './../../app.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideNav from './../navigation/Sidebar';
import Dashboard from './Dashboard';
import $ from 'jquery'; 
import Profile from './Profile';
import Create from './Makenew';
import Gist from './Gist';
import { appActions } from './../imports/actions';
import Blood from './../Blood';
import SnackBar from './../plugins/SnackBar';
import NavBar from './../plugins/NavBar';
import PDF from './Pdfs';
import { paginatorPicValuesAction } from '../../actions/root-action';
import MobileNav from './../navigation/MobileNav';

class Home extends Component {
  constructor(props){
    super(props); 
    this.blood = new Blood();
    this.switchPage = this.switchPage.bind(this);
  }

  componentWillMount(){ 
    //load the authenticated user and his/her makings(pieces)
    this.props.getAuthUser();
    this.props.getUserPieces();
    this.props.getPicPieces();
    this.props.getToken();
    this.props.getNews(0,null);
    this.props.getAllCourses();
    this.props.getRelations();
    this.props.getPdfNews(0);
    this.props.getUserSettings();
    
  }
  snack(notice,ID,color){
      return (<SnackBar color={color} notice = { notice } ID ={ID} />)
  };

  
  switchPage(newPage){
    //switch pages
    //record the latest page
    //add the required css styling to the side current Page
    //add necessary css styling to the button for the page that is being faded in
    let currentPage = $('#current-page-box').val();
    $('#'+currentPage).fadeOut(300,function(){
        $('#'+newPage).fadeIn(300);
    });
    $('#current-page-box').val(newPage);
    $('#'+currentPage+'-button').removeClass('side-active'); 
    $('#'+newPage + '-button').addClass('side-active');
  }
  clickSomething(){ 
    this.blood.changePage("create-page");     
  }
  render() {
    //1039
    return (
      <div>  
        <div id="mobile-nav" className=" mobile-appearance-key tablet-appearance-key pc-vanish-key"> 
          <MobileNav />
        </div>
        <div id='nav-bar' className={$('#home').attr('data-session-page') === "gist" ? '' : 'vanish'}> 
          <NavBar></NavBar>
        </div>
        <div className = ' col-md-12 col-lg-12 mobile-commot-paddings mobile-commot-margins'>
          <div className={$('#home').attr('data-session-page') === "gist" ? 'side-nav vanish mobile-vanish-key tablet-vanish-key' : 'side-nav mobile-vanish-key tablet-vanish-key'} >
            <div className = 'col-md-2 col-lg-2 col-xs-12'>
              <SideNav saveMenuFunction = { this.props.saveMenu } 
                user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser }
                userRelations = {this.props.userRelations}
                settings={this.props.userSettings === null ? { facebook_link: "", whatsapp_number: "", linked_in_link: "" } : this.props.userSettings}
                >
              </SideNav> 
             </div>
          </div>
          <div className= 'col-md-10 col-lg-10 mobile-commot-paddings mobile-commot-margins'>
            <div id="pdfs" className={$('#home').attr('data-session-page') === "pdfs" ? '' : 'vanish'}> 
              <PDF 
                getMorePDFNewsFunction = {this.props.getMorePDFNews}
                pdfNews = { this.props.pdfNews } 
                user={this.props.authenticatedUser === null ? null : this.props.authenticatedUser}
                deletePDFFunction = { this.props.deletePDF}
              ></PDF>
            </div>
            <div id='dashboard' className={$('#home').attr('data-session-page') === "dashboard" ? '' : 'vanish'} > 
               <Dashboard 
                  deletePictureFunction = {this.props.deletePicturePiece} 
                  picPieces = {this.props.userPicPieces === null ? null : this.props.userPicPieces } 
                  user={this.props.authenticatedUser} 
                  editPaperFunction = { this.props.editPaper } 
                  deletePaperFunction = { this.props.deletePaperPiece } 
                  paginatorTextValuesInsert = { this.props.paginatorTextValuesInsert}
                  paginatorPicValuesInsert={this.props.paginatorPicValuesInsert}
                  pieces = { this.props.userPieces === null ? null : this.props.userPieces }>
                </Dashboard> 
            </div> 
            <div id='profile' className={$('#home').attr('data-session-page') ==="profile" ?'':'vanish'} style = { styles.noteReady }> 
              <Profile 
                user = { this.props.authenticatedUser === null ? 
                  {name:"",email:"",school:"",number:"",hall:"", gui:""} : 
                  this.props.authenticatedUser }
                userRelations={this.props.userRelations}
                setProfilePicture = { this.props.setProfilePicture}
                settings = {this.props.userSettings === null? {facebook_link:"",whatsapp_number:"",linked_in_link:"",profile_picture:""} : this.props.userSettings}
                notification = { this.props.notification } 
                saveProfileEditsFunction = { this.props.saveProfileEdits }>
              </Profile>    
            </div>
            <div id='create-page' className={$('#home').attr('data-session-page') === "create-page" ? '' : 'vanish'} style={styles.noteReady}> 
              <Create 
                allPicturePieces={this.props.userPicPieces === null ? null : this.props.userPicPieces} 
                newPicFunction = { this.props.newPic } token = { this.props.token } 
                allPieces = { this.props.userPieces } switchPageFunction = { this.switchPage } 
                user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser } 
                createPaperFunction = { this.props.createNewPaper }
                allCourses = { this.props.allCourses}
                >
              </Create>
            </div>
           </div>
          </div>
        <div id='gist' className={$('#home').attr('data-session-page') === "gist" ? '' : 'vanish'} style={ styles.noteReady}> 
          <Gist allNews = { this.props.news ===null ? null : this.props.news }></Gist>
        </div>
       
      </div>
    );
   }
}
const styles = { 
    notReady:{
        'display':'none'
    }, 
    modalSocial:{ 
        fontSize:'1.5rem',
        color:'blue'
    }
};
function mapStateToProps(state){
  return { 
    userPieces: state.textPieces ,
    userPicPieces: state.picturePieces,
    authenticatedUser: state.authUser, 
    store:state,
    notification:state.notification,
    news: state.newsFeed,
    token:state.token, 
    allCourses: state.allCourses,
    userRelations: state.authUserRelations,
    pdfNews:state.pdfNews,
    userSettings: state.userSettings
  }; 
};
function matchDispatchToProps(dispatch){
  return bindActionCreators({ 
    getAuthUser: appActions.fetchUserAction, 
    loadUserPieces: appActions.loadUserPiecesAction, 
    createNewPaper: appActions.createNewPaperAction, 
    saveMenu: appActions.saveMenuToRemoteAction, 
    deletePicturePiece:appActions.deletePicturePieceAction,
    deletePaperPiece: appActions.deletePaperPieceAction, 
    getPicPieces:appActions.getPicPiecesAction,
    getUserPieces : appActions.getUserPiecesAction,
    editPaper: appActions.editPaperAction,
    test: appActions.test, 
    getToken:appActions.getTokenAction, 
    newPic: appActions.newPicPieceAction, 
    saveProfileEdits: appActions.saveProfileEditsAction,
    getNews: appActions.getNewsAction,
    getAllCourses: appActions.getAllCoursesAction, 
    paginatorTextValuesInsert: appActions.paginatorTextValuesAction,
    paginatorPicValuesInsert: appActions.paginatorPicValuesAction,
    getRelations : appActions.getRelationsAction,
    getPdfNews:appActions.getPdfNewsAction,
    getMorePDFNews:appActions.getMorePDFNewsAction,
    deletePDF: appActions.deletePDFAction,
    getUserSettings:appActions.getUserSettingsAction,
    setProfilePicture:appActions.setProfilePictureAction
  },dispatch)
};

export default connect (mapStateToProps, matchDispatchToProps)(Home);
