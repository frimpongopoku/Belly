import React, { Component } from 'react';
import Results from './ResultsPad';
class SearchBox extends Component {

  constructor(props){
    super(props); 
    this.toggleResults = this.toggleResults.bind(this);
    this.registerCriteria = this.registerCriteria.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.createPaperSearchResultComponent =this.createPaperSearchResultComponent.bind(this);
    this.noResultDisplay = this.noResultDisplay.bind(this);
    this.state = { 
      criteria:null,
      current_search_value:null
    }
  }
  toggleResults(){
    let togValue = $("#results-pad").attr('data-toggled');
    if (togValue ==="false"){
      $("#results-pad").fadeIn(); 
      $('#results-pad').attr('data-toggled','true');
    }
    else{
      $("#results-pad").fadeOut();
      $('#results-pad').attr('data-toggled', 'false');
    }
  }
  
  showSearchPad(){
    $("#results-pad").fadeIn();
    $('#results-pad').attr('data-toggled', 'true');
  }
  doSearch(){
    let thisClass = this;
    let criteria = this.state.criteria; 
    let searchValue = $("#js-search-box").val();
    if( searchValue ===""){
      alert(' Make sure you have selected a criteria, and have put in a search value ')
    }
    else{
      this.showSearchPad();
      if(searchValue !== this.state.current_search_value){
        this.cleanUp();
        $.ajax({method:"get", url:"me/search", data:{search_value:searchValue}})
        .done(function(response){
          if(response.empty==='false'){
            setTimeout(() => {
              setTimeout(() => {
                thisClass.createPaperSearchResultComponent(response);
              }, 1000);
                $('#search-loading').fadeOut(500);
            }, 3000);
          }
          else{
            console.log("Its empty ", response);
            $('#search-loading').fadeOut(function(){
              thisClass.noResultDisplay();
            }); 
          }
          thisClass.setState({current_search_value:searchValue});
        });
      }
    }
  }
  cleanUp(){
    document.getElementById('js-paper-envelope') !==null ? document.getElementById('js-paper-envelope').remove():'';
    document.getElementById('js-pic-envelope') !== null ? document.getElementById('js-pic-envelope').remove() : '';
    document.getElementById('no-results') !== null ? document.getElementById('no-results').remove() : '';
    $('#search-loading').fadeIn();
  }
  registerCriteria(name){
    this.setState({criteria:name});
  }
  indResultDisplay(title,creatorName,likeCount,commentCount,id,type,parent,pdf_link){
    let grabButton = document.createElement('button');
    let faGrab =document.createElement('i');
    let link = document.createElement('a');
    let para = document.createElement('p');
    let likeSmall = document.createElement('small');
    let lI = document.createElement('i');
    let lNum = document.createElement('span');
    let commentSmall = document.createElement('small');
    let cI = document.createElement('i');
    let cNum = document.createElement('span');
    let userSmall = document.createElement('small'); 
    let cameraSmall= document.createElement('small'); 
    let faCamera=document.createElement('i'); 
   
    grabButton.className= "btn btn-default btn-sm pull-right grab-button";
    faGrab.className = "fa fa-hand-grab-o";
    grabButton.appendChild(faGrab);
    para.textContent = title; 
    para.className = "cursor";
    if(type==="pic"){
      link.href = "/shot-view/J3zUZ9WoGvD3M3OcszZ8skHvoPputaKIShq9uPmW6ZqImU8iwby1xOdirul1wgGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/" + id;
      link.target = "_blank";
    }
    else if(type==="paper"){
      link.href = "/paper-view/MBZyU9WoGvD3M3OcszZ8skHvoPputaKIhq9uPmW6ZqImU8iwby1xOdirul1w2gGEgo2n2kZGRGjnVHaELEC1flWfpkOC1fM87KnTzlGW2Ah3BcoCOc9nlcB4cPNTcz8XK6SpztbVJk0zDwCpLparTW/" + id;
      link.target = "_blank";
    }
    else{
      link.href =pdf_link;
      link.target = "_blank";
    }
    link.appendChild(para);
    userSmall.textContent= "@"+creatorName;
    userSmall.className= "margin-right-5 black-text";
    userSmall.style.textTransform = "uppercase";
    userSmall.style.fontWeight = 600;
    parent.appendChild(grabButton);
    parent.appendChild(userSmall);
    if (type === "pic") {
      faCamera.className = "fa fa-camera"
      cameraSmall.appendChild(faCamera);
      parent.appendChild(cameraSmall);
    }
    if (type === "pdf") {
      faCamera.className = "fa fa-file-pdf-o";
      cameraSmall.appendChild(faCamera);
      parent.appendChild(cameraSmall);
    }
    parent.appendChild(link); 
  }
  noResultDisplay(){
    let container =document.createElement('div');
    let center= document.createElement('center'); 
    let h1 =document.createElement('h1'); 
    let h_span = document.createElement('span');
    let h3 =document.createElement('h3'); 
    container.id = "no-results";
    container.style.paddingTop= "50px";
    h_span.className = "fa fa-search"; 
    h3.textContent = "No results found"
    h1.appendChild(h_span); 
    center.appendChild(h1); 
    center.appendChild(h3); 
    container.appendChild(center);
    document.getElementById('search-results-second-div').appendChild(container);
  }
  createPaperSearchResultComponent(searchResults){
    let thisClass = this;
    let envelope = document.createElement('div');
    envelope.id = "js-paper-envelope";
    envelope.className="clearfix";
    let picEnvelope = document.createElement('div');
    picEnvelope.id = "js-pic-envelope";
    picEnvelope.className = "clearfix";
    searchResults.papers.data.forEach(function(item){
      thisClass.indResultDisplay(item.title, item.user.name,4,5,item.id,"paper",envelope,null);
    });
    searchResults.pdfs.data.forEach(function(item){
      thisClass.indResultDisplay(item.title, item.user.name, 4, 5, item.id, "pdf", envelope,item.pdf_link);
    })
    searchResults.pics.data.forEach(function(item){
      thisClass.indResultDisplay(item.description, item.user.name, 5, 4, item.id, "pic", picEnvelope,null);
    });
    document.getElementById('js-paper-results-container').appendChild(envelope);
    document.getElementById('js-pic-results-container').appendChild(picEnvelope); 
  }
  render() {
    return (
      <div>
        <div className='my-thumbnail z-depth-1' style={{ margin: '15px 0', marginLeft: 0, width: '100%' }}>
          <div className=' clearfix' >
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right">
              <button className="btn btn-default"
                onClick={()=>{this.doSearch();}}>
                <span className="fa fa-search"></span>
              </button>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <form onSubmit ={(e)=>{e.preventDefault();this.doSearch();}}>
                <input type='text' placeholder='search' className='form-control search-box' id="js-search-box" />
              </form>
            </div>
            <center>
              <small style={{margin:15}} className = "text text-info">Search by 
                <span><b> Username, Title, University or Course </b></span>
              </small>
            </center>
          </div>
        </div>
        <Results toggleFunction = {this.toggleResults} ></Results>
      </div>
    );
  }
}

export default SearchBox;
