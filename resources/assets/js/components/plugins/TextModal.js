import React from 'react'; 
import PropTypes from 'prop-types';

class TextModal extends React.Component{

	constructor(props){
		super(props);
		this.selectMode = this.selectMode.bind(this); 
		this.changeMode = this.changeMode.bind(this);
	}


	deletePaperPiece(){
		
	}
	changeMode(nextMode,currentMode){
		//get the moode that is to be switched to 
		//get the div of that. mode
		//get the current mode 
		//get the current mode div 
		//transition the current div out, and trans the next div in. 
		//NB: 'this' becomes the selected item inside the jqeury selected element, it doesnt point to the main 
		//class again.
		let piece_id = this.props.piece_id; 
		$('#'+currentMode+'-mode-'+piece_id).animate({left:20,opacity:0},300,function(){
			$('#'+currentMode+'-mode-'+piece_id).css({left:0,display:'none',opacity:1})
			$('#'+nextMode+'-mode-'+piece_id).fadeIn(300);
			if(nextMode ==='delete' || nextMode ==='publish'){
				$('#'+nextMode+'-mode-'+piece_id).addClass('centerness');
			}
			$('#'+nextMode+'-mode-'+piece_id).addClass('relative');

		});
	}
	selectMode(mode){
		let currentOption = $('#mode-'+this.props.piece_id).val();
		$('#'+currentOption+'-'+this.props.piece_id).removeClass('m-side-active'); 
		$('#'+mode+'-'+this.props.piece_id).addClass('m-side-active');
		this.changeMode(mode,currentOption);
		$('#mode-'+this.props.piece_id).val(mode); 
	}
	render(){
		return (
				<div>
					<input type ='hidden' id={'mode-'+this.props.piece_id} value='view'  /> 

					<div className='modal fade my-depth-1' id={'piece-'+ this.props.piece_id }> 
	                    <div className = 'modal-dialog modal-lg'> 
	                        <div className = 'modal-content'>
	                            <div className = 'modal-body modal-height'> 
	                                <div className='modal-side-bar'>
	                                    <center>
	                                       <div onClick = {()=>{ this.selectMode('edit')}} className ='modal-side-items' id={'edit-'+this.props.piece_id} ><a href='#' className='modal-s-i-c'  
	                                           data-toggle='tooltip' data-placement='right' title='Edit' >
	                                           <i className = 'fa fa-pencil'></i></a> 
	                                        </div>
	                                       <div onClick = {()=>{ this.selectMode('publish')}} className ='modal-side-items' id ={ 'publish-'+this.props.piece_id}> <a href='#' className='modal-s-i-c' 
	                                           data-toggle='tooltip' data-placement='right' title='Publish'>
	                                           <i className = 'fa fa-arrow-circle-up'></i></a> 
	                                        </div>
	                                        <div onClick = {()=>{ this.selectMode('delete')}} className ='modal-side-items' id ={ 'delete-'+this.props.piece_id}> <a href='#' className='modal-s-i-c' 
	                                            data-toggle='tooltip' data-placement='right' title='Delete'>
	                                            <i className = 'fa fa-trash'></i></a>  
	                                         </div>                                    
	                                    </center>
	                                </div>
	                                <div className = 'col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>

	                                	<div id={'view-mode-'+this.props.piece_id}  style = {{ position:'relative'}}>
		                                    <div className = 'piece-title'>
		                                            <h2 >{this.props.piece_title}</h2>
		                                    </div>
		                                    <div className = 'piece-body'>
		                                        <p>{ this.props.piece_body }</p>
		                                     </div>
		                                </div>
		                                {/*Ddont forget display:inline-block*/}
		                                <div id = {'edit-mode-'+this.props.piece_id}  style = {styles.correctMarg, styles.vanish  }> 
		                              		<button className = 'btn my-depth-1 round-float-button float-red' ><i className ='fa fa-close'></i></button>
		                                	<button className = 'btn my-depth-1 round-float-button float-green' onClick={()=>{ this.selectMode('view')}}><i className ='fa fa-save'></i></button>
		                                	<input type='text'className = 'form-control modal-ed-title' defaultValue={this.props.piece_title} />
		                                	<textarea className = 'form-control modal-ed-body ' rows='18' id = {'textarea-modal-'+this.props.piece_id}>
		                                		 { this.props.piece_body }
		                                	</textarea> 
		                                </div>
		                                <div id ={ 'delete-mode-'+this.props.piece_id} style={ styles.vanish} > 
		                                	<center> 
		                                		<h2>Are you sure you want to delete <span style={{color:'black'}}><b>"{this.props.piece_title}"</b></span></h2>
		                                		<button className=' btn btn-danger float-red my-depth-1 margin-5'><i className = 'fa fa-trash'></i> Yes I want to </button>
		                                	</center> 
		                                </div>
		                                <div id = {'publish-mode-'+this.props.piece_id }style={ styles.vanish}> 
		                                	<center> 
		                                		<h2>You are about  make this paper live to everyone on this platform.  Are you sure <span style={{color:'black'}}><b>"{this.props.piece_title}"</b></span> is ready? </h2>
		                                		<button className=' btn btn-success float-green my-depth-1 margin-5'><i className = 'fa fa-globe'></i> Ofcourse, I know what I am doing </button>
		                                	</center> 
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
	                                     <a href='#' className='name-badge-n my-depth-2 font-small-ish modal-s-i-c'>Pongo</a>
	                                </div>
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

TextModal.propTypes = { 
	piece_title: PropTypes.string,
	piece_body: PropTypes.string,
	piece_id: PropTypes.number,
	created_at: PropTypes.string
}



export default TextModal;








