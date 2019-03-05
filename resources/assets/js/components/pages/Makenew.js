import React, { Component } from 'react';
import $ from 'jquery'; 
import SnackBar from './../plugins/SnackBar';
import Uploader from './../plugins/Uploader';
import PropTypes from 'prop-types';
import CourseSelector from './../plugins/ComboBox';
import TermSelector from './../plugins/CourseYearSelect';

class MakeNew extends Component {
  constructor(props){
    super(props); 
    this.state={
      subcourseHolder:''
    }
    this.availableOptions = ['text','pdf','picture'];    
    this.switchPageAfterUpload = this.switchPageAfterUpload.bind(this); 
  }
  
  fullOfSpaces(string){
    //BUT THIS ALGORITHM ONLY WORKS AS LONG AS "string" is not empty
    //default asci value of space is 32
     //if the string is full of spaces, then 32 multiplied by the length of splitted string would equal ===>
    // the sum of the ascii values of splitted string 
    var spaceCharCode = 32; 
    var strList = string.split(""); 
    var markScheme = 32 * strList.length; 
    var finalAnswer = 0; 
  
    strList.forEach(function(item){
        finalAnswer = finalAnswer + item.charCodeAt(); 
    }); 
    if( markScheme === finalAnswer ){
        return  'True';
    }else{
        return 'False';
    }
  }

  validate(title, body,subcourse){
    //check if the title is empty and the textarea is equal to the default texts, 
    //check if the title boxy is empty and the textare is also empty, 
    //check if the  title box is has something but the textarea is empty -- that cant be allowed
    //check if the title boxy is empty but the textarea has some text-- that also cannot be allowed.
    //the default value of the text box is 'nothn' and textarea is " Starts,"
    var errorPoints = 0; 
    var errors = [];
    if( title ==='' || body ===''){
      errorPoints ++;
      errors.push("Either your body or title is empty");
    }
    if(title ===' ' || body === ' '){
      errorPoints ++; 
      errors.push('Your title or your body has only space as text');
    }
    if ( body ==='Start,'){
      errorPoints ++;
      errors.push('The question you composed contains only the default text, write real questions.');
    }
    if (this.fullOfSpaces(subcourse)==='True'){
      errorPoints ++;
      errors.push('Indicate what course this paper belongs to');
    }
    
    if (errorPoints === 0){
        //last checkpoint ->check if its not full of spaces -> this fxn can be used because
        //over here I am certain that both 'title' and 'body' are not empty 
      if (this.fullOfSpaces(title)==='True' || this.fullOfSpaces(body) ==='True'){
        errors.push('Your paper is only full of spaces');
        return { status: 'Fail',errors: errors};
      }
      else{
        return { status: 'Pass', errors:errors};
      }
    }
    else{
      return { status: 'Fail',errors: errors};
    }    

  }
  componentDidMount() {
    var thisClass = this;
    setInterval(function(){
      thisClass.temporarySave();
    },30000)
  }
  
  temporarySave(){
    let body = this.refs.body.value;
    if(body.trim() !=="" && body !=="Start,"){
      $.ajax({
        method: 'get',
        url: 'save-progress',
        data: { body: body }
      });
    }
  }
  extractData(){ 
    let title = this.refs.title.value; 
    let body = this.refs.body.value; 
    let owner = this.props.user.name; 
    let ownerID = this.props.user.id; 
    let subcourse = this.refs.subcourse.value;
    let course = document.getElementById("text_course_select").value;
    var paper_term = document.getElementById('text_term_selector').value;
    let dataTrain =  {
      title: title,
      body:body,
      course:course,
      paper_term: paper_term,
      name:owner,
      user_id:ownerID,
      subcourse:subcourse, 
      id: Math.floor(Math.random() * Math.floor(1000)) ,
      created_at:'now', 
      type:'text'
    };
    let validationResults = this.validate(title,body,subcourse); 
    if(validationResults.status ==='Pass'){
      this.refs.title.value = ""; 
      this.refs.body.value = "";
      this.props.createPaperFunction(dataTrain, this.props.allPieces); 
      this.props.switchPageFunction('dashboard');
      this.snack();
    }else{
       alert(validationResults.errors);
    }
  }
  snack(){
    var thisClass = this;
    $('.notifier').fadeIn(600);
  }
  tabClick(option){
    let optionID = '#'+option+'-btn'; 
    let tab = '#'+option;
    let oldTab = '#'+$('#c-current-tab').val();
    this.availableOptions.filter((opt) => opt !== option).forEach(optB => {
       $('#'+ optB+'-btn').removeClass(' z-depth-1 p-activate-section ');     
    }); 
    $(optionID).addClass('z-depth-1 p-activate-section ');
    $(oldTab).fadeOut(200,function(){
      $(tab).fadeIn(200);
      $('#c-current-tab').val(option);
    });
  }
  switchPageAfterUpload(){
    this.props.switchPageFunction('dashboard');
  }
  render() {
    return (
      <div className = 'page-margin' style={{marginLeft:0}}>
        <div className='container'>
          <div className ='row'>
            <div className={this.props.notification ===null? 'notifier' : 'notifier s-vanish'} style ={{display:'none'}}>     
              <SnackBar id ='First' color='green' notice ='Finshing up '/>
            </div>
            <div className= 'mobile-margin-top-40 col-md-10 col-sm-10 col-xs-12 col-lg-10 tablet-create-margin'>
            <div className = 'thumbnail zero-radius clearfix' style={{height:55, padding:0}}>
              <button className = 'd-tab zero-border btn-undefault z-depth-1 p-activate-section ' id='text-btn' 
               onClick ={()=>{
                  this.tabClick('text');
               }}><i className = 'fa fa-pencil' style={{marginRight:3}}></i> Text</button>
              <button className='d-tab zero-border btn-undefault' id = 'picture-btn'
                  onClick={() =>{
                      this.tabClick('picture');
                  }}
                ><i className='fa fa-upload' style={{ marginRight: 3 }}></i> Picture or PDF </button>
            </div>
             <div className="">
                <div className=' my-tabs '>
                  <input type = 'hidden' id ='c-current-tab' value='text'/>
                    <div className='my-tab' id='text' style={{marginTop:'1rem'}}>
                      <br />
                      <div className = 'clearfix' > 
                        <input type = 'text' ref ='title'className= 'form-control my-input' placeholder='"Midterm Biology Paper"' autoFocus/>
                      
                      {/* ==================PHONE CREATION BELT ================== */}
                      <div className='raise mobile-appearance-key pc-vanish-key tablet-vanish-key   thumbnail clearfix' style={{
                        background: '#ef740a', borderColor: '#ef740a', padding: "10px 10px"
                      }}>
                        <input type="text" style={{
                          fontSize: 18,
                          borderColor: 'antiquewhite',
                          marginBottom: 10,
                          paddingLeft: 30,

                        }}
                          onChange={()=>{
                            this.setState({
                              subcourseHolder:$('.phone-subcourse').val()
                            });
                          }}
                          ref="subcourse"
                          placeholder="Enter course"
                          value={this.state.subcourseHolder}
                          className="phone-subcourse rounded form-control " />
                          
                        <div className=" ">
                          <TermSelector unique="text_term_selector" />
                        </div>
                        <input type='submit' onClick={() => { this.extractData() }}
                          style={{ cursor: 'pointer', margin: 5, background: '#ef740a', borderColor: '#ef740a' }} value='save' className='outline-remove btn-lg btn-block rounded btn btn-success' />

                      </div>
                      {/* ------------------------------------------------ */}
                      
                      
                      {/* ====================PC CREATION BELT ================= */}
                        <div className =' thumbnail pc-appearance-key tablet-appearance-key mobile-vanish-key  left-side-rounded clearfix' style={styles.thumbnailFix}> 
                        <input type="hidden" id="text_course_select" value={this.props.user !== null ? this.props.user.course : ''}/>
                        <div className="pull-left clearfix">
                          <div className=" pull-left" style={{width:"50%"}}>
                            <input type="text" style={{
                              fontSize:18,
                              paddingLeft:20,
                              borderColor:'antiquewhite',
                              marginTop:6,
                              marginBottom:4,
                              marginLeft:18,
                              marginRight:15, 
                            }}
                            ref="subcourse"
                              onChange={() => {
                                this.setState({
                                  subcourseHolder: $('.pc-subcourse').val()
                                });
                              }}
                              value={this.state.subcourseHolder}
                            placeholder="Enter course"
                            className=" pc-subcourse rounded form-control "/>
                          </div>
                          <div className="pull-right">
                            <TermSelector unique="text_term_selector" />
                          </div>
                        </div>
                        <div className = 'pull-right'>
                          <input type='submit' onClick={() => { this.extractData() }} 
                            value='save' className='outline-remove btn btn-success raise pull-left' style={{ margin: 5 }} />
                          </div>
                        </div>
                        <textarea style={{fontFamily:'monospace', fontSize:20,paddingLeft:40}} 
                          ref = 'body' id="make-new-textarea"className= 'phone-padd-l-10 form-control  my-txt-area'  
                          rows='25' placeholder ='Compose question '>Start,</textarea>                                           
                      </div>
                    </div>   
                    <div className='my-tab vanish' id='picture' style={{marginTop:'-5rem'}}>
                      <br />
                      <div className=' tab-h-5 clearfix'>
                      <Uploader 
                         course={this.props.user !== null ? this.props.user.course : null } 
                         allCourses={this.props.allCourses} 
                         switchPageFunction= { this.switchPageAfterUpload }
                         newPicFunction = {this.props.newPicFunction } 
                         allPicturePieces = { this.props.allPicturePieces }
                         curtainDown = { this.props.curtainDown}
                         token = { this.props.token } />                                   
                      </div>                                      
                    </div>
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
  goodHeight:{
      height:500
  }, 
  thumbnailFix:{ 
      margin:10, 
      padding:10
  }
};


MakeNew.propTypes = { 
  allPicturePieces:PropTypes.array,
  newPicFunction:PropTypes.func,
  createPaperFunction:PropTypes.func,
  allPieces:PropTypes.array,
  user:PropTypes.object,
}
export default MakeNew;
