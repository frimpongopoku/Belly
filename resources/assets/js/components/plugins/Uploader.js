import React from 'react'; 
import $ from 'jquery';
import ajaxSubmit from 'jquery-form';

class Uploader extends React.Component{
	componentDidMount(){
		var checkFile = this.checkFile;
		$('.input-file').change(function(){
			setTimeout(function(){
				checkFile();
			},2000)
		})
		this.uploadOnSubmit();
	}
	doUpload(){ 
		if( this.fileSelected() === true){ //if something has actually been secleted
			$('#upload-form').submit();	
		}else{
			alert('Where do you think you are going? You havent selected anything');
		}
	}
	uploadOnSubmit(){
		var fileSelected = this.fileSelected;
		var cleanUp = this.cleanUp;
		$('#upload-form').on('submit',function(e){
			if(fileSelected()===true){
				e.preventDefault(); 
				e.stopImmediatePropagation();//this is to make sure the form does not submit twice
				$(this).ajaxSubmit({ 
					beforeSend:function(){
						console.log('hello, I am before send, bitches');
						$('.progress').fadeIn(200);  
						$('.progress-bar').css({width:0});
						$('.progress-text').fadeIn(200);
					},
					uploadProgress:function(event,position,total,percentComplete){
	 						$('.progress-bar').css({width: percentComplete+'%'});
	 						$('.progress-text').text(percentComplete+'% complete');	 						
					}, 
					success:function(data){
						setTimeout(function(){
	 							$('.progress').fadeOut(100); 
	 							$('.progress-text').fadeOut(100);
	 					},1500);
						console.log('I am done BITCHES--> this is success',data);
						cleanUp();
					}
				});
				return false; //this is also a second wall to make sure the form does not submit twice
			}//end of IF
		});		
	}

	checkFile(){
		let fileObj = $('.input-file')[0].files[0]; 
		if(fileObj !== undefined){
			let fileTypes = ['png','PNG','jpg','JPG','jpeg','JPEG','gif','GIF','bmp','BMP','pdf','PDF'];
			let fileName = fileObj.name; 
			let fileExt = fileObj.type.split('/')[1]; 
			let fileSize = fileObj.size < 1000000 ? Math.round(fileObj.size/1000) : Math.round((fileObj.size/1000000)*10)/10;
			if( fileObj.size > 2000000){
				$('.file-check-size').removeClass('label-success').addClass('label-danger');
			}else{
				$('.file-check-size').removeClass('label-danger').addClass('label-success');
			}
			if(!fileTypes.includes(fileExt)){
				$('.file-check-type').removeClass('label-success').addClass('label-danger');
			}else{
				$('.file-check-type').removeClass('label-danger ').addClass('label-success');
			}
			let displayExt = fileObj.size < 1000000 ? ' KB': ' MB';
			$('#input-file-textbox').val(fileName);
			$('.file-check-name').text(fileName);
			$('.file-check-size').text(fileSize + displayExt); 
			$('.file-check-type').text(fileExt); 
		}
	}
	fileSelected(){
		let fileObj = $('.input-file')[0].files[0]; 
		if(fileObj !== undefined){
			return true;
		}else{
			return false;
		}
	}
	cleanUp(){
		$('.file-check-name').text('');
		$('.file-check-size').text(''); 
		$('.file-check-type').text('');
		$('#input-file-textbox').val('')
		$('#post-title').val('');
		$('.input-file').val('');
	}
	render(){
		return (
			<div>
				 <center>
                    <h3 style={{ marginTop: '10%' }}>Upload Picture OR PDF Of Questions </h3>
                    <small>Here you can upload a picture of questions, or a PDF file that contains questions.</small><br />
                    <small className = 'text text-success'>Maximum file size for pictures <b><span className ='text text-danger number-font'>2 MB</span> </b>.</small> <br/>
                    <small className = 'text text-success'>Maximum file size for PDFs <b><span className ='text text-danger number-font'> 5 MB </span></b>.</small>
                </center>
                	{/* FORM AREA */}
            	<form action="/up" id='upload-form' method="post" encType = 'multipart/form-data'>
            		<input type='hidden' name='_token' defaultValue ={ this.props.token } />
                    <input type='text' placeholder='Choose file ' className ='form-control number-font pull-left input-file-textbox zero-radius' id='input-file-textbox'style={{width:'85%'}} readOnly/>
                    <button className='btn btn-primary zero-radius green pull-right z-depth-1 ' id='test-button' onClick={(event)=>{
                    	event.preventDefault();
                        $('.input-file').trigger('click');
                    }}><i className = 'fa fa-upload'></i> Select</button>
                  
                    <div onClick={()=>{ this.doUpload()}} className = 'btn btn-success zero-radius pull-right z-depth-1' style={{ marginTop:6, paddingLeft:22, paddingRight:22}}>Done</div>
                    <input type='text' name='postTitle' className = 'form-control zero-radius input-file-textbox pull-left' id='post-title' style={{width:'85%',marginBottom:13}} placeholder='Say something'/>
                   
					<small className = 'file-check-name file-check number-font  z-depth-1 p-r-fix label label-success'></small> 
	                <small className = 'file-check-size file-check number-font  z-depth-1 p-r-fix label label-success'></small> 
	                <small className = 'file-check-type file-check number-font  z-depth-1 p-r-fix label label-success'></small> <br/><br />
                    <div className="progress" style={{height:"2px", display:'none',marginBottom:5}}>
				 		<div className="progress-bar" role="progressbar" style={{width:0}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>	 		
					</div>
					<center><small className=' text text-default number-font progress-text vanish'>0% complete</small></center>
                    <input type='file' className='input-file' name="image" style={{opacity:0}}/> 
                </form>
                
				
			</div>
		);
	}
}

export default Uploader;