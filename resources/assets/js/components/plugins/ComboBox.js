import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
class ComboBox extends Component {

  componentDidMount(){
    let thisClass = this;
    $(document).ready(function(){
      document.getElementById(thisClass.props.name).value = thisClass.props.user_course;
    });
  }
  ejectCourses(){
    if (this.props.allCourses ===null){}
    else{
      return this.props.allCourses.map(function(item,index){
        return ( <option  key = {index}>{item.name}</option>);
      })
    }
  }
  render() {
    return (
      <div className = "col-md-4 col-lg-4 col-sm-6 col-xs-6">
        <div className="form-group" className=" input-sm" >
          <select className="form-control input-sm" name = {this.props.name} ref = {this.props.name} id={this.props.name} >
                 {this.ejectCourses()}
          </select>
        </div>
      </div>
    );
  }
}
ComboBox.PropTypes = {
  options: PropTypes.object, 
  name: PropTypes.string,
}
export default ComboBox;
