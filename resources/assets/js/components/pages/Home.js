import './../../app.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { load } from './../../actions/root-action';
import SideNav from './../navigation/Sidebar';
import Dashboard from './Dashboard';
import $ from 'jquery'; 
import Profile from './Profile';
import Create from './Create';
import Gist from './Gist';

class Home extends Component {

    constructor(props){
        super(props); 
        
    }
    componentDidMount(){
        console.log("Adey here:", this.props.loadFxn());
    }

  render() {
      console.log(this.props.store)

        return (

            <div>
                <div className = 'side-nav'>
                    <SideNav switch = { this.switchPage }></SideNav> 
                </div>
                <div id='dashboard'> 
                    <Dashboard></Dashboard>

                    <center>
                <button onClick= { ()=>{
                    this.props.loadFxn
                }}>Click me </button>
                </center>
                </div> 
                <div id= 'profile' className='vanish' style = { styles.noteReady }> 
                    <Profile></Profile> 
                </div>
                <div id='create-page' className='vanish' style={styles.noteReady}> 
                    <Create></Create>
                </div>
                <div id='gist' className='vanish' style={ styles.noteReady}> 
                    <Gist></Gist>
                </div>

            </div>
           
        );
    }
}
const styles = { 
    notReady:{
        'display':'none'
    }
};

function mapStateToProps(state){
    return { 
        store: state.users
    };
};
function matchDispatchToProps(dispatch){
    return bindActionCreators({ 
        loadFxn: load 
    }, dispatch);
};

export default connect (mapStateToProps, matchDispatchToProps)(Home);
