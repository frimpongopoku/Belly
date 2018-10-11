import React from 'react'; 
import PropTypes from 'prop-types';
import $ from 'jquery';
import logo from './../../imgs/f-spinner-2.png';
class PicModal extends React.Component{

	constructor(props){
		super(props);
		this.selectMode = this.selectMode.bind(this); 
		this.changeMode = this.changeMode.bind(this);
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
			if(nextMode ==='delete-pic' || nextMode ==='publish-pic'){
				$('#'+nextMode+'-mode-'+piece_id).addClass('centerness');
			}
			$('#'+nextMode+'-mode-'+piece_id).addClass('relative');
		});
	}
	selectMode(mode){
		let currentOption = $('#mode-pic-'+this.props.piece_id).val();
		$('#'+currentOption+'-'+this.props.piece_id).removeClass('m-side-active'); 
		$('#'+mode+'-'+this.props.piece_id).addClass('m-side-active');
		this.changeMode(mode,currentOption);
		$('#mode-pic-'+this.props.piece_id).val(mode); 
	}
	zoom(ID){
		var zoomed = $('#pic-piece-body-'+ID).attr('data-zoomed'); 
		if (zoomed=== "false"){
			$('#pic-piece-body-'+ID).css({transform:'scale(1.3)',borderRadius:20, transition:'0.2s ease-in all'}); 
			$('#pic-piece-body-'+ID).attr('data-zoomed','true');			
		}else if(zoomed="true"){
			$('#pic-piece-body-'+ID).css({transform:'scale(1)',borderRadius:0, transition:'0.2s ease-in all'}); 
			$('#pic-piece-body-'+ID).attr('data-zoomed','false');	
		}
	}
	
	deletePicture(){
		$('.modal .close').click();
		this.props.deletePictureFunction(this.props.piece_id, this.props.allPieces);
		let idImageArray = this.props.arrayMakerFunction(this.props.allPieces); 
		this.runAllImages(idImageArray);

	}
	runAllImages(idImageArray){
        //this accetps this-class(Dashboard Class) as a parameter, and an array to that is made up of objects which contain 
        //'id' and 'image'.... that can be triggered to run on tabclick
        idImageArray.forEach(item=>{
            this.props.loadImageFunction(item.id, item.image);
        });
    }
	render(){
		return ( 
			<div>
				<input type ='hidden' id={'mode-pic-'+this.props.piece_id} value='view-pic'  /> 

				<div className='modal fade my-depth-1' id={'pic-piece-'+ this.props.piece_id }> 
              <div className = 'modal-dialog modal-lg'> 
                  <div className = 'modal-content'>
                      <div className = 'modal-body pic-modal-height'> 
                          <div className='modal-side-bar'>
                              <center>
                                <div onClick = {()=>{ this.selectMode('view-pic')}} className ='modal-side-items' id ={ 'view-pic-'+this.props.piece_id}> <a href='#' className='modal-s-i-c' 
                                      data-toggle='tooltip' data-placement='right' title='view'>
                                      <i className = 'fa fa-eye'></i></a> 
                                  </div>
                                  <div onClick = {()=>{ this.selectMode('publish-pic')}} className ='modal-side-items' id ={ 'publish-pic-'+this.props.piece_id}> <a href='#' className='modal-s-i-c' 
                                      data-toggle='tooltip' data-placement='right' title='Publish'>
                                      <i className = 'fa fa-arrow-circle-up'></i></a> 
                                  </div>
                                  <div onClick = {()=>{ this.selectMode('delete-pic')}} className ='modal-side-items' id ={ 'delete-pic-'+this.props.piece_id}> <a href='#' className='modal-s-i-c' 
                                      data-toggle='tooltip' data-placement='right' title='Delete'>
                                      <i className = 'fa fa-trash'></i></a>  
                                    </div>                                    
                              </center>
                          </div>
                          <div className = 'col-md-12 col-lg-12  ' style={{paddingRight:0}}>

                            <div id={'view-pic-mode-'+this.props.piece_id}  style = {{ position:'relative',margin:0}}>
                                
                                <div id = {'pic-piece-body-'+this.props.piece_id} 
                                onClick={()=>{this.zoom(this.props.piece_id)}} 
                                  data-zoomed='false' className ='pic-piece-image' 
                                style={{margin:0}}>
                                                {/* This is de div whose background is replaced but the loaded image everytime*/}
                                  </div>
                                  <div className = 'piece-title vanish'>
                                        <h2 className='view-title'>{ this.props.piece_body}</h2>
                                </div>
                            </div>
                            
                            <div id ={ 'delete-pic-mode-'+this.props.piece_id} style={ styles.vanish} > 
                              <center> 
                                <h2>Are you sure you want to delete <span style={{color:'black'}}><b>"{this.props.piece_body}"</b></span></h2>
                                <button data-toggle='modal-dismiss' className=' btn btn-danger float-red my-depth-1 margin-5'
                                  onClick ={()=>{this.deletePicture();}} >
                                  <i className = 'fa fa-trash'></i> Yes I want to 
                                </button>
                              </center> 
                            </div>
                            <div id = {'publish-pic-mode-'+this.props.piece_id }style={ styles.vanish}> 
                              <center> 
                                <h2>You are about  make this paper live to everyone on this platform.  Are you sure <span style={{color:'black'}}><b>"{this.props.piece_body}"</b></span> is ready? </h2>
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

PicModal.propTypes = { 
  tabClick: PropTypes.func,
  arrayMakerFunction: PropTypes.func,
  loadImageFunction: PropTypes.func,
  user:PropTypes.array,
	deletePaperFunction: PropTypes.func,
	loadImageFunction: PropTypes.func, 
	tabClick: PropTypes.func,
	allPieces: PropTypes.array,
	piece_body: PropTypes.string,
	piece_id: PropTypes.number,
	created_at: PropTypes.string
}



export default PicModal;








