import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Piece from './../plugins/Piece';

import PicModal from './../plugins/PicModal'; //remember to reset this thing back to the single piece, or just add the single piece
import MultiplePicModal from './../plugins/MultiplePicModal';
import logo from './../../imgs/f-spinner-2.png';
import PicPiece from './../plugins/PicPiece';
import UniversalTextDisplay from  "./../plugins/UniversalTextDisplayModal";
import ReactDOM from 'react-dom';

class Dashboard extends Component {
  constructor(props){
    super(props); 
    this.searchTypes = ['Name','Title','Year','Username','University','Programme','Course','Rating']; 
    this.availableOptions = ['text-section','picture-section','pdf-section'];
    this.currentTextPieceSetter = this.currentTextPieceSetter.bind(this);
    this.setTextCurrentState = this.setTextCurrentState.bind(this);
    this.createOptionElements = this.createOptionElements.bind(this);
    this.createAllOptions = this.createAllOptions.bind(this);
    this.initAllPages = this.initAllPages.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.editPaper = this.editPaper.bind(this);
    this.state = { 
        currentTextPiece:null,
        currentTextState:false,
        currentTextIndicator:0
      }
  }

  setTextCurrentState(){
    this.setState({currentTextState:true});
  }
  currentTextPieceSetter(dataTrain){
    this.setState({ currentTextPiece: dataTrain, currentTextIndicator: dataTrain.ID });
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
          body = { piece.body }
          openPieceFunction = { this.currentTextPieceSetter }
          currentTextStateFunction = { this.setTextCurrentState }
          createSideOptionsFunction ={ this.createAllOptions }
          textModalCleanUpFunction = { this.textModalCleanUp }
          initAllPagesFunction = { this.initAllPages }
          indicator = { this.state.currentTextIndicator }
          ID={ piece.id } />
          {/* <TextModal 
            editPaperFunction ={ this.props.editPaperFunction } 
            owner = {this.props.user.name} 
            allPieces = { this.props.pieces } 
            deletePaperFunction = { this.props.deletePaperFunction }
            piece_title = { piece.title } 
            piece_id = {piece.id}
            piece_body={piece.body} 
            created_at= { piece.created_at} /> */}
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

  selectMode(mode) {
    let currentOption = $('#modal-opt-mode').val();
    $('#modal-' + currentOption + '-' + "text").removeClass('m-side-active');
    $('#modal-' + mode + '-' + "text").addClass('m-side-active');
    this.changeMode(mode, currentOption);
    $('#modal-opt-mode').val(mode);
  }
  createOptionElements(type, href, fontAwesome) {
    let anchorDiv = document.createElement('div');
    let anchor = document.createElement('a');
    let fa = document.createElement('i');
    let thisClass = this;
    anchorDiv.className = 'modal-side-items';
    anchorDiv.addEventListener('click', function () { thisClass.selectMode(type) });
    anchorDiv.id = 'modal-'+type + '-' + 'text';
    anchor.className = 'modal-s-i-c';
    anchor.href = href;
    fa.className = fontAwesome;
    anchor.appendChild(fa);
    anchorDiv.appendChild(anchor);
    document.getElementById('text-m-side-bar').appendChild(anchorDiv);
  }
  createAllOptions(){
    this.createOptionElements('edit', '#', 'fa fa-pencil');
    this.createOptionElements('publish', '#', 'fa fa-arrow-circle-up');
    this.createOptionElements('delete', '#', 'fa fa-trash');
  }
  changeMode(nextMode, currentMode) {
    //get the moode that is to be switched to 
    //get the div of that. mode
    //get the current mode 
    //get the current mode div 
    //transition the current div out, and trans the next div in. 
    //NB: 'this' becomes the selected item inside the jqeury selected element, it doesnt point to the main 
    //class again.
    $('#universal-t-' + currentMode + '-mode').animate({ left: 20, opacity: 0 }, 300, function () {
      $('#universal-t-' + currentMode + '-mode').css({ left: 0, display: 'none', opacity: 1 })
      $('#universal-t-' + nextMode + '-mode').fadeIn(300);
      if (nextMode === 'delete' || nextMode === 'publish') {
        $('#universal-t-' + nextMode + '-mode').addClass('centerness');
      }
      $('#universal-t-' + nextMode + '-mode').addClass('relative');
    });
  }
  textModalCleanUp() {
    let edit = document.getElementById('modal-edit-text');
    let editPage = document.getElementById('universal-t-edit-mode');
    let publish = document.getElementById('modal-publish-text');
    let publishPage = document.getElementById('universal-t-publish-mode');
    let del = document.getElementById('modal-delete-text');
    let delPage = document.getElementById('universal-t-delete-mode');
    let viewPage = document.getElementById('universal-t-view-mode');
    let deletables =  [edit,publish,del,editPage,delPage,publishPage,viewPage]
    deletables.forEach( item =>{
      if(item !==null){
        item.remove();
      }
    });
  }
  editPaper(id) {
    let oldTitle = this.state.currentTextPiece.title; 
    let oldBody = this.state.currentTextPiece.body;
    let title = $('.js-modal-edit-title').val();
    let body = $('.js-modal-edit-body').val();
    let newDataBus = { title: title, body: body, id: id };
    if( oldTitle !== title && title !=="" || oldBody !==body && body !=="" ){
      this.props.editPaperFunction(newDataBus, this.props.pieces);
      $('.view-title').text(title);
      $('.view-body').text(body);
      this.textModalCleanUp();
      this.createAllOptions();
      this.initAllPages(title, body, id);
    }
  }

  createViewModalPage(title,body){
    let parent = document.createElement('div'); 
    let titleDiv = document.createElement('div');
    let realTitle = document.createElement('h2');
    let bodyDiv = document.createElement('div'); 
    let realBody = document.createElement('p'); 
    parent.id = 'universal-t-view-mode';
    parent.style.position ='relative';
    titleDiv.className = 'piece-title';
    realTitle.className ='view-title'; 
    bodyDiv.className = 'piece-body'; 
    realBody.className = 'view-body';
    realTitle.textContent = title;
    realBody.textContent = body;
    titleDiv.appendChild(realTitle); 
    bodyDiv.appendChild(realBody); 
    parent.appendChild(titleDiv); 
    parent.appendChild(bodyDiv);
    console.log("I am the parent:::: ", parent);
    document.getElementById('text-modal-envelope').appendChild(parent);

  }
  createEditModalPage(title,body,id){
    let thisClass = this;
    let parent = document.createElement('div');
    let closeBtn = document.createElement('button'); 
    let closeFa = document.createElement('i'); 
    let saveBtn = document.createElement('button'); 
    let saveFa = document.createElement('i');
    let titleInput = document.createElement('input'); 
    let bodyArea = document.createElement('textarea');
    parent.style.margin = 20;
    parent.className = "vanish"; 
    parent.id = 'universal-t-edit-mode'; 
    closeBtn.className = 'btn my-depth-1 round-float-button float-red';
    closeFa.className = ' fa fa-close'; 
    saveBtn.className = ' btn my-depth-1 round-float-button float-green';
    saveBtn.addEventListener('click',function(){thisClass.editPaper(id)});
    closeBtn.addEventListener('click',function(){ thisClass.selectMode('view');})
    saveFa.className = ' fa fa-save'; 
    titleInput.type = 'text'; 
    titleInput.className = ' form-control modal-ed-title js-modal-edit-title';
    titleInput.ref = "_newTitle"; 
    titleInput.defaultValue =title; 
    bodyArea.className ='form-control modal-ed-body js-modal-edit-body'; 
    bodyArea.rows = 18; 
    bodyArea.ref = '_newBody';
    bodyArea.id = 'm-edit-textarea';
    bodyArea.textContent = body;
    closeBtn.appendChild(closeFa); 
    saveBtn.appendChild(saveFa); 
    parent.appendChild(closeBtn); 
    parent.appendChild(saveBtn); 
    parent.appendChild(titleInput); 
    parent.appendChild(bodyArea); 
    console.log("Yoo I am the edit page ---->>: : ", parent);
    document.getElementById('text-modal-envelope').appendChild(parent);

  }
  createDeleteModalPage(title){
    let parent = document.createElement('div'); 
    let center = document.createElement('center');  
    let text = document.createElement('h2'); 
    let textSpan = document.createElement('span');
    let bold = document.createElement('b'); 
    let btn = document.createElement('button'); 
    let btnFa = document.createElement('i');
    parent.id = 'universal-t-delete-mode'; 
    parent.className = 'vanish';
    text.textContent = 'Are you sure you want to delete ';
    textSpan.style.color = 'black';
    btn.setAttribute('data-toggle','modal-dismiss'); 
    btn.className = ' btn btn-danger float-red my-depth-1 margin-5';
    btn.addEventListener('click',function(){alert('Nigga I am the shit!!!')});
    btnFa.className = ' fa fa-trash'; 
    bold.textContent = '"'+title+'"';
    textSpan.appendChild(bold);
    text.appendChild(textSpan); 
    btn.textContent = 'Yes I want to';
    btn.appendChild(btnFa); 
    center.appendChild(text); 
    center.appendChild(btn); 
    parent.appendChild(center); 
    console.log("Dude I am the delete page __>:: ",parent)
    document.getElementById('text-modal-envelope').appendChild(parent);
  }
  createPublishModalPage(title){
    let parent = document.createElement('div');
    let center = document.createElement('center');
    let text = document.createElement('h2');
    let textSpan = document.createElement('span');
    let bold = document.createElement('b');
    let btn = document.createElement('button');
    let btnFa = document.createElement('i');
    let cont = document.createElement('span');
    parent.id = 'universal-t-publish-mode';
    parent.className = 'vanish';
    text.textContent = ' You are about to make this paper live to everyone. Are you sure ';
    textSpan.style.color = 'black';
    btn.className = ' btn btn-success float-green my-depth-1 margin-5';
    btn.addEventListener('click', function () { alert('Nigga I am the shit!!!') });
    btnFa.className = ' fa fa-globe';
    bold.textContent = '"' + title + '"';
    cont.textContent = " is ready?";
    textSpan.appendChild(bold);
    text.appendChild(textSpan);
    text.appendChild(cont);
    btn.appendChild(btnFa);
    btn.textContent = 'I know what I am doing ';
    center.appendChild(text);
    center.appendChild(btn);
    parent.appendChild(center);
    console.log("Dude I am the publish page |||__>::||  ", parent)
    document.getElementById('text-modal-envelope').appendChild(parent);
  }
  initAllPages(title,body,id){
    this.createViewModalPage(title,body);
    this.createEditModalPage(title,body,id);
    this.createDeleteModalPage(title);
    this.createPublishModalPage(title);
  }

  render() {
    return (
      <div>
        <div className = 'container' style={{padding:'0'}}> 
          <input type='hidden' id = 'd-current-tab' value="text-section"/>
          <div className = 'row' > 
            <div className = 'col-md-10 col-lg-10'> 
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
      {/*  =============================== DISPLAY MODALS =============================*/}
        {
              this.state.currentTextPiece === null ? 
                <UniversalTextDisplay 
                  editPaperFunction ={null} 
                  owner = {null}
                  allPieces = {null}
                  deletePaperFunction = {null}
                  piece_title ={null} 
                  piece_id = {null}
                  piece_body={null}
                  created_at= {null}
                />
              :  
                <UniversalTextDisplay 
                  editPaperFunction ={ this.props.editPaperFunction } 
                  owner = {this.props.user.name} 
                  allPieces = { this.props.pieces } 
                  deletePaperFunction = { this.props.deletePaperFunction}
                  piece_title = { this.state.currentTextPiece.title } 
                  piece_id = {this.state.currentTextPiece.ID}
                  piece_body={this.state.currentTextPiece.body } 
                  created_at= { this.state.currentTextPiece.created_at}
                  createSideOptionFunction={this.createOptionElements}
                  textModalCleanUpFunction={this.textModalCleanUp}
                />
        }

        {
          // this.state.currentTextState !==false ? 
          //   <TextModalContainer>
          //     <UniversalTextDisplayModal 
          //       editPaperFunction={this.props.editPaperFunction}
          //       owner = {this.props.user.name} 
          //       allPieces = { this.props.pieces } 
          //       deletePaperFunction = { this.props.deletePaperFunction}
          //       piece_title = { this.state.currentTextPiece.title } 
          //       piece_id = {this.state.currentTextPiece.ID}
          //       piece_body={this.state.currentTextPiece.body} 
          //       created_at= { this.state.currentTextPiece.created_at}
          //     />
          //   </TextModalContainer>
          //   :''
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  deletePaperFunction:PropTypes.func,
  deletePictureFunction:PropTypes.func, 
  editPaperFunction:PropTypes.func,
  editPictureFunction:PropTypes.func, 
  picPieces: PropTypes.object, 
  user: PropTypes.object,
  pieces:PropTypes.object
}
export default Dashboard;
