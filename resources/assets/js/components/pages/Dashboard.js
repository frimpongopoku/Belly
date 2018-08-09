import React, { Component } from 'react';
import Piece from './../Plugins/Piece';
import TextModal from './../Plugins/TextModal';
import PicModal from './../Plugins/PicModal';
import logo from './../../imgs/f-spinner-2.png';
import PicPiece from './../Plugins/PicPiece';

class Dashboard extends Component {
    constructor(props){
        super(props); 
        this.searchTypes = ['Name','Title','Year','Username','University','Programme','Course','Rating']; 
        this.availableOptions = ['text-section','picture-section','pdf-section'];
    }

    tabClick(option){

        let optionID = '#'+option+'-btn'; 
        let tab = '#'+option;
        let oldTab = '#'+$('#d-current-tab').val();
        this.availableOptions.filter((opt) => opt !== option).forEach(optB => {
            $('#'+ optB+'-btn').removeClass(' z-depth-1 p-activate-section ');     
        }); 
        $(optionID).addClass('z-depth-1 p-activate-section ');
        $(oldTab).fadeOut(200,function(){
            $(tab).fadeIn(200);
            $('#d-current-tab').val(option);
        });
        var imageReplace = this.runAllImages;
        var thisClass = this;
        setTimeout(function(){
            imageReplace(thisClass);
        },2000)  

    }

    spillTextPieces(){ 
        return this.props.pieces.map( (piece, index) =>{ 
            return (
                <li key={ index }>
                    <Piece 
                    owner= { piece.name } 
                    course={  piece.user.course } 
                    fileType = "text" 
                    title={ piece.title } 
                    ID={ piece.id } />
                    <TextModal 
                    editPaperFunction ={ this.props.editPaperFunction } 
                    owner = {piece.user.name} 
                    allPieces = { this.props.pieces } 
                    deletePaperFunction = { this.props.deletePaperFunction }
                    piece_title = { piece.title } 
                    piece_id = {piece.id}
                    piece_body={piece.body} 
                    created_at= { piece.created_at} />
                </li>
                );
        })
    }
    spillPicPieces(){

    }
    imageLoad(imageID,imageURL){
        var bigImage = document.createElement('img'); 
        bigImage.src = "http://localhost:8000/imgs/avatars/"+imageURL;
        bigImage.onload = function(){
            $('.spinner-'+imageID).hide();
            $('.shots-img-'+imageID).css({
                background:'url('+bigImage.src+')',
                height:200, 
                backgroundPosition:'center center',
                opacity:1, 
                objectFit:'cover !important',
                transition:'0.5s ease-in all',
                borderTopRightRadius:5, 
                borderTopLeftRadius:5
            });
            $('#pic-piece-body-'+imageID).css({
                background:'url('+bigImage.src+')',
                backgroundSize:'auto 100%', 
                backgroundPosition:'center center',
                opacity:1, 
                transition:'0.5s ease-in all'
                

               
            });  
        }
    }

    runAllImages(thisClass){
        thisClass.imageLoad('2221',"blonde-avatar.jpg");
        thisClass.imageLoad('2222',"girl-avatar.jpeg");
        thisClass.imageLoad('2223',"../blue-orange.jpg");
    }
    render() {
        return (
            <div>
                <div className = 'container' style={{padding:'0'}}> 
                    <input type='hidden' id = 'd-current-tab' value="text-section"/>
                    <div className = 'row' > 
                        <div className = 'col-md-10 col-lg-10 col-md-offset-2 col-lg-offset-2'> 
                            {/* Search area */}
                            <div className='my-thumbnail z-depth-1' style={{ margin: '15px 0', marginLeft:0, width:'100%' }}> 
                                <div className =' ' >
                                    <input type = 'text' placeholder='search ' className='form-control search-box' />

                                    <div className="">
                                        <input type="radio" className=" my-checkbox" name='criteria' value = 'Name'id="Name" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Name">By Name</label>

                                        <input type="radio" className=" my-checkbox" name='criteria' value='Title' id="Title" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Title">By Title</label>

                                        <input type="radio" className=" my-checkbox" name='criteria' value='University' id="University" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="University">By University</label>
                                        
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Year'id="Year" />
                                         <label className="form-check-label my-checkbox-label" htmlFor="Year">By Year</label>
                                   
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Username'id="Username" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Username">By Username</label>
                                 
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Programme' id="Programme" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Programme">By Programme</label>
                           
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Course' id="Course" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Course">By Course</label>
                              
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Rating' id="Rating" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Rating">By Rating</label>
                                    </div>
                                 </div>
                            </div>
                                {/* User Papers Tabs for TEXT/PICTURE/PDFs*/}
                            <div className = 'thumbnail zero-radius clearfix' style={{height:55, padding:0}} > 
                                <button onClick = {()=>{this.tabClick('text-section')}} id='text-section-btn'className = 'p-activate-section z-depth-1 d-tab zero-border btn-undefault'><i className = 'fa fa-file-text'></i> Text</button>
                                <button onClick = {()=>{this.tabClick('picture-section')}} id='picture-section-btn'className = ' d-tab zero-border btn-undefault'><i className = 'fa fa-camera'></i> Shots</button>
                                <button onClick = {()=>{this.tabClick('pdf-section')}} id='pdf-section-btn'className = ' d-tab zero-border btn-undefault'><i className = 'fa fa-file-pdf-o'></i> PDF</button>
                            </div>
                            {/* Found Papers area  */}
                            <div> 
                                <div className = 'container' style={{padding:'0'}}>
                                    <div className = 'col-md-10' style={{padding:'0'}}>
                                        <div className = 'row'> 
                                            <div id = 'text-section'>
                                                <ul style={{listStyleType:'none',padding:0}}> 
                                                   { 
                                                      this.props.pieces ===null ? '' : this.spillTextPieces()
                                                   }
                                                 </ul>
                                             </div>
                                             <div id = 'picture-section' className = 'vanish' >  
                                                 <PicPiece ID ="2221" logo = {this.props.logo} />
                                                 <PicPiece ID ="2222" logo = {this.props.logo}/>
                                                 <PicPiece ID ="2223" logo = {this.props.logo}/>
                                                <PicModal 
                                                    owner = "Pongo 1" 
                                                    allPieces = { this.props.pieces } 
                                                    deletePaperFunction = { this.props.deletePaperFunction }
                                                    piece_title = "Le title 1"
                                                    piece_id = "2221"
                                                    piece_body="An empty street, an empty hearrt, a sould inside my heart! LOL! Westlife...."
                                                    created_at= "13 years ago -M"
                                                    loadModalImage = { this.loadModalImage}
                                                    image_url ="/imgs/avatars/blonde-avatar.jpg"

                                                />
                                                <PicModal 
                                                    owner = "Pongo 1" 
                                                    allPieces = { this.props.pieces } 
                                                    deletePaperFunction = { this.props.deletePaperFunction }
                                                    piece_title = "Le 2"
                                                    piece_id = "2222"
                                                    piece_body="An empty street, an empty hearrt, a sould inside my heart! LOL! Westlife...."
                                                    created_at= "13 years ago M"
                                                    loadModalImage = { this.loadModalImage}
                                                    image_url ="/imgs/avatars/girl-avatar.jpeg"

                                                />
                                                <PicModal 
                                                    owner = "Akwesi" 
                                                    allPieces = { this.props.pieces } 
                                                    deletePaperFunction = { this.props.deletePaperFunction }
                                                    piece_title = "Le title 3"
                                                    piece_id = "2223"
                                                    piece_body="An empty street, an empty hearrt, a sould inside my heart! LOL! Westlife...."
                                                    created_at= "13 years ago M+"
                                                    loadModalImage = { this.loadModalImage}
                                                    image_url ="/imgs/blue-orange.jpg"
                                                />
                                                <center><h3>DIfferent Picture Test</h3></center>
                                             </div>
                                             <div id = 'pdf-section' className = 'vanish'> 
                                                 <center><h1>ADEY HERE TOOO </h1></center>
                                             </div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                                {/* End of Found papers area */}
                        </div> 
                    </div> 
                </div>
            </div>
        );
    }
}


export default Dashboard;
