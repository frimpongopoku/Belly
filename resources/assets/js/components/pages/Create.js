import React, { Component } from 'react';
import $ from 'jquery'; 
import SnackBar from './../Plugins/SnackBar';

class Create extends Component {
    constructor(props){
        super(props); 
        this.availableOptions = ['text','pdf','picture'];
        
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
    validate(title, body){
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
        if (errorPoints === 0){
            //last checkpoint ->check if its not full of spaces -> this fxn can be used because
            //over here I am certain that both 'title' and 'body' are not empty 
            if (this.fullOfSpaces(title)==='True' || this.fullOfSpaces(body) ==='True'){
                errors.push('Your text is only full of spaces');
                return { status: 'Fail',errors: errors};
            }else{
                return { status: 'Pass', errors:errors};
            }
        }else{
            return { status: 'Fail',errors: errors};
        }    

    }
    extractData(){ 
        let title = this.refs.title.value; 
        let body = this.refs.body.value; 
        let owner = this.props.user.name; 
        let ownerID = this.props.user.id; 
        let course = this.props.user.course;
        let dataTrain =  {
            title: title,
            body:body,
            course:course,
            owner:owner,
            owner_id:ownerID, 
            id: Math.floor(Math.random() * Math.floor(1000)) ,
            created_at:'4 days ago', 
            type:'text'
        };
        let validationResults = this.validate(title,body); 

        if(validationResults.status ==='Pass'){
            this.refs.title.value = ""; 
            this.refs.body.title = "";
            this.props.createPaperFunction(dataTrain, this.props.allPieces); 
            this.props.switchPageFunction('dashboard');
        }else{
            alert(validationResults.errors);
        }
        
    }
    snack(ID, inDur , outDur, waitDur ){

        $('#'+ID).fadeIn(inDur,()=>{
            setTimeout(()=>{
               $('#'+ID).fadeOut(outDur);
            },waitDur)
            
        })
    }
    tabClick(option){
        let optionID = '#'+option+'-btn'; 
        let tab = '#'+option;
        let oldTab = '#'+$('#current-tab').val();
        this.availableOptions.filter((opt) => opt !== option).forEach(optB => {
            $('#'+ optB+'-btn').removeClass('app-color my-depth-1');     
        }); 
        $(optionID).addClass('app-color my-depth-1');
        console.log('done');
        $(oldTab).fadeOut(200,function(){
            $(tab).fadeIn(200);
            $('#current-tab').val(option);
        });
        
    }
    render() {
        return (
            <div className = 'page-margin'>
                <div className='container'>
                        <div className ='row'>
                            <SnackBar 
                                notice ={'Do something newerperopoasops sdoeperos'} 
                                ID = {'new-piece'}
                                color={'green'}
                            />
                            <div className= 'col-md-8 col-lg-10 col-lg-offset-1 col-md-offset-2'>
                            <div className ='col-md-4'>
                                 <button className = 'tab-option font-medium app-color my-depth-1' id='text-btn' 
                                 onClick ={()=>{
                                    this.tabClick('text');
                                 }}>Text</button>
                            </div>
                            <div className='col-md-4'>
                                <button className='tab-option font-medium' id='pdf-btn'
                                    onClick={() => {
                                        this.tabClick('pdf');
                                    }}>PDF</button>
                            </div>
                            <div className='col-md-4'>
                                <button className='tab-option font-medium' id = 'picture-btn'
                                    onClick={() => {
                                        this.tabClick('picture');
                                    }}
                                >Picture</button>
                            </div>
                           
                            <div className="">
                                <div className=' my-tabs '>
                                    <input type = 'hidden' id ='current-tab' value='text'/>

                                    <div className='my-tab' id='text'>
                                        <br />
                                        <div className = '' > 
                                            <input type = 'text' ref ='title'className= 'form-control my-input' placeholder='title' />
                                            <div className ='thumbnail  clearfix' style={styles.thumbnailFix}> 
                                                <button className = 'btn btn-default'><b> B </b></button> 
                                                <label className = '' style={{margin:'5px'}}><b> I </b></label>
                                                   <input type='submit' onClick = {()=>{this.extractData()}} value = 'save' className = 'btn btn-success pull-right' />
                                            </div>
                                            <textarea ref = 'body' className= 'form-control  my-txt-area'  rows='25' placeholder ='Compose question '>Start,</textarea>

                                            
                                        </div>
                                    </div>
                                    <div className='my-tab vanish' id='pdf'>
                                        <br />
                                        <div className='my-thumbnail tab-back-color tab-h-5' >
                                            <center> 
                                                <h3 style = {{marginTop:'180px'}}>Upload PDF file </h3>
                                                <input type = 'file' className ='input-file'  />
                                               
                                            </center>
                                        </div>
                                    </div>
                                    <div className='my-tab vanish' id='picture'>
                                        <br />
                                       
                                        <div className='my-thumbnail tab-back-color tab-h-5' >
                                            <center>
                                                <h3 style={{ marginTop: '180px' }}>Upload Picture Of Questions </h3>
                                                <input type='file' className='input-file' />
                                         </center>
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

export default Create;
