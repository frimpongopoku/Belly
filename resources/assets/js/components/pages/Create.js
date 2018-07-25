import React, { Component } from 'react';
import $ from 'jquery'; 


class Create extends Component {
    constructor(props){
        super(props); 
        this.availableOptions = ['text','pdf','picture'];

        
    }
    
    tabClick(option){
        let optionID = '#'+option+'-btn'; 
        let tab = '#'+option;
        let oldTab = '#'+$('#current-tab').val();
        this.availableOptions.filter((opt) => opt !== option).forEach(optB => {
            $('#'+ optB+'-btn').removeClass('btn btn-elegant');
           
        }); 
        $(optionID).addClass('btn btn-elegant');
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
                            <div className= 'col-md-10 col-lg-10 col-md-offset-2'>
                            <div className ='col-md-4'>
                                 <button className = 'tab-option font-medium btn btn-elegant' id='text-btn' 
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
                                        <div className = 'my-thumbnail tab-h-5 clearfix' > 
                                        
                                            <input type = 'text' className = 'form-control margin-10' placeholder='title' />
                                            <textarea className = 'form-control margin-10'  rows='23' placeholder ='Compose question '> </textarea>
                                            <input type='submit' value = 'save' className = 'btn btn-success float-right' />
                                         
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
        }
};

export default Create;
