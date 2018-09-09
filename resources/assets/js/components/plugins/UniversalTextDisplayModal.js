import React from 'react'; 
import PropTypes from 'prop-types';
import $ from 'jquery';


class UniversalTextModal extends React.Component{
	constructor(props){
		super(props);
  }

	editPaper(){
		var newDataBus = {title:this.refs._newTitle.value, body: this.refs._newBody.value, id:this.props.piece_id}
		this.props.editPaperFunction(newDataBus, this.props.allPieces);
		$('.view-title').text(this.refs._newTitle.value); 
		$('.view-body').text(this.refs._newBody.value);
		this.selectMode('view');
	}
  
	deletePaper(){
		var thisClass = this;
		setTimeout(function(){
			$('.modal .close').click();
			thisClass.props.deletePaperFunction(thisClass.props.piece_id,thisClass.props.allPieces);
		},1000)
  }


  
	render(){
		return (
				<div id = "universal">
					<input type ='hidden' id="modal-opt-mode" value='view'  /> 
					<div className='modal fade my-depth-1' id="universal-text-modal"> 
            <div className = 'modal-dialog modal-lg'> 
              <div className = 'modal-content'>
                <div className = 'modal-body modal-height'> 
                  <div className='modal-side-bar'  id ="text-m-side-bar">
                  </div>
	                  <div className = 'col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>
                      <div id ="text-modal-envelope">
                        
                        {/*Ddont forget display:inline-block*/}
                        
                      </div>
	                  </div>
	              </div>
	              <div className ='modal-footer clearfix'> 
	                  <small>{this.props.created_at}</small>
	                  <div className = 'pull-left' style={{paddingLeft:'85px'}}>
	                       <a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> 45</a>
	                       <a href='#' className='action-btn font-small-ish'><i className='fa fa-comment'></i> 10</a>
	                       <a href='#' className='action-btn font-small-ish'><i className='fa fa-share'></i> 2 </a>
	                       <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-rock-o'></i> 2 </a>
	                       <a href='#' className='name-badge-n my-depth-2 font-small-ish modal-s-i-c'>{this.props.owner}</a>
	                  </div>
	                  <button className=' close' data-dismiss='modal' ></button>
	                </div>
              </div>
            </div>
        </div>
			</div>
			);

	}
}
const styles = { 
	vanish: { 
		display:'none'
	}, 
	correctMarg:{ 
		margin:20}
}; 

	UniversalTextModal.propTypes = { 
		piece_title: PropTypes.string,
	  owner: PropTypes.string,
		piece_body: PropTypes.string,
		piece_id: PropTypes.number,
		created_at: PropTypes.string
	}



export default UniversalTextModal;








