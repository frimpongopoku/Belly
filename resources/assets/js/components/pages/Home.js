import './../../app.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideNav from './../navigation/Sidebar';
import Dashboard from './Dashboard';
import $ from 'jquery'; 
import Profile from './Profile';
import Create from './Create';
import Gist from './Gist';
import { test,editPaperAction, getUserPiecesAction, fetchUserAction, loadUserPiecesAction, createNewPaperAction, saveMenuToRemoteAction, deletePaperPieceAction } from './../../actions/root-action';
import Blood from './../Blood';
import TextModal from './../Plugins/TextModal';
import SnackBar from './../Plugins/SnackBar';

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

    }
    componentDidMount(){
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
        return (
            <div>
                
                <div className = 'side-nav'>
                    <SideNav saveMenuFunction = { this.props.saveMenu } user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser }></SideNav> 
                </div>
                <div id='dashboard'> 
                 <Create allPieces = { this.props.userPieces } switchPageFunction = { this.switchPage } user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser } createPaperFunction = { this.props.createNewPaper }></Create>
              
                           {/* <Dashboard editPaperFunction = { this.props.editPaper } deletePaperFunction = { this.props.deletePaperPiece } pieces = { this.props.userPieces === null ? null : this.props.userPieces }></Dashboard> */}
                </div> 
                <div id= 'profile' className='vanish' style = { styles.noteReady }> 
                    <Profile></Profile> 
                </div>
                <div id='create-page' className='vanish' style={styles.noteReady}> 
                    <Create allPieces = { this.props.userPieces } switchPageFunction = { this.switchPage } user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser } createPaperFunction = { this.props.createNewPaper }></Create>
                </div>
                <div id='gist' className='vanish' style={ styles.noteReady}> 
                    <Gist></Gist>
                </div>
                <center> 
                    <button onClick = {()=>{
                        
                    }}>Click me</button>
                      <button className= 'ano' onClick = {()=>{
                        console.log("Dude you just clicked me, DAAAMIN! Chain reaction");
                    }}>Another Click me</button>
                </center>
                <center><h1 > <i className = 'fa fa-spinner fa-pulse'></i></h1></center>
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
        userPieces: state.userPieces ,
        authenticatedUser: state.authUser , 
        store:state,
        notification:state.notification
    };
};
function matchDispatchToProps(dispatch){
    return bindActionCreators({ 
        getAuthUser: fetchUserAction, 
        loadUserPieces: loadUserPiecesAction, 
        createNewPaper: createNewPaperAction, 
        saveMenu: saveMenuToRemoteAction, 
        deletePaperPiece: deletePaperPieceAction, 
        getUserPieces : getUserPiecesAction,
        editPaper: editPaperAction,
        test: test
    },dispatch)
};

export default connect (mapStateToProps, matchDispatchToProps)(Home);
