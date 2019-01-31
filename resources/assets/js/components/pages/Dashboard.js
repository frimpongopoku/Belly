import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Piece from './../plugins/Piece';
import PicModal from './../plugins/PicModal'; //remember to reset this thing back to the single piece, or just add the single piece
import MultiplePicModal from './../plugins/MultiplePicModal';
import logo from './../../imgs/f-spinner-2.png';
import PicPiece from './../plugins/PicPiece';
import UniversalTextDisplay from  './../plugins/UniversalTextDisplayModal';
import UniversalPicDisplay from './../plugins/UniversalPicDisplayModal';
import SearchBox from './../plugins/search/SearchBox';
import ReactDOM from 'react-dom';
import PageSwitcher from './../plugins/PageSwitcher';
import Sidebar from "./../navigation/Sidebar";

class Dashboard extends Component {
  constructor(props){ 
    super(props); 
    this.searchTypes = ['Name','Title','Year','Username','University','Programme','Course','Rating']; 
    this.availableOptions = ['text-section','picture-section','pdf-section'];
    this.currentTextPieceSetter = this.currentTextPieceSetter.bind(this);
    this.currentPicPieceSetter = this.currentPicPieceSetter.bind(this);
    this.setTextCurrentState = this.setTextCurrentState.bind(this);
    this.setPicCurrentState = this.setPicCurrentState.bind(this);
    this.createOptionElements = this.createOptionElements.bind(this);
    this.createAllOptions = this.createAllOptions.bind(this);
    this.createAllPictureOptions = this.createAllPictureOptions.bind(this);
    this.initAllPages = this.initAllPages.bind(this);
    this.initAllPicPages = this.initAllPicPages.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.editPaper = this.editPaper.bind(this);
    this.handleImgDivs = this.handleImgDivs.bind(this);
    this.zoom =this.zoom.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.state = { 
        currentTextPiece:null,
        currentTextState:false,
        currentTextIndicator:0,
        currentPicPiece:null,
        currentPicPieceState:false,
        currentPicIndicator:0
      }
  }
  setPicCurrentState(){
    this.setState({currentPicPieceState:true});
  }
  currentPicPieceSetter(dataTrain){
    this.setState({ currentPicPiece:dataTrain, currentPicIndicator:dataTrain.id})
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
        $('#'+ optB+'-btn').removeClass(' z-dep  th-1 p-activate-section ');     
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
  emptyNotice(type) {
    if(this.props.pieces !==null){
      if(type ==="paper"){
        if (this.props.pieces.length === 0){
            return (<div>
              <center>
                <p style={{fontSize:'medium',fontWeight:600, color:"black"}}>You do not have any 
                <span className ='text text-primary'> text</span> papers yet.<br/> Start creating...</p>
              
              <button className ="btn btn-default" 
              onClick = {()=>{ let sideBar = new Sidebar(); sideBar.switchPage('create-page')}}> 
              <span className ="fa fa-plus"></span></button>
              </center>
            </div>);
        }
      }
      else if (type == "shots") {
        if(this.props.picPieces.length ===0){
          return (<div>
            <center>
              <p style={{ fontSize: 'medium', fontWeight: 600, color: "black" }}>You do not have any
                <span className='text text-danger'> image</span> papers yet.
                <br /> Start creating...</p>

              <button className="btn btn-default"
                onClick={() => { let sideBar = new Sidebar(); sideBar.switchPage('create-page') }}>
                <span className="fa fa-plus"></span>
              </button>
            </center>
          </div>);
        }
      }
    }
  }
  spillTextPieces(){ 
    //this.emptyNotice("paper");
    return this.props.pieces.map( (piece, index) =>{ 
      
      return (
        <li key={ index }>
          <Piece 
          owner= { this.props.user.name } 
          course={ piece.course } 
          fileType = "text" 
          title={ piece.title }
          body = { piece.body }
          likes_count = { piece.likes_count}
          comments_count = {piece.comments_count}
          openPieceFunction = { this.currentTextPieceSetter }
          currentTextStateFunction = { this.setTextCurrentState }
          createSideOptionsFunction ={ this.createAllOptions }
          textModalCleanUpFunction = { this.textModalCleanUp }
          initAllPagesFunction = { this.initAllPages }
          indicator = { this.state.currentTextIndicator }
          created_at = {piece.created_at}
          ID={ piece.id } />
        </li>
        );
      
    })
    
  }
  spillPicPieces(){
    //look for posts with single pieces and posts with multiple pictures andn load the appropriate plugins
    return this.props.picPieces.map( (piece,index)=>{
        return (
          <li key={index}> 
            <PicPiece 
              owner = { this.props.user.name }
              course = {piece.course}
              image_url={piece.picture_link}
              likes_count={piece.likes_count}
              comments_count={piece.comments_count}
              piece_id={piece.id}
              created_at={piece.created_at}
              allPieces={this.props.picPieces} 
              created_at={piece.created_at}
              openPieceFunction = {this.currentPicPieceSetter}
              currentPicStateFunction = {this.setPicCurrentState}
              createSideOptionsFunction = {this.createAllPictureOptions}
              cleanUpFunction ={this.picModalCleanUp}
              initAllPagesFunction = { this.initAllPicPages }
              extras = { piece.extra_images}
              type = { piece.type}
              indicator = { this.state.currentPicIndicator }
              />
        </li>
        );
    });
  }
  backgroundImageLoad(id,imageURL){
    //requests for an image to be loaded unto a page
    var bigImage = document.createElement('img');
    //bigImage.src = "http://localhost:8000/" + imageURL;
    var webPath = window.location.protocol + "//" + window.location.host;
    bigImage.src =webPath +'/'+imageURL;
    bigImage.onload = function () {
      $('.spinner-' + imageID).hide();
      $('.shots-img-' + imageID).css({
        background: 'url(' + bigImage.src + ')',
        height: 200,
        backgroundPosition: 'center center',
        opacity: 1,
        objectFit: 'cover !important',
        transition: '0.5s ease-in all',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
      });
    }
  }
  imageLoad(imageID,imageURL){
    //requests for an image to be loaded unto a page
    var bigImage = document.createElement('img');  
    //bigImage.src = "http://localhost:8000/"+imageURL;
    var webPath = window.location.protocol +"//"+window.location.host;
    bigImage.src = webPath +'/' + imageURL;
    console.log("I am the hostname and stuff:",window.location);
    console.log("I am the imageURL::", imageURL);
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
    //bigImage.src = "http://localhost:8000/"+imageURL;
    var webPath = window.location.protocol + "//" + window.location.host;
    bigImage.src = webPath +'/' + imageURL;
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
             var collection = { id: item.id , image: item.thumb_path, type:'M', extraImages: item.extra_images }; //you need to put the text ouchere yh!
         }
        else{
              var collection = { id: item.id , image: item.thumb_path, type:'S' };
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
    });
  }

  selectMode(mode,key) {
    let currentOption = $('#modal-opt-mode-'+key).val();
    var ckey; 
    if( key ==='text'){
      ckey = 't'
    }
    else if( key ==='pic'){
      ckey = 'p';
    }
    $('#modal-' + currentOption + '-' + key).removeClass('m-side-active');
    $('#modal-' + mode + '-' + key).addClass('m-side-active');
    this.changeMode(mode, currentOption,ckey);
    $('#modal-opt-mode-'+key).val(mode);
  }
  createOptionElements(type, href, fontAwesome,key,target) {
    let anchorDiv = document.createElement('div');
    let anchor = document.createElement('a');
    let fa = document.createElement('i');
    let thisClass = this;
    anchorDiv.className = 'modal-side-items ';
    anchorDiv.addEventListener('click', function () { thisClass.selectMode(type,key) });
    anchorDiv.id = 'modal-'+type + '-' + key;
    anchor.className = 'modal-s-i-c';
    anchor.href = href;
    fa.className = fontAwesome;
    anchor.appendChild(fa);
    anchorDiv.appendChild(anchor);
    document.getElementById(target).appendChild(anchorDiv);
  }

  createAllOptions(){
    this.createOptionElements('edit', '#', 'fa fa-pencil','text', 'text-m-side-bar');
    this.createOptionElements('publish', '#', 'fa fa-arrow-circle-up', 'text','text-m-side-bar');
    this.createOptionElements('delete', '#', 'fa fa-trash', 'text','text-m-side-bar');
  }
  createAllPictureOptions(){
    this.createOptionElements('view', '#', 'fa fa-eye','pic', 'pic-m-side-bar');
    this.createOptionElements('publish', '#', 'fa fa-arrow-circle-up', 'pic','pic-m-side-bar');
    this.createOptionElements('delete', '#', 'fa fa-trash', 'pic', 'pic-m-side-bar');
  }
  changeMode(nextMode, currentMode,key) {
    //get the moode that is to be switched to 
    //get the div of that. mode
    //get the current mode 
    //get the current mode div 
    //transition the current div out, and trans the next div in. 
    //NB: 'this' becomes the selected item inside the jqeury selected element, it doesnt point to the main 
    //class again.
    $('#universal-'+ key +'-' + currentMode + '-mode').animate({ left: 20, opacity: 0 }, 300, function () {
      $('#universal-'+ key +'-' + currentMode + '-mode').css({ left: 0, display: 'none', opacity: 1 })
      $('#universal-'+ key +'-' + nextMode + '-mode').fadeIn(300);
      if (nextMode === 'delete' || nextMode === 'publish') {
        $('#universal-'+ key +'-' + nextMode + '-mode').addClass('centerness');
      }
      $('#universal-'+ key +'-' + nextMode + '-mode').addClass('relative');
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
  picModalCleanUp(){
    let view = document.getElementById('modal-view-pic');
    let publish = document.getElementById('modal-publish-pic');
    let publishPage = document.getElementById('universal-p-publish-mode');
    let del = document.getElementById('modal-delete-pic');
    let delPage = document.getElementById('universal-p-delete-mode');
    let viewPage = document.getElementById('universal-p-view-mode');
    let deletables = [view, publish, del,viewPage,publishPage,delPage]
    deletables.forEach(item => {
      if (item !== null) {
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
  zoom(ID) {
    var zoomed = $('.modal-image').attr('data-zoomed');
    if (zoomed === "false") {
      $('.modal-image').css({ transform: 'scale(1.3)', borderRadius: 20, transition: '0.2s ease-in all' });
      $('.modal-image').attr('data-zoomed', 'true');
    } else if (zoomed = "true") {
      $('.modal-image').css({ transform: 'scale(1)', borderRadius: 0, transition: '0.2s ease-in all' });
      $('.modal-image').attr('data-zoomed', 'false');
    }
  }

  handleImgDivs(imageLink,parent,id){
    let thisClass = this;
    let imageDiv = document.createElement('div');
    imageDiv.style.background = 'url(' + imageLink + ')';
    imageDiv.className = 'pic-piece-image modal-image';
    imageDiv.style.backgroundSize = 'auto 100%';
    imageDiv.style.backgroundPosition = 'center center';
    imageDiv.style.backgroundRepeat = ' no-repeat !important';
    imageDiv.style.opacity = 1;
    imageDiv.setAttribute('data-zoomed', 'false');
    imageDiv.style.margin = 0;
    imageDiv.addEventListener('click', function () { thisClass.zoom(id) }); 
    parent.appendChild(imageDiv);
    
  }
  createPictureViewPage(id,body,imageLink,type,extras){
    //parent div
    //image div 
    //div for image text 
    //p from    image text
    let thisClass = this;
    let parent = document.createElement('div'); 
    this.handleImgDivs(imageLink,parent);
    if( type ==='multiple'){
      this.separateExtrasToSingles(extras).forEach(link =>{
        this.handleImgDivs(link,parent,id)
      });
    }
    let textDiv = document.createElement('div'); 
    let text = document.createElement('p');
    parent.id  = 'universal-p-view-mode'; 
    parent.style.position = 'relative'; 
    parent.style.margin = 0; 
    text.textContent = body; 
    textDiv.appendChild(text);
    textDiv.className = ' vanish'; 
    parent.appendChild(textDiv);
   
    document.getElementById('pic-modal-envelope').appendChild(parent);
  }
  createPictureDeletePage(id){
    let thisClass = this;
    let parent = document.createElement('div');
    let center = document.createElement('center');
    let text = document.createElement('h2');
    let textSpan = document.createElement('span');
    let bold = document.createElement('b');
    let btn = document.createElement('button');
    let btnFa = document.createElement('i');
    parent.id = 'universal-p-delete-mode';
    parent.className = 'vanish';
    text.textContent = 'Are you sure you want to delete this ? ';
    textSpan.style.color = 'black';
    btn.setAttribute('data-toggle', 'modal-dismiss');
    btn.className = ' btn btn-danger float-red my-depth-1 margin-5';
    btn.addEventListener('click', function () { thisClass.deletePicture(id) });
    btnFa.className = ' fa fa-trash';
    textSpan.appendChild(bold);
    text.appendChild(textSpan);
    btn.textContent = 'Yes I want to';
    btn.appendChild(btnFa);
    center.appendChild(text);
    center.appendChild(btn);
    parent.appendChild(center);
    
    document.getElementById('pic-modal-envelope').appendChild(parent);
  }
  createPicturePublishPage(body){
    let parent = document.createElement('div');
    let center = document.createElement('center');
    let text = document.createElement('h2');
    let textSpan = document.createElement('span');
    let bold = document.createElement('b');
    let btn = document.createElement('button');
    let btnFa = document.createElement('i');
    let cont = document.createElement('span');
    parent.id = 'universal-p-publish-mode';
    parent.className = 'vanish';
    text.textContent = ' You are about to make this paper live to everyone. Are you sure ';
    textSpan.style.color = 'black';
    btn.className = ' btn btn-success float-green my-depth-1 margin-5';
    btn.addEventListener('click', function () { alert('Nigga I am the shit!!!') });
    btnFa.className = ' fa fa-globe';
    cont.textContent = " is ready?";
    textSpan.appendChild(bold);
    text.appendChild(textSpan);
    text.appendChild(cont);
    btn.appendChild(btnFa);
    btn.textContent = 'I know what I am doing ';
    center.appendChild(text);
    center.appendChild(btn);
    parent.appendChild(center);
    
    document.getElementById('pic-modal-envelope').appendChild(parent);
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
    realBody.className = 'view-body save-white';
    realTitle.textContent = title;
    realBody.textContent = body;
    titleDiv.appendChild(realTitle); 
    bodyDiv.appendChild(realBody); 
    parent.appendChild(titleDiv); 
    parent.appendChild(bodyDiv);
    
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
    closeBtn.addEventListener('click',function(){ thisClass.selectMode('view','text');})
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
    document.getElementById('text-modal-envelope').appendChild(parent);

  }
  createDeleteModalPage(title,id){
    let thisClass = this;
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
    btn.addEventListener('click',function(){thisClass.deletePaper(id)});
    btnFa.className = ' fa fa-trash'; 
    btnFa.style.marginLeft = "4px";
    bold.textContent = ' "'+title+'" ';
    textSpan.appendChild(bold);
    text.appendChild(textSpan); 
    btn.textContent = 'Yes I want to';
    //btn.appendChild(btnFa); 
    center.appendChild(text); 
    center.appendChild(btn); 
    parent.appendChild(center); 
    document.getElementById('text-modal-envelope').appendChild(parent);
  }
  createPublishModalPage(title){
    let parent = document.createElement('div');
    let center = document.createElement('center');
    let text = document.createElement('h3');
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
    document.getElementById('text-modal-envelope').appendChild(parent);
  }
  initAllPicPages(id,body,imageLink,type,extras){
    this.createPictureViewPage(id,body,imageLink,type,extras);
    this.createPictureDeletePage(id);
    this.createPicturePublishPage(body);
  }
  initAllPages(title,body,id){
    this.createViewModalPage(title,body);
    this.createEditModalPage(title,body,id);
    this.createDeleteModalPage(title,id);
    this.createPublishModalPage(title);
  }

  deletePaper(id){
    var thisClass = this;
    setTimeout(function () {
      $('.modal .close').click();
      thisClass.props.deletePaperFunction(id, thisClass.props.pieces);
    }, 1000)
  }
  

  deletePicture(id) {
    $('.modal .close').click();
    this.props.deletePictureFunction(id, this.props.picPieces);
    let idImageArray = this.idImageArrayManufacture(this.props.picPieces);
    this.runAllImages(idImageArray);
  }

 
  render() {
    return (
      <div>
        <div className = 'container t-m-l-fix' style={{padding:'0'}}> 
          <input type='hidden' id = 'd-current-tab' value="text-section"/>
          <div className = 'row' > 
            <div className = 'col-md-10 col-lg-10 mobile-dashboard-pad-fix'> 
              {/* Search area */}
                 <SearchBox></SearchBox>
                {/* User Papers Tabs for TEXT/PICTURE/PDFs*/}
                <div className = 'thumbnail zero-radius clearfix' style={{height:55, padding:0}} > 
                  <button onClick = {()=>{this.tabClick('text-section')}} id='text-section-btn'className = 'p-activate-section z-depth-1 d-tab zero-border btn-undefault'><i className = 'fa fa-file-text'></i> Text</button>
                  <button onClick = {()=>{this.tabClick('picture-section')}} id='picture-section-btn'className = ' d-tab zero-border btn-undefault'><i className = 'fa fa-camera'></i> Shots</button>
                    {/* <button onClick = {()=>{this.tabClick('pdf-section')}} id='pdf-section-btn'className = ' d-tab zero-border btn-undefault'><i className = 'fa fa-file-pdf-o'></i> PDF</button> */}
                </div>
                {/* Found Papers area  */}
                <div> 
                  <div className = 'container' style={{padding:'0'}}>  
                    <div className = 'col-md-10' style={{padding:'0'}}>  
                    <div className='row' id="textons" style={{ position: 'relative' }}> 
                        <div id = 'text-section'style={{position:'relative'}}>
                            <PageSwitcher baseURL ="/me/get-all-text-papers" type="text" animateDiv="#text-portion" values={this.props.paginatorTextValuesInsert} unique="texty"></PageSwitcher>
                          <div id="text-portion">
                          {this.emptyNotice('paper')}
                            <ul style={{listStyleType:'none',padding:0}}> 
                              { 
                                  this.props.pieces ===null ? '' : this.spillTextPieces()
                              }
                            </ul>
                           </div>
                         </div>
                         <div id = 'picture-section' className = 'vanish' >
                        <PageSwitcher baseURL="/me/get-all-pic-papers" type="picture" animateDiv="#pic-portion" values={this.props.paginatorPicValuesInsert} unique="pixy"></PageSwitcher>  
                          <div id='pic-portion'>
                            <ul style={{listStyleType:'none',padding:0}}> 
                            {this.emptyNotice('shots')}
                              
                                {
                                    this.props.picPieces === null ? '' : this.spillPicPieces()
                                }
                            </ul>
                           
                          </div>
                         </div>
                          {/* <div id = 'pdf-section' className = 'vanish'> 
                              <center><h1>ADEY HERE TOOO </h1></center>
                          </div> */}
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
                  likes_count = {null}
                  comments_count ={null}
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
                  likes_count = {this.state.currentTextPiece.likes_count}
                  comments_count = {this.state.currentTextPiece.comments_count}
                  createSideOptionFunction={this.createOptionElements}
                  textModalCleanUpFunction={this.textModalCleanUp}
                />
        }
        {
          this.state.currentPicPiece === null ?
            <UniversalPicDisplay
              
            />
            :
            <UniversalPicDisplay
              owner = { this.props.user.name }
              created_at = {this.state.currentPicPiece.created_at}
              likes_count={this.state.currentPicPiece.likes_count}
              comments_count={this.state.currentPicPiece.comments_count}
            />
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
