import React from 'react'; 
import PropTypes from 'prop-types';

class MyDropdown extends React.Component{

	constructor(props){
		super(props); 
		this.showItems = this.showItems.bind(this);
	}

	showItems(){
		return this.props.options.map( (option,index) => { 
      if(option.title ==='special' && option.type ==='delete'){
        return (
          <li key = {index}>
            <a data-toggle="modal" data-target="#universal-delete-board"
              onClick = {()=>{ }}
            > <i className = "fa fa-trash"></i> delete</a>
          </li>
        )
      }
      else{
        return(			
          <li key={ index + '-'+this.props.name }>
            <a href="#" onClick = {()=>{ option.function }}>
              <i className ={ ' fa ' + option.fa +' fa-pull-left p-r-fix' }></i> 
              { option.title }
            </a>
          </li>
          );
        }
		});
	}
	render(){
		return (
				<div>
					 {/* Single button */}
		      <div className="btn-group">
		       	<i className='fa fa-ellipsis-h font-medium pull-right'  style = {{ cursor:'pointer' }} id='el-drop-1' data-toggle="dropdown"></i>
		       	 <ul className="dropdown-menu pull-right" aria-labelledby='el-drop-1'>
		       	 	{this.showItems()}
		       	 </ul>
		      </div>
				</div>
			);
	}
}
MyDropdown.propTypes = { 
	items: PropTypes.array
}
export default MyDropdown;