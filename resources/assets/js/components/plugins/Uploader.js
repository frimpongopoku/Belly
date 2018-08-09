import React from 'react'; 
import $ from 'jquery';

//Rename your class 
class Uploader extends React.Component{

	componentDidMount(){
	
	}
	checkFile(){
		console.log("I have been selected file with information: ", $('.input-file')[0].files[0].name);
		let fileObj = $('.input-file')[0].files[0]; 
		let fileName = fileObj.name; 
		let fileExt = fileObj.name.split('.')[1]; 
		let fileSize = Math.random(fileObj.size * 100) /100;
		$('.file-check-name').text(fileName);
		$('.file-check-size').text(fileSize); 
		$('.file-check-type').text(fileExt);  

	}
	render(){
		return (
			<div>
				 <center>
                    <h3 style={{ marginTop: '180px' }}>Upload Picture OR PDF Of Questions </h3>
                    <small>Here you can upload a picture of questions, or a PDF file that contains questions.</small><br />
                    <small className = 'text text-success'>Maximum file size for pictures <b><span className ='text text-danger'>2 MB</span> </b>.</small> <br/>
                    <small className = 'text text-success'>Maximum file size for PDFs <b><span className ='text text-danger'> 5 MB </span></b>.</small>
                </center>
                     <input type='text' placeholder='Choose file ' className ='form-control pull-right input-file-textbox zero-radius' style={{width:'85%'}} readOnly/>
                    <button className='btn btn-success green pull-left z-depth-1 ' onClick={()=>{
                        $('.input-file').trigger('click');
                    }}><i className = 'fa fa-upload'></i> Select</button>
                    <input type='file' className='input-file' style={{opacity:0}}/> 
                    <small className = 'file-check-name zero-radius z-depth-1 p-r-fix label label-success'></small> 
                    <small className = 'file-check-size zero-radius z-depth-1 p-r-fix label label-success'></small> 
                    <small className = 'file-check-type zero-radius z-depth-1 p-r-fix label label-success'></small> 
                    <button className='btn btn-default' onClick ={()=>{this.checkFile()}}>Test</button>
			</div>
			);
	}
}
//remember to export your class
export default Uploader;