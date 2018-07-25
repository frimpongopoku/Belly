import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { load } from './../actions/root-action';


class Example extends Component {

    componentDidMount(){
        console.log('I am the first function',this.props.loadFxn())    ;
    }
    render() {
        console.log(" I am users: ", this.props.myStore.users);
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>

                            <div className="panel-body">
                                I'm an example component! 
                                What the fuck? DUDE? CRAZY?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
        myStore: state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        loadFxn: load 
    },dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Example);




