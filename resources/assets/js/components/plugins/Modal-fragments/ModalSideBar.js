import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class ModalSideBar extends Component {
  componentDidMount(){
    this.Target = document.createElement('div');
   // this._render();
  }
  createOptionElements(){
    //let sideBar = document.createElement('div');
    let anchorDiv = document.createElement('div');
    let anchor = document.createElement('a');
    let fa = document.createElement('i');
    //sideBar.className = "modal-side-bar";
    //sideBar.id = "text-m-side-bar";
    anchorDiv.className = 'modal-side-items';
    anchorDiv.id = 'edit-' + this.props.id;
    anchor.className = 'modal-s-i-c';
    anchor.href = "#";
    fa.className = ' fa fa-pencil';
    anchor.appendChild(fa);
    anchorDiv.appendChild(anchor);
    //sideBar.appendChild(anchorDiv);
  return anchorDiv;
  }

  _render(){
    console.log(" I am the creation:::: ", this.createOptionElements());
    let parentSideBox = document.getElementById('text-m-side-bar');
    parentSideBox.appendChild(this.createOptionElements()); 
  }
  render() {
   this._render();
    return <noscript />
  }
};
