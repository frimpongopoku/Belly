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
import { fetchUserAction, loadUserPiecesAction, createNewPaperAction, saveMenuToRemoteAction, deletePaperPieceAction } from './../../actions/root-action';
import Blood from './../Blood';
import TextModal from './../Plugins/TextModal';

class Home extends Component {
    constructor(props){
        super(props); 
        this.blood = new Blood();
        this.switchPage = this.switchPage.bind(this);

    }

    componentWillMount(){ 
        this.props.getAuthUser();
        this.props.loadUserPieces(null);

    }
    componentDidMount(){

    }

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
                <TextModal></TextModal>
                <div className = 'side-nav'>
                    <SideNav saveMenuFunction = { this.props.saveMenu } user = { this.props.authenticatedUser === null ? null : this.props.authenticatedUser }></SideNav> 
                </div>
                <div id='dashboard'> 
                   <Dashboard deletePaperFunction = { this.deletePaperPiece } pieces = { this.props.userPieces === null ? null : this.props.userPieces }></Dashboard>
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
                        console.log(typeof([1,2,3,4,3]), "Yh, this is from the system!");
                        if(typeof([1,2,3,4]) ==='Array' ){
                            console.log("Bingo! I nailed the types. ");
                           ;
                        }else if(typeof({}) ==='object'){
                            console.log("Another Bingo, I nailed the types");
                        }else{
                            console.log("Dude, wtf you talking about!");
                        }
                    }}>Click me</button>
                </center>
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
        store:state
    };
};
function matchDispatchToProps(dispatch){
    return bindActionCreators({ 
        getAuthUser: fetchUserAction, 
        loadUserPieces: loadUserPiecesAction, 
        createNewPaper: createNewPaperAction, 
        saveMenu: saveMenuToRemoteAction, 
        deletePaperPiece: deletePaperPieceAction
    },dispatch)
};

export default connect (mapStateToProps, matchDispatchToProps)(Home);
