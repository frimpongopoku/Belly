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
                    <div className="modal-side-items" data-dismiss="modal">
                      <a className="modal-s-i-c">
                        <i className="fa fa-close"></i>
                      </a>
                    </div>
                  </div>
	                  <div className = 'col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1 mobile-modal-b-left tablet-modal-b-left'>
                      <div id ="text-modal-envelope">
                      </div>
	                  </div>
	              </div>
	              <div className ='modal-footer clearfix'> 
	                    {/* <small>{this.props.created_at}</small> */}
	                  <div className = 'pull-left' style={{paddingLeft:'85px'}}>
                  <a href='#' onClick={(e) => { e.preventDefault();
                  }} className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> {this.props.likes_count}</a>
                  <a href=''onClick={(e)=>{e.preventDefault();
                  }} className='action-btn font-small-ish'><i className='fa fa-comment'></i> {this.props.comments_count}</a>
                  
                  <small className=""><a className="btn-sm btn btn-default rounded" target="_blank" href={'/paper-view/MBZyU9WoGvD3M3OcszZ8skHvoPputaKIhq9uPmW6ZqImU8iwby1xOdirul1w2gGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/' + this.props.piece_id} style={{ color: "orange" }}><i className="fa fa-forward"></i></a></small>
                  <button className='btn btn-danger btn-sm rounded' data-dismiss='modal' style={{ marginLeft: 4 }}><i className="fa fa-close"></i></button>
                    <a href={'/give-me-pdf/' + this.props.piece_id} className="btn btn-default rounded" style={{ marginLeft: 4 }}><i className="fa fa-download"></i></a>

                  {/* <a href='#' className='action-btn font-small-ish'><i className='fa fa-hand-rock-o'></i> 2 </a> */}
                  <a href='#' style={{margin:3}}className='name-badge-n my-depth-2 font-small-ish modal-s-i-c'>{this.props.owner}</a>
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








