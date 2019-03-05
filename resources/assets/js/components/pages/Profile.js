import React, { Component } from "react";
import SnackBar from './../plugins/SnackBar';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Profile extends Component {
  constructor(props){
    super(props); 
    this.hostName = window.location.host;
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveNewEdits = this.saveNewEdits.bind(this);
    this.state = {
      dataTrain:{ 
        //name:"", 
       // email:"", 
        phone:"", 
       // university:"", 
        //course:"", 
        hall:""
      }, 
      old:{},
      selectedPicture:null
    }
  }

  compare(){
    let old = this.state.old;
     let successCount = 0; 
      // if ( this.state.dataTrain.name !== old.name){
      //   successCount = successCount + 1; 
      // }
      //   if ( this.state.dataTrain.email !== old.email){
      //   successCount = successCount + 1; 
      // }
     if ( this.state.dataTrain.number !== old.number){
       successCount = successCount + 1; 
     }
      //   if ( this.state.dataTrain.university !== old.university){
      //   successCount = successCount + 1; 
      // }
      //   if ( this.state.dataTrain.course !== old.course){
      //   successCount = successCount + 1; 
      // }
      //   if ( this.state.dataTrain.hall !== old.hall){
      //   successCount = successCount + 1; 
      // }
      if ( this.state.dataTrain.facebook_link !== old.facebook_link){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.linked_in_link !== old.linked_in_link){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.whatsapp_number !== old.whatsapp_number){
       successCount = successCount + 1; 
     }
     
     if ( successCount > 0  ) {
       return "Not Same";
     }
     else{
       return "Same";
     }
  }
  componentDidMount(){
     var thisClass = this; 
     $(document).ready(function(){ 
       
       setTimeout(function(){
         thisClass.setState ({
            old: { 
              //name: thisClass.props.user.name, 
             // email: thisClass.props.user.email, 
              
              //university:thisClass.props.user.school,
              //course: thisClass.props.user.course, 
             // hall:thisClass.props.user.hall,
              phone: thisClass.props.user.phone, 
              facebook_link: thisClass.props.settings.facebook_link, 
              linked_in_link:thisClass.props.settings.linked_in_link, 
              whatsapp_number:thisClass.props.settings.whatsapp_number
            },
            dataTrain:{ 
             // name:thisClass.props.user.name, 
              //email:thisClass.props.user.email, 
             
             // university:thisClass.props.user.school, 
             // course:thisClass.props.user.course, 
             // hall:thisClass.props.user.hall ,
              phone: thisClass.props.user.phone, 
              facebook_link: thisClass.props.settings.facebook_link,
              linked_in_link: thisClass.props.settings.linked_in_link,
              whatsapp_number: thisClass.props.settings.whatsapp_number
            }
          })
        },3000);
    }); 
  }
  handleChange(){
    this.setState({ 
      dataTrain:{
        //name: this.refs.profileName.value, 
       // email: this.refs.profileEmail.value, 
        
        //university:this.refs.profileUniversity.value,
        //course:this.refs.profileCourse.value,
        //hall:this.refs.profileHall.value
        phone: this.refs.profileNumber.value, 
        facebook_link: this.refs.facebookLink.value, 
        linked_in_link:this.refs.linkedInLink.value, 
        whatsapp_number:this.refs.whatsappNumber.value
      }
    })
  }
  saveNewEdits(){
    this.setState({ old: this.state.dataTrain });
    this.props.saveProfileEditsFunction(this.state.dataTrain);
  }

  notify(){
    $('.prof-notifier').fadeIn(300)
  }
  submit(){
    if(this.compare() ==="Not Same"){
      this.notify();
      let thisClass = this;
      setTimeout(function(){
        thisClass.saveNewEdits(); 
      },400);
    }
    else{
      alert("You have not yet made any changes.");
    }
  }


  selection(num){
    switch (num) {
      case 0:
        $('#f-p').css({borderColor:"#e1cd41",opacity:1,borderWidth:4});
        $('#s-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#t-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#fourth-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        break;
      case 1:
        $('#s-p').css({ borderColor: "#e1cd41",opacity:1,borderWidth:4 });
        $('#f-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#t-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#fourth-p').css({ borderColor: "white",opacity:.95,borderWidth:2 });
        break;
      case 2:
        $('#t-p').css({ borderColor: "#e1cd41",opacity:1,borderWidth:4 });
        $('#s-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#f-p').css({ borderColor: "white" ,opacity:.85,borderWidth:2});
        $('#fourth-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        break;
      case 3:
        $('#fourth-p').css({ borderColor: "#e1cd41",opacity:1,borderWidth:4 });
        $('#s-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#t-p').css({ borderColor: "white",opacity:.85,borderWidth:2 });
        $('#f-p').css({ borderColor: "white" ,opacity:.85,borderWidth:2});
        break;
      default:
        break;
    }

  }
  selectPicture(num){
    let imgCollection = ["imgs/avatars/female-avatar.png", "imgs/avatars/hijab-avatar.png", "imgs/avatars/hoodie-avatar.jpg","imgs/avatars/nose-mask-avatar.jpg"];
    let val = imgCollection[num];
    this.selection(Number(num));
    this.setState({selectedPicture:val});
  }

  dbChange(){
    if(this.state.selectedPicture !== null){
      this.props.setProfilePicture(this.state.selectedPicture);
      window.location ="/home";
    }
  }


  render() {
    return (
      <div className = "page-margin"style = {{ marginLeft:0}}>
        <div className = "container" > 
          <div className = "row" > 
            <div className="col-md-10 col-lg-10 "> 
              <div className={this.props.notification === null? ' prof-notifier' : ' s-vanish prof-notifier'} style ={{display:'none'}}>     
                  <SnackBar id ='profile-notifier' color='green' notice ='saving '/>
              </div>
              <div className = "mobile-profile-box pc-vanish-key tablet-vanish-key"> 
                <center>
                  <img style={{marginTop:30}} src={this.props.settings.profile_picture} className="mobile-profile-pic main-prof-pic" />
                </center>
              </div>
              <div id = "first-div-box" className = "mobile-vanish-key tablet-appearance-key pc-appearance-key"> 
                <div className = " thumbnail zero-radius z-depth-1 f-d-card c-m-height" >
                  <center>
                   <h2 className = "black-text profile-name-tag">{ this.props.user.name }</h2>
                  </center>
                  <center>
                    <img src ={this.props.settings.profile_picture}  className = "big-profile-pic main-prof-pic"/>
                  </center>
                </div>
              </div > 
               {/* ===================================== END OF FIRST DIV ===============================*/}
              <div id="second-div-box" className = " clearfix thumbnail z-depth-1 zero-radius f-d-card " style={{background:"navajowhite",color:"black"}}> 
                <div className="col-md-6 col-sm-6 col-xs-12 clearfix">
                  <div className = "pull-left"> 
                      <p className =""><i className = "glyphicon glyphicon-envelope m-right-bit number-font"></i> { this.props.user.email }</p>
                      <p className = "number-font"><i className = "fa fa-phone m-right-bit"></i>  { this.props.user.phone }</p>
                      <p className =""><i className = "fa fa-graduation-cap m-right-bit"></i>{ this.props.user.school.split('-')[1] }</p>
                      <div className="mobile-appearance-key pc-vanish-key tablet-vanish-key">
                        <p className=""><i className="fa  fa-book m-right-bit"></i> {this.props.user.course}</p>
                        <p className=""><i className="fa fa-globe m-right-bit"></i>
                          <i className="number-font"><b>{this.props.userRelations !== null ? this.props.userRelations.numOfPapers + this.props.userRelations.numOfPictures : ''}</b> </i>
                          Publish{this.props.userRelations !==null ? this.props.userRelations.numOfPapers +this.props.userRelations.numOfPictures === 1? '':'es':'es'}
                      </p>
                        <p className="number-font"><i className="fa fa-arrow-up m-right-bit"></i> <b>{this.props.userRelations !== null ? this.props.userRelations.reputation.points : ''}</b> </p>
                      </div>
                    <a className="btn btn-primary z-depth-1 p-r-fix" target="_blank" href={this.state.dataTrain.facebook_link}><i className="fa fa-facebook"></i></a>
                    <a className="btn btn-default z-depth-1 p-r-fix" href={this.state.dataTrain.linked_in_link} target="_blank" ><i className="fa fa-linkedin"></i></a>
                    <button className="btn btn-success z-depth-1 p-r-fix" data-toggle="modal" data-target="#whatsapp-display"><i className="fa fa-whatsapp"></i></button> 
                  </div> 
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 clearfix mobile-vanish-key tablet-appearance-key pc-appearance-key">
                  <div className = "pull-right"> 
                    <p className=""><i className="fa  fa-book m-right-bit"></i> {this.props.user.course}</p>
                    <p className=""><i className="fa fa-globe m-right-bit"></i> 
                      <i className="number-font"><b>{this.props.userRelations !==null? this.props.userRelations.numOfPapers + this.props.userRelations.numOfPictures :''}</b> </i> 
                      Publish{this.props.userRelations !== null ? this.props.userRelations.numOfPapers + this.props.userRelations.numOfPictures === 1 ? '' : 'es' : 'es'}
                    </p>
                      <p className = "number-font"><i className = "fa fa-arrow-up m-right-bit"></i> <b>{this.props.userRelations !==null ? this.props.userRelations.reputation.points:''}</b> </p>
                  </div>
                </div>
              </div> 
               {/* ===================================== END OF SECOND  DIV ===============================*/}
               <div className = "thumbnail clearfix" style={{background:"orangered"}}>
               <input type ="hidden" ref="profile_box" />
                <button className ="btn btn-default pull-right" onClick = {()=>{this.dbChange()}}style={{margin:25}}>Change</button> 
                  <img id="f-p"src= "/imgs/avatars/female-avatar.png" className ="profile-choice-item" onClick ={()=>{this.selectPicture(0)}}/>
                <img id="s-p"src="/imgs/avatars/hijab-avatar.png" className="profile-choice-item" onClick={() => { this.selectPicture(1) }}/>
                <img id="t-p"src="/imgs/avatars/hoodie-avatar.jpg" className="profile-choice-item " onClick={() => { this.selectPicture(2) }}/>
                <img id="fourth-p"src="/imgs/avatars/nose-mask-avatar.jpg" className="profile-choice-item " onClick={() => { this.selectPicture(3) }}/>
                 
               </div>
               <div id ="third-div-box"> 
                <div className = "thumbnail z-depth-1 zero-radius clearfix f-d-card"> 
                   <button className = "btn btn-default pull-right " onClick={()=>{ this.submit() }}> Save </button>
                  <h3>Edit Profile</h3>
                  <form >
                      {/* <div className = "col-md-6  col-sm-6"> 
                        <input ref="profileName" type="text" className = "form-control  phone-textbox-design" 
                        placeholder="Name" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.name }/>
                      </div>
                      <div className = "col-md-6 col-sm-6"> 
                        <input ref="profileEmail" type="email" className = "form-control email phone-textbox-design" 
                        placeholder="email" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.email }/>
                      </div> */}
                    <div className = "col-md-6 col-sm-6"> 
                      <input ref="profileNumber" type="number" className = "form-control number-font number phone-textbox-design" 
                      placeholder="Phone number" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.phone }/>
                    </div>
                      {/* <div className = "col-md-6 col-sm-6"> 
                        <input ref="profileCourse" type="text" className = "form-control course phone-textbox-design" 
                        placeholder="Course" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.course }/>
                      </div>
                      <div className = "col-md-6 col-sm-6"> 
                        <input ref="profileUniversity" type="text" className = "form-control university phone-textbox-design" 
                        placeholder="University" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.university }/>
                      </div> */}
                      {/* <div className = "col-md-6"> 
                        <input ref="profileHall" type="text" className = "form-control hall phone-textbox-design" 
                        placeholder="Hall" onChange={()=>this.handleChange()} value = { this.state.dataTrain.hall } />
                      </div> */}
                     <div className = "col-md-6 col-sm-6"> 
                      <input ref="facebookLink" type="text" className = "form-control facebookLink phone-textbox-design" 
                      placeholder="your facebook link" onChange={()=>this.handleChange()} value = { this.state.dataTrain.facebook_link } />
                    </div>
                     <div className = "col-md-6 col-sm-6"> 
                      <input ref="linkedInLink" type="text" className = "form-control linkedInLink phone-textbox-design" 
                      placeholder="your linked in link" onChange={()=>this.handleChange()} value = { this.state.dataTrain.linked_in_link } />
                    </div>
                     <div className = "col-md-6 col-sm-6"> 
                      <input ref="whatsappNumber" type="text" className = "number-font form-control whatsappNumber phone-textbox-design" 
                      placeholder="your whatsapp number" onChange={()=>this.handleChange()} value = { this.state.dataTrain.whatsapp_number } />
                    </div>
                  </form>
                </div>
              </div>
                  {/* ===================================== END OF THIRD DIV ===============================*/}
            </div>
          </div> 
        </div>
        <div className='modal fade my-depth-1' id="whatsapp-display">
          <div className='modal-dialog modal-sm'>
            <div className='modal-content'>
              <div className='modal-body'> 
                <center> 
                  <small><b>{this.props.user.name}'s</b> whatsapp number </small>
                  <h3 className="number-font black-text">{this.props.settings.whatsapp_number}</h3>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = { 
  saveProfileEditsFunction:PropTypes.func,
  user:PropTypes.object,
  notificaion:PropTypes.array
}
export default Profile;
