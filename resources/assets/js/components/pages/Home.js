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
import LeatherBoard from './../plugins/LeatherBoard';
import SettingsModal from './../plugins/SettingsModal';


class Home extends Component {
  constructor(props){
    super(props); 
    this.blood = new Blood();
    this.switchPage = this.switchPage.bind(this);
    this.curtainDown = this.curtainDown.bind(this);
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
    this.props.getUserPdfs();
    
    var thisClass=  this;
    setInterval(function(){
      thisClass.testConnection();
    },10000)
    $(document).ready(function(){
        thisClass.releaseProgress();
    });
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
  
  curtainUp(){
    $('.writing').fadeOut();
    $('#test-animations').fadeOut();
    $('.curtain').css(
      {
        height:'0px',
        transition:'.6s ease-in-out all'
      }
    );
    
  }
  curtainDown(){
    $('.curtain').css(
      {
        height:$(window).height()+'px',
        transition:'.6s ease-in-out all'
      }
    );
    $('.writing').fadeIn(1900);
    $('#test-animations').fadeIn(700);
    setTimeout(() => {
     window.location = "/home";
    }, 2000);
  }
  leatherCurtainDown() {
    $('.l-writing').fadeIn(700);
    $('.leather-board').css(
      {
        transform: 'translateY(0px)',
        transition: '1s ease-in-out all'
      }
    );
  }
  leatherCurtainUp() {
    let height = $(window).height()+100;
    $('.l-writing').fadeOut();
    $('.leather-board').css(
      {
        transform: 'translateY(-'+height+'px)',
        transition: '.6s ease-in-out all'
      }
    );
  }
  testConnection(){
    let timer = setTimeout(() => {
      $('.connectivity-button').addClass('blink-offline');
      $('.connectivity-span').text('offline');
    }, 3000);
    $.ajax({method:'get',url:'connection-test'})
    .done(function(response){
      if(response ==="TRUE"){
        $('.connectivity-button').removeClass('blink-offline');
        $('.connectivity-span').text('online');
        clearTimeout(timer);
      }
    });
  }

  releaseProgress(){
    //collects and fills the texarea with the user's data before refresh
    //if it wasnt saved in the database
    var progress = $('#progress-div').attr('data-prog');
    if(progress !=='False' && progress !==''){
      document.getElementById('make-new-textarea').value = progress;
    }
  }
  render() {
    //1039
    return (
      <div>
          {/* ==================LEATHERBOARD CURTAIN =============== */}
            <LeatherBoard
              user={this.props.authenticatedUser}
              leatherCurtainUp = {this.leatherCurtainUp}>
            </LeatherBoard>
          {/* -------------------------------------------------------- */}
            {/* ====================REFRESH CURTAIN====================== */}
  
       <div className=" curtain curtain-style">
            <center> 
            <h1 className="mob-refresh-margin writing" 
              style={{
                display:'none',
                color:'white',
                marginTop:'23%'}}>
                <i className="fa fa-refresh fa-spin" 
                  style={{
                  marginRight:10,
                  color:'greenyellow'}}>
                </i>
                 We are are rearranging things...</h1>
              </center>
          </div>  
        <center>
          <button style={{
            borderRadius:0,
            background:'#FFC107',
            borderBottomRightRadius: 55,
            borderBottomLeftRadius: 55,
            color:'black',
            position:'fixed',
            top:0,
            zIndex:200,
          }} className="see-me curtain-dragger raise btn btn-undefault" 
            onClick={() => { this.curtainDown() }}>
            <i className="fa fa-refresh"></i>
          </button>
          <button style={{
            borderRadius:0,
            background:'black',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            color:'#20e828',
            marginLeft:10,
            position:'fixed',
            marginLeft:50,
            top:0,
            zIndex:200,
          }} className="mobile-vanish-key see-me connectivity-button raise btn btn-undefault" 
            onClick={() => { alert("Your connection is active!") }}>
            <i className=" fa fa-circle" style={{fontSize:'x-small',marginRight:4}}></i> 
            <span className='angel connectivity-span'>online</span>
          </button>
        </center>
        
          {/* --------------------------------------------------------------- */}
            {/* ==================MOBILE NAV AREA ================ */}
        <div id="mobile-nav" className=" mobile-appearance-key tablet-appearance-key pc-vanish-key"> 
          <MobileNav 
          
            leatherCurtainDown = {this.leatherCurtainDown}/>
          <div className="mobile-appearance-key tablet-appearance-key pc-vanish-key free-space" style={{marginBottom:70}}></div>
        </div>
          {/* ------------------------------------------------------- */}
          {/* =======================NAVBAR AREA ====================== */}
        <div id='nav-bar' className={$('#home').attr('data-session-page') === "gist" ? '' : 'vanish'}> 
          <NavBar></NavBar>
        </div>
          {/* -------------------------------------------------------------- */}
          {/* ===============================PAGES AREA========================== */}
        <div className = ' col-md-12 col-lg-12 mobile-commot-paddings mobile-commot-margins'>
          <div id="side-nav-super-key" className={this.props.linkToPage === "gist" ? 'side-nav vanish mobile-vanish-key tablet-vanish-key' : 'side-nav mobile-vanish-key tablet-vanish-key'} >
            {/* =========================SIDEBAR AREA==================== */}
            <div className = 'col-md-2 col-lg-2 col-xs-12'> 
              <SideNav saveMenuFunction = { this.props.saveMenu } 
                user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser }
                userRelations = {this.props.userRelations}
                settings={this.props.userSettings === null ? { facebook_link: "", whatsapp_number: "", linked_in_link: "" } : this.props.userSettings}
                curtainDown = {this.leatherCurtainDown}
                >
              </SideNav> 
             </div>
              {/* -------------------------------------------------------- */}
          </div>
          <div className= 'col-md-10 col-lg-10 mobile-commot-paddings mobile-commot-margins'>
            {/* ========================PDF GIST AREA======================== */}
            <div id="pdfs" className={this.props.linkToPage !== "pdfs" ? 'vanish' : ''}> 
              <PDF 
                getMorePDFNewsFunction = {this.props.getMorePDFNews}
                pdfNews = { this.props.pdfNews } 
                user={this.props.authenticatedUser === null ? null : this.props.authenticatedUser}
                deletePDFFunction = { this.props.deletePDF}
              ></PDF>
            </div>
              {/* -------------------------------------------------------------- */}
              {/* =====================DASHBOARD PAGE AREA===================== */}
            <div id='dashboard' className={this.props.linkToPage !== "dashboard" ? 'vanish' : ''} > 
               <Dashboard 
                  myPdfs = { this.props.myPdfs}
                  deletePictureFunction = {this.props.deletePicturePiece} 
                  picPieces = {this.props.userPicPieces === null ? null : this.props.userPicPieces } 
                  user={this.props.authenticatedUser} 
                  deletePDF = {this.props.deletePDF}
                  editPaperFunction = { this.props.editPaper } 
                  deletePaperFunction = { this.props.deletePaperPiece } 
                  paginatorTextValuesInsert = { this.props.paginatorTextValuesInsert}
                  paginatorPicValuesInsert={this.props.paginatorPicValuesInsert}
                  paginatorPdfValuesInsert={this.props.paginatorPdfValuesInsert}
                  pieces = { this.props.userPieces === null ? null : this.props.userPieces }>
                </Dashboard> 
            </div> 
              {/* -------------------------------------------------------------------- */}
              {/* ========================PROFILE PAGE AREA ======================== */}
            <div id='profile' className={this.props.linkToPage !=="profile-page" ?'vanish':''} style = { styles.noteReady }> 
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
                  {/* -------------------------------------------------------------- */}
                  {/* ============================CREATE PAGE AREA ==================== */}
            <div id='create-page' className={this.props.linToPage !== "create-page" ? 'vanish' : ''} style={styles.noteReady}> 
                <Create 
                  allPicturePieces={this.props.userPicPieces === null ? null : this.props.userPicPieces} 
                  newPicFunction = { this.props.newPic } token = { this.props.token } 
                  allPieces = { this.props.userPieces } switchPageFunction = { this.switchPage } 
                  user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser } 
                  createPaperFunction = { this.props.createNewPaper }
                  allCourses = { this.props.allCourses}
                  curtainDown = { this.curtainDown}
                  >
                </Create>
            </div>
                  {/* ----------------------------------------------------------- */}
           </div>
          </div>
                  {/* ==================================GIST PAGE AREA============== */}
        <div id='gist' className={$('#home').attr('data-session-page') === "gist" ? '' : 'vanish'} style={ styles.noteReady}> 
          <Gist allNews = { this.props.news ===null ? null : this.props.news }></Gist>
        </div>
                  {/* ------------------------------------------------------------------- */}
        <SettingsModal
          settings={this.props.userSettings === null ? null : this.props.userSettings}
          user={this.props.authenticatedUser === null ? null : this.props.authenticatedUser} 

        ></SettingsModal>
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
    userSettings: state.userSettings,
    myPdfs: state.userPdfs
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
    paginatorPdfValuesInsert: appActions.paginatorPdfValuesAction,
    getRelations : appActions.getRelationsAction,
    getPdfNews:appActions.getPdfNewsAction,
    getMorePDFNews:appActions.getMorePDFNewsAction,
    deletePDF: appActions.deletePDFAction,
    getUserSettings:appActions.getUserSettingsAction,
    setProfilePicture:appActions.setProfilePictureAction,
    getUserPdfs: appActions.getUserPdfAction,
 
    

  },dispatch)
};

export default connect (mapStateToProps, matchDispatchToProps)(Home);
