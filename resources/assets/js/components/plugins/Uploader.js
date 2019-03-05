import React from 'react'; 
import $ from 'jquery';
import ajaxSubmit from 'jquery-form';
import CourseSelector from './ComboBox';
import TermSelector from './CourseYearSelect';

class Uploader extends React.Component{
	constructor(props){
		super(props); 
		this.state = {
      subcourseHolder:'',
			selectedItems:null, 
			fileTypes: ['png','PNG','jpg','JPG','jpeg','JPEG','gif','GIF','bmp','BMP','pdf','PDF']
		}
	}
	componentDidMount(){
		var thisClass = this;
		var checkFile = this.checkFile;
		$('.input-file').change(function(){
			setTimeout(function(){
				checkFile(thisClass);
			},500)
		})
		let fullWidth = document.getElementById('info-box'); 
	}
	doUpload(){ 
		if( this.fileSelected() === true ){ //if something has actually been selected
      if (this.refs.subcourse.value.trim() !== "" && this.refs.paperTitle.value.trim() !==""){
        $('#refresh-notice').fadeIn(400);
        $('.curtain-dragger').addClass('blink');
        $('#upload-form').submit();	
      }else{
        alert("Add a title to this upload.\nOR\nIndicate which course under "+this.props.course+" this paper belongs to.")
      }
      
		}
		else{
			alert('You havent selected any file');
		}
	}
	uploadOnSubmit(){
		var fileSelected = this.fileSelected;
		var cleanUp = this.cleanUp;
		var newPic = this.props.newPicFunction;
		var allPicPieces = this.props.allPicturePieces;
		var thisClass = this;
		var addNewPicture = this.addNewPicture;
		$('#upload-form').on('submit',function(e){
			if(fileSelected()===true){
				e.preventDefault(); 
				e.stopImmediatePropagation();//this is to make sure the form does not submit twice
				$(this).ajaxSubmit({ 
					beforeSend:function(){
						$('.progress').fadeIn(200);  
						$('.progress-bar').css({width:0});
						$('.progress-text').fadeIn(200);
					},
					uploadProgress:function(event,position,total,percentComplete){
	 						$('.progress-bar').css({width: percentComplete+'%'});
	 						$('.progress-text').text(percentComplete+'% complete');	 						
					}, 
					success:function(data){
            window.location ="/home";//refresh
						setTimeout(function(){
	 							$('.progress').fadeOut(100); 
	 							$('.progress-text').fadeOut(100);
	 					},1500);
						addNewPicture(data, thisClass);
						cleanUp();
            
					}
				});
				return false; //this is also a second wall to make sure the form does not submit twice
			}//end of IF
		});	}
	showDashboard(){
	 	$('#create-page-button').removeClass('side-active'); 
       	$('#create-page').fadeOut(300); 
       	$('#dashboard').fadeIn(300); 
       	$('#dashboard-button').addClass('side-active');
       	$('#current-page-box').val('dashboard'); 
       	$("#create-page").fadeOut(100)
	}
	addNewPicture(data,thisClass){
		thisClass.props.newPicFunction(data, thisClass.props.allPicturePieces);
		thisClass.showDashboard();
	}
	fixInfo(id,dataTrain,thisClass){
		let name= "#check-file-name-"+id;
		let size = "#check-file-size-"+id;
		let type = "#check-file-type-"+id;
		let properSize = dataTrain.size < 1000000 ? Math.round(dataTrain.size/1000) : Math.round((dataTrain.size/1000000)*10)/10;
		let unit = dataTrain.size < 1000000 ? ' KB' : ' MB';
		let typeExt = dataTrain.type.split('/')[1];
		$(name).text(dataTrain.name); 
		$(size).text(properSize + unit ); 
		$(type).text(typeExt);
		//add styling 
		if( dataTrain.size >2000000 ){
			$(size).removeClass('label-success').addClass('label-danger');
		}
		else{
			$(size).removeClass('label-danger').addClass('label-success');
		} 
		if( !thisClass.state.fileTypes.includes(typeExt) ){
			$(type).removeClass('label-success').addClass('label-danger');
		}
		else{
			$(type).removeClass('label-danger').addClass('label-success');
		}
	}
	stringifyList(thisClass){
		let string = ""; 
		thisClass.state.selectedItems.map(item=>{ 
			string = string !== "" ? string +", "+ item.name : string + item.name
		});
		$('#input-file-textbox').val(string);
	}
	displayInfo(){
		if( this.state.selectedItems !== null){
			return this.state.selectedItems.map((item,inArrayID)=>{
				return (
					<div  key = { inArrayID } style={{width:'100%'}}>
						<button className = ' file-check number-font corner-10  p-r-fix label label-success' 
							id={"check-file-name-"+inArrayID} style={{width:'60%' }} onClick={(e)=>{
								e.preventDefault();
							}}> { inArrayID}</button> 
				        <button className = ' corner-10 file-check number-font   p-r-fix label label-success'  
				       		 id={"check-file-size-"+inArrayID} style={{width:'10%' }}  onClick={(e)=>{
								e.preventDefault();
							}}> Second One { inArrayID }</button> 
				        <button className = 'corner-10 file-check number-font   p-r-fix label label-success'  
				        	id={"check-file-type-"+inArrayID} style={{width:'10%'}} onClick={(e)=>{
								e.preventDefault();
							}}> Third One { inArrayID }</button> <br/>
				       
			        </div>
				);
			});
		}
	}
	checkFile(thisClass){
		let fileObj = $('.input-file')[0].files[0]; 
		thisClass.setState({selectedItems: [...$('.input-file')[0].files] });
		thisClass.stringifyList(thisClass);
		if(fileObj !== undefined){
			thisClass.state.selectedItems.map( (item, index)=>{
				thisClass.fixInfo(index,item,thisClass);
			});
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
		$('.file-check-check').text('');
		$('#input-file-textbox').val('')
		$('#post-description').val('');
		$('.input-file').val('');}
	render(){
		this.uploadOnSubmit();//check pongo.why to know why this happens out here.

		return (
			<div className = 'clearfix' style={{marginTop:-10}}>
				 <center>
            <h3 style={{ marginTop: '10%',color:'black' }}>Upload Picture OR PDF Of Questions </h3>
            <small style={{fontSize:'medium'}}>Here you can upload a picture of questions, or <br/>a PDF file that contains questions.</small>
              <br />
          <small style={{ fontSize: 'medium' }} className = 'text text-success'>Maximum file size for pictures 
              <b><span className ='text text-danger number-font'> 2 MB</span> </b>.</small> <br/>
            <small className = 'text text-success'>
              <b><span className ='text text-danger number-font'> Keep files to a resonable size, very huge files will not upload</span></b>.</small>
              <br/>
              <p id="refresh-notice" className="refresh-notice vanish">Refresh when upload is complete 
              <button onClick = {()=>{this.props.curtainDown()}} 
                style={{marginLeft:10}} className="outline-remove outline-rounded btn btn-default rounded">
                <i className="fa fa-refresh"></i>  Refresh</button>
                </p>
          </center>
          <div style={{margin:40}}></div>
              {/* FORM AREA */}
          <form action="/upload-image" id='upload-form' method="post" encType = 'multipart/form-data'>
            <input type='hidden' name='_token' defaultValue ={ this.props.token } />
                <input type='text' placeholder='Choose file ' className ='form-control col-md-8 col-lg-8 number-font pull-left input-file-textbox zero-radius' 
            id='input-file-textbox' style={{ fontSize: 18,fontStyle:'italic',width:'100%'}} readOnly/>
              
            <input type='text' ref="paperTitle" name='description' className = 'mob-neg-margin-top form-control zero-radius input-file-textbox pull-left' 
            defaultValue="" id='post-description' style={{fontSize:18,width:'100%',marginBottom:13}} placeholder='"Midterm Biology Paper"'/>

          {/* ==========================PHONE CREATION BELT ==================== */}
          <div className='raise mobile-appearance-key pc-vanish-key tablet-vanish-key  thumbnail clearfix' style={{
            background: '#ef740a', borderColor: '#ef740a', padding: "10px 10px"
          }}>
            <input type="text" style={{
              fontSize: 18,
              borderColor: 'antiquewhite',
              marginBottom: 10,
              paddingLeft: 30,
            }}
              name="subcourse"
              ref="subcourse"
              onChange={() => {
                this.setState({
                  subcourseHolder: $('.pic-phone-subcourse').val()
                });
              }}
              placeholder="Enter course"
              value ={this.state.subcourseHolder}
              className="pic-phone-subcourse rounded form-control " />

            <div className=" ">
              <TermSelector unique="pic_paper_term" />
            </div>
            <center>
              <button className='btn btn-primary  green raise z-depth-1 ' style={{ margin: 5 }} id='test-button' onClick={(event) => {
                event.preventDefault();
                $('.input-file').trigger('click');
              }}>
                <i className='glyphicon glyphicon-hand-up' style={{ marginRight: 4 }}></i>
                Select
                  </button>
              <div onClick={() => { this.doUpload() }} className='btn btn-success  raise upload-button-design z-depth-1'
                style={{ margin: 5, paddingLeft: 22, paddingRight: 22 }}><i className="fa fa-upload"></i> Save</div>
            </center>
          </div>
          {/* -------------------------------------------------------------------- */}
  {/* ======================PC CREATION BELT================================= */}
          <div className= "thumbnail mobile-vanish-key pc-appearance-key tablet-appearance-key  clearfix" style={{paddingLeft:15}}>
                <div style={{marginLeft:-5}} className="pull-left">
              <div className=" pull-left" >
                <div className=" pull-left" style={{ width: "50%" }}>
                      <input type="text" style={{
                        fontSize: 18,
                        paddingLeft: 20,
                        borderColor: 'antiquewhite',
                        marginTop: 4,
                        marginBottom: 4,
                        marginLeft: 4,
                        marginRight: 15,
                      }}
                        onChange={() => {
                          this.setState({
                            subcourseHolder: $('.pic-pc-subcourse').val()
                          });
                        }}
                        value={this.state.subcourseHolder}
                        name="subcourse"
                        ref="subcourse"
                        placeholder="Enter course"
                        className="pic-pc-subcourse rounded form-control " />
                    </div>
                    <div className="pull-right">
                       <TermSelector unique="pic_paper_term" />
                    </div>
                  </div>
                </div>
                <div className = 'pull-right'>
                  <button className='btn btn-primary  green raise z-depth-1 ' style={{margin:5}}id='test-button' onClick={(event) => {
                    event.preventDefault();
                    $('.input-file').trigger('click');
              }}><i className='glyphicon glyphicon-hand-up' style={{ marginRight: 4 }}></i> Select</button>
                  <div onClick={() => { this.doUpload() }} className='btn btn-success  raise upload-button-design z-depth-1'
                    style={{ margin: 5, paddingLeft: 22, paddingRight: 22 }}><i className = "fa fa-upload"></i> Save</div>
                </div>
              </div>
              <div style ={{ width:'100%'}} id=" info-box">
                  {  this.displayInfo() }
              </div>
                <div className="progress" style={{height:"2px", display:'none',marginBottom:5}}>
          <div className="progress-bar" role="progressbar" style={{width:0}} 
            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>	 		
          </div>
					<center><small className=' text text-default number-font progress-text vanish'>0% complete</small></center>
            <input type='file' className='input-file' name="image[]" style={{opacity:0, width:1}} multiple/> 
          </form>

                    {/* <form action ="/upload-image" method="post" encType="multipart/form-data"> 
                      <input type='hidden' name='_token' defaultValue={this.props.token} />
                        <input type='hidden' name='pic_course_select' defaultValue="Computer Science" />
                      <input type='file' name="image[]" multiple/>
                        <CourseSelector
                          allCourses={this.props.allCourses}
                          name="pic_course_selection"
                          user_course={this.props.course}
                        />

                    <input type = "submit" />
                    </form> */}
	               
			</div>
		);

	}
}

export default Uploader;