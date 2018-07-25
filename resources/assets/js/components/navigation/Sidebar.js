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
                fa:'fa-signout', 
                name:'logout'
            }
        ];
        
    }

    capitalize(theString){
        return theString.charAt(0).toUpperCase() + theString.slice(1)
    }

    spillMenu(){
        return this.menuItems.map((option,index) => {
            return (
                <li className={option.name === 'dashboard' ? ' side-li side-active ' : 'side-li '} id = { option.name + '-button' } onClick={() => {
                    this.switchPage(option.name)
                }} key = { index }> <i className={ 'fa '+ option.fa }></i>
                { " "+ this.capitalize(option.name) }</li>
            );
        });
    }
    switchPage(choicePage){
        this.menuItems.filter(item => choicePage !== item.name ).forEach(itemB =>{
            $('#' + itemB.name + '-button').removeClass('side-active');
        });
        $('#' + choicePage + '-button').addClass('side-active');
        
        let currentPage = $('#current-page-box').val();
        if(choicePage === currentPage){ //do nothing 
        }else{
            $('#' + currentPage).fadeOut(300, function () {
                $('#' + choicePage).fadeIn(200, function () {
                    $('#current-page-box').val(choicePage);
                });
            });
        }
      
      
    }
    render() {       
        return (
            <div>
                    {/* Hidden current page ID textbox */}
                    <input type='hidden' id ='current-page-box' value='dashboard' />
                <div className = 'side-nav-container z-depth-2'> 
                <div className = 'side-nav-profile-box'> 
                    <center>
                      <img src='/imgs/avatars/nose-mask-avatar.jpg'className='side-profile-pic' />
                      <h4 style={{'margin':'3px','cursor':'pointer'}}>Frimpong <i className = 'fa fa-caret-down'></i></h4>
                    </center>
                </div>
                <div> 
                    <ul className = 'side-ul'> 
                            { this.spillMenu() }
                    </ul>
                </div>
                </div>
                
            </div>
        );
    }
}

export default SideNav;
