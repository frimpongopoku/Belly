import React, { Component } from 'react';
import Piece from './../Plugins/Piece';
import TextModal from './../Plugins/TextModal';
import PicModal from './../Plugins/PicModal'; //remember to reset this thing back to the single piece, or just add the single piece
import MultiplePicModal from './../Plugins/MultiplePicModal';
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
        this.availableOptions.filter(opt => opt !== option).forEach(optB => {
            $('#'+ optB+'-btn').removeClass(' z-depth-1 p-activate-section ');     
        }); 
        $(optionID).addClass('z-depth-1 p-activate-section ');
        $(oldTab).fadeOut(200,function(){
            $(tab).fadeIn(200);
            $('#d-current-tab').val(option);
        });
        var imgIDArr = this.idImageArrayManufacture(this.props.picPieces);
        var imageReplace = this.runAllImages;
        var thisClass = this;
        setTimeout(function(){
            imageReplace(thisClass,imgIDArr);
        },1000)  
    }
    spillTextPieces(){ 
        return this.props.pieces.map( (piece, index) =>{ 
            return (
                <li key={ index }>
                    <Piece 
                    owner= { this.props.user.name } 
                    course={ this.props.user.course } 
                    fileType = "text" 
                    title={ piece.title } 
                    ID={ piece.id } />
                    <TextModal 
                    editPaperFunction ={ this.props.editPaperFunction } 
                    owner = {this.props.user.name} 
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
        //look for posts with single pieces and posts with multiple pictures andn load the appropriate plugins
        return this.props.picPieces.map( (piece,index)=>{
            if(piece.type ==='single'){
              return (
                       <li key={index}> 
                            <PicPiece ID ={piece.id} logo = {this.props.logo} />
                            <PicModal 
                                tabClick = {this.tabClick}
                                owner = {this.props.user.name}
                                piece_id = {piece.id}
                                piece_body={piece.description}
                                allPieces = { this.props.picPieces } 
                                created_at= { piece.created_at }
                                image_url ={piece.picture_link}
                                extraImageLoadFunction = { this.extraImageLoad }
                                loadImageFunction = {this.imageLoad}
                                arrayMakerFunction = {this.idImageArrayManufacture}
                                deletePictureFunction = { this.props.deletePictureFunction}
                            />
                       </li>
                  );
            }
            else if( piece.type ==='multiple'){
                return(
                     <li key={index}> 
                        <PicPiece ID ={piece.id} logo = {this.props.logo} />
                        <MultiplePicModal
                            tabClick = {this.tabClick}
                            owner = {this.props.user.name}
                            piece_id = {piece.id}
                            piece_body={piece.description}
                            allPieces = { this.props.picPieces } 
                            created_at= { piece.created_at }
                            image_url ={piece.picture_link}
                            extraImageLoadFunction = { this.extraImageLoad }
                            loadImageFunction = {this.imageLoad}
                            arrayMakerFunction = {this.idImageArrayManufacture}
                            deletePictureFunction = { this.props.deletePictureFunction}
                            extraImgsText = { piece.extra_images }
                        />
                   </li>
                );
            }
                     
        });
    }
    imageLoad(imageID,imageURL){
        //requests for an image to be loaded unto a page
        var bigImage = document.createElement('img'); 
        bigImage.src = "http://localhost:8000/"+imageURL;
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
                backgroundRepeat:'no-repeat !important',
                opacity:1, 
                transition:'0.5s ease-in all'
            });  
        }
    }

    extraImageLoad(imageID, inArrayID, imageURL){
        var bigImage = document.createElement('img'); 
        bigImage.src = "http://localhost:8000/"+imageURL;
        bigImage.onload = function(){
            $('#pic-piece-body-'+imageID+'-m-'+inArrayID).css({
                background:'url('+bigImage.src+')',
                backgroundSize:'auto 100%', 
                backgroundPosition:'center center',
                backgroundRepeat:'no-repeat !important',
                opacity:1, 
                transition:'0.5s ease-in all'
            });  
        }
    }

    separateExtrasToSingles(text){
        //this function splits the text of extra images that were stringified during upload 
        var list = text.split("<==>"); 
        return list;
    }

    idImageArrayManufacture(pieces){
        //get all the picPieces from the state and arrange them into 'id', 'image' object to be passed to the (runAllImagesFxn)
        let arr = [];
        pieces.map(item =>{
            //check if item has extra pictures 
            if(item.type ==='multiple'){
                 var collection = { id: item.id , image: item.picture_link, type:'M', extraImages: item.extra_images }; //you need to put the text ouchere yh!
             }
            else{
                  var collection = { id: item.id , image: item.picture_link, type:'S' };
             }
            arr.push(collection);
        });
        return arr;
    }
    runAllImages(thisClass,idImageArray){
        //this accetps this-class(Dashboard Class) as a parameter, and an array to that is made up of objects which contain 
        //'id' and 'image'.... that can be triggered to run on tabclick
        idImageArray.forEach(item => {
            thisClass.imageLoad(item.id, item.image);
            if( item.type ==='M' ){
                thisClass.separateExtrasToSingles(item.extraImages).map( ( extra, index )=>{
                    thisClass.extraImageLoad(item.id,index, extra);
                });
            }
                // thisClass.extraImageLoad(item.id,'1','imgs/avatars/blonde-avatar.jpg');
                // thisClass.extraImageLoad(item.id,'2','imgs/avatars/female-avatar.png');
                // thisClass.extraImageLoad(item.id,'3','imgs/avatars/hoodie-avatar.jpg');
        });
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
                                                  <ul style={{listStyleType:'none',padding:0}}> 
                                                      {
                                                          this.props.picPieces === null ? '' : this.spillPicPieces()
                                                      }
                                                  </ul>
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
