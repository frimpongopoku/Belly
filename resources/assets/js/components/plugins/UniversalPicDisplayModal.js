import React from 'react';

class UniversalPicModal extends React.Component {

    
  
  render() {
    return (
      <div id="universal">
        <input type='hidden' id="modal-opt-mode-pic" value='view' />
        <div className='modal fade my-depth-1' id="universal-pic-modal">
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-body modal-height'>
                <div className='modal-side-bar' id="pic-m-side-bar">
                </div>
                <div className='col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>
                  <div id="pic-modal-envelope" className = ' pic-modal-envelope'>

                  </div>
                </div>
              </div>
              <div className='modal-footer clearfix'>
                <small>{this.props.created_at}</small>
                <div className='pull-left' style={{ paddingLeft: '85px' }}>
                  <a href='#' className='action-btn font-small-ish'><i className='fa fa-thumbs-up'></i> 45</a>
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
    display: 'none'
  },
  correctMarg: {
    margin: 20
  }
};


export default UniversalPicModal;








