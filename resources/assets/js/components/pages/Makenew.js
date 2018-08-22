import React, { Component } from 'react';
import $ from 'jquery'; 
import SnackBar from './../Plugins/SnackBar';
import Uploader from './../Plugins/Uploader';

class MakeNew extends Component {
    constructor(props){
        super(props); 
        this.availableOptions = ['text','pdf','picture'];    
        this.switchPageAfterUpload = this.switchPageAfterUpload.bind(this); 
    }
    componentDidlMount(){
        console.log("I am in create:",this.props.allPicturePieces);
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
            name:owner,
            user_id:ownerID, 
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
         console.log("I am in create render:",this.props.allPicturePieces);
        return (
            <div className = 'page-margin'>
                <div className='container'>
                        <div className ='row'>
                             <div className={this.props.notification ===null? 'notifier' : 'notifier s-vanish'} style ={{display:'none'}}>     
                                <SnackBar id ='First' color='green' notice ='Finshing up...'/>
                            </div>
                            <div className= 'col-md-8 col-lg-10 col-lg-offset-1 col-md-offset-2'>
                            <div className = 'thumbnail zero-radius clearfix' style={{height:55, padding:0}}>
                                 <button className = 'd-tab zero-border btn-undefault z-depth-1 p-activate-section ' id='text-btn' 
                                 onClick ={()=>{
                                    this.tabClick('text');
                                 }}><i className = 'fa fa-pencil'></i> Text</button>
                                 <button className='d-tab zero-border btn-undefault' id = 'picture-btn'
                                    onClick={() => {
                                        this.tabClick('picture');
                                    }}
                                ><i className = 'fa fa-upload'></i> Picture</button>
                            </div>
                            <div className="">
                                <div className=' my-tabs '>
                                    <input type = 'hidden' id ='c-current-tab' value='text'/>
                                    <div className='my-tab' id='text' style={{marginTop:'1rem'}}>
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
                                    <div className='my-tab vanish' id='picture' style={{marginTop:'2rem'}}>
                                        <br />
                                        <div className=' tab-h-5 clearfix' >
                                           <Uploader switchPageFunction= { this.switchPageAfterUpload } newPicFunction = {this.props.newPicFunction } allPicturePieces = { this.props.allPicturePieces }token = { this.props.token } />                                   
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

export default MakeNew;
