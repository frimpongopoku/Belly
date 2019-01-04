import React from 'react'; 

class UniversalTextModal extends React.Component{
	render(){ 
		return (
				<div id = "universal">
					<input type ='hidden' id="modal-opt-mode-text" value='view'  /> 
					<div className='modal fade my-depth-1' id="universal-text-modal"> 
            <div className = 'modal-dialog modal-lg'> 
              <div className = 'modal-content'>
                <div className = 'modal-body modal-height'> 
                  <div className='modal-side-bar'  id ="text-m-side-bar">
                  </div>
	                  <div className = 'col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1 mobile-modal-b-left tablet-modal-b-left'>
                      <div id ="text-modal-envelope">
              
                        
                      </div>
	                  </div>
	              </div>
	              <div className ='modal-footer clearfix'> 
	                  <small>{this.props.created_at}</small>
	                  <div className = 'pull-left' style={{paddingLeft:'85px'}}>
	                       <a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> {this.props.likes_count}</a>
	                       <a href='#' className='action-btn font-small-ish'><i className='fa fa-comment'></i> {this.props.comments_count}</a>
	                       
	                        {/* <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-rock-o'></i> 2 </a> */}
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


export default UniversalTextModal;








