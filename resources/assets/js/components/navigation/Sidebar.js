import React, { Component } from 'react';
import './../../app.css';

class SideNav extends Component {
    constructor(props){
        super(props);
        this.menuItems = [
            {
                fa:'fa-globe',
                name: 'gist'
            },
            {
                fa:'fa-dashboard', 
                name:'dashboard'
            },
            { 
                fa:'fa-user',
                name:'profile'
            },
            {
                fa:'fa-plus', 
                name:'create-page'
            },
            {
              fa:'fa-file-pdf-o',
              name:'pdfs'
            },
        ];
        this.logout = this.logout.bind(this);
    }
    componentWillMount(){
      this.saveMenuToRemote();
    }
    logout(){
      window.location = "/logout";
    }
    saveMenuToRemote(){ 
      this.props.saveMenuFunction === undefined? '' : this.props.saveMenuFunction(this.menuItems);
    }
    capitalize(theString){
        return theString.charAt(0).toUpperCase() + theString.slice(1)
    } 
    

    spillMenu(){
      return this.menuItems.map((option,index) => {
        return (
          <li className={option.name === $('#home').attr('data-session-page') ? ' side-li side-active ' : 'side-li '} id = { option.name + '-button' } 
          onClick={() => {
              this.switchPage(option.name)
            }} key = { index }> <i className={ 'fa margin-r-10  '+ option.fa }></i>
            { " "+ this.capitalize(option.name) }
          </li>
        );
       });
    }
    switchPage(choicePage){
      this.menuItems.filter(item => choicePage !== item.name ).forEach(itemB =>{
        $('#' + itemB.name + '-button').removeClass('side-active');
      });
      $('#'+ choicePage + '-button').addClass('side-active');
      let currentPage = $('#current-page-box').val();
      if(choicePage === currentPage){} //do nothing 
      else{
        $('#' + currentPage).fadeOut(300, function(){
            $('#' + choicePage).fadeIn(200, function(){
              //if the page the user its attempting to enter is the news page, dont update the box
                if(choicePage ==='gist'){}
                else{
                  $('#current-page-box').val(choicePage);
                }
            });
        });
      }
      if( choicePage ==="gist"){
        $('.side-nav').fadeOut(400);
        $('#nav-bar').fadeIn(200);
      }
      else{
        $('.side-nav').fadeIn(400);
      }
    }
    render() {       
      return (
        <div>
                {/* Hidden current page ID textbox */}
          <input type='hidden' id='current-page-box' value={$('#home').attr('data-session-page')} />
          <div className = 'side-nav-container z-depth-2'> 
          <div className = 'side-nav-profile-box'> 
            <center>
              <img src='/imgs/avatars/nose-mask-avatar.jpg'className='side-profile-pic' />
              <h4 style={{'margin':'3px','cursor':'pointer'}}>
                  { this.props.user ===null ? '...' : this.props.user.name }
                      {/* <i className = 'fa fa-caret-down awesome-margin'></i> */}
              </h4>
            </center>
          </div>
          <div style={{background:'#282828',padding:7,color:'orange'}}> 
            <center>
              <h5 className ="number-font">
                <small style={{color:'cyan'}}>{this.props.user !== null ? this.props.user.course : ''} </small>
                <i className="fa fa-arrow-up" style={{color:'lime'}}></i> 
                  <b> {this.props.userRelations !==null ? this.props.userRelations.reputation.points :''}</b>
              </h5>
            </center>
          </div>
          <div> 
            <ul className = 'side-ul'> 
                {/* <li className = 'side-li'>
                    <i className = 'fa fa-bell' style={{ color:'lime' }}></i> notification <i className ='badge'> 3 </i> 
                </li> */}
              { this.spillMenu() }
              <li className = ' side-li' onClick = {()=>{ this.logout()}} >
                  <i className = 'fa fa-sign-out margin-r-10' style={{ color:'red' }}></i> Logout 
              </li>
            </ul>
          </div>
          </div> 
        </div>
      );
    }
}

export default SideNav;
