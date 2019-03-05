import React, { Component } from 'react';

class CourseYearSelect extends Component {

  
  render() {
    return (
      <div className="">
        <div className="">
          <div  className=" input-sm my-select-wrapper raise" >
            <select id={this.props.unique} name={this.props.unique} className="input-sm form-control select-undefault my-select" >  
              <option>Year 1 First Sem - Y1FS</option> 
              <option>Year 1 Second Sem - Y1SS</option>
              <option>Year 1 Third Sem - Y1TS</option>
              <option>Year 2 First Sem - Y2FS</option>
              <option>Year 2 Second Sem - Y2SS</option>
              <option>Year 2 Third Sem - Y2TS</option>
              <option>Year 3 Fist Sem - Y3FS</option>
              <option>Year 3 Second Sem - Y3SS</option>
              <option>Year 3 Third Sem - Y3TS</option>
              <option>Year 4 First Sem - Y4FS</option>
              <option>Year 4 Second Sem - Y4SS</option> 
              <option>Year 4 Third Sem - Y4TS</option> 
              <option>Year 5 First Sem - Y5FS</option>
              <option>Year 5 Second Sem - Y5SS</option> 
              <option>Year 5 Third Sem - Y5TS</option> 
              <option>Year 6 First Sem - Y6FS</option>
              <option>Year 6 Second Sem - Y6SS</option> 
              <option>Year 6 Third Sem - Y6TS</option> 
              <option>Year 7 First Sem - Y7FS</option>
              <option>Year 7 Second Sem - Y7SS</option> 
              <option>Year 7 Third Sem - Y7TS</option> 
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseYearSelect;
