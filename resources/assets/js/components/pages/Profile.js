import React, { Component } from "react";
import SnackBar from './../Plugins/SnackBar';

class Profile extends Component {
  constructor(props){
    super(props); 
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveNewEdits = this.saveNewEdits.bind(this);
    this.state = {
      dataTrain:{ name:"", email:"", number:"", university:"", course:"", hall:""}, 
      old:{}
    }
  }

  compare(){
    let old = this.state.old;
     let successCount = 0; 
     if ( this.state.dataTrain.name !== old.name){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.email !== old.email){
       successCount = successCount + 1; 
     }
     if ( this.state.dataTrain.number !== old.number){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.university !== old.university){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.course !== old.course){
       successCount = successCount + 1; 
     }
      if ( this.state.dataTrain.hall !== old.hall){
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
              name: thisClass.props.user.name, 
              email: thisClass.props.user.email, 
              number:thisClass.props.user.phone, 
              university:thisClass.props.user.school,
              course: thisClass.props.user.course, 
              hall:thisClass.props.user.hall
            },
            dataTrain:{ 
              name:thisClass.props.user.name, 
              email:thisClass.props.user.email, 
              number:thisClass.props.user.phone, 
              university:thisClass.props.user.school, 
              course:thisClass.props.user.course, 
              hall:thisClass.props.user.hall 
            }
          })
        },3000);
    }); 
  }
  handleChange(){
    this.setState({ 
      dataTrain:{
        name: this.refs.profileName.value, 
        email: this.refs.profileEmail.value, 
        number: this.refs.profileNumber.value, 
        university:this.refs.profileUniversity.value,
        course:this.refs.profileCourse.value,
        hall:this.refs.profileHall.value
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
      alert("LOOOL! You aint changes shit!")
    }
  }

  render() {
    return (
      <div className = "page-margin"style = {{ marginLeft:0}}>
        <div className = "container" > 
          <div className = "row" > 
            <div className="col-md-10 col-lg-10 col-md-offset-2 col-lg-offset-2"> 
              <div className={this.props.notification === null? ' prof-notifier' : ' s-vanish prof-notifier'} style ={{display:'none'}}>     
                  <SnackBar id ='profile-notifier' color='green' notice ='saving '/>
              </div>
              <div id = "first-div-box"> 
                <div className = " thumbnail zero-radius z-depth-1 f-d-card c-m-height" >
                  <center>
                   <h2 className = "devil profile-name-tag">{ this.props.user.name }</h2>
                  </center>
                  <center>
                      <img src ="imgs/avatars/nose-mask-avatar.jpg" className = "big-profile-pic"/>
                  </center>
                </div>
              </div > 
               {/* ===================================== END OF FIRST DIV ===============================*/}
              <div id="second-div-box" className = " clearfix thumbnail z-depth-1 zero-radius f-d-card "> 
                <div className = "pull-left"> 
                    <p className =""><i className = "fa fa-envelope m-right-bit"></i> { this.props.user.email }</p>
                    <p className = "number-font"><i className = "fa fa-phone m-right-bit"></i>  { this.props.user.phone }</p>
                    <p className =""><i className = "fa fa-graduation-cap m-right-bit"></i>{ this.props.user.school }</p>
                    <p className =""><i className = "fa  fa-book m-right-bit"></i> { this.props.user.course }</p>
                    <p className =""><i className = "fa fa-globe m-right-bit"></i> <i className = "number-font">400</i> Plubishes </p>
                    <a className ="btn btn-primary p-r-fix zero-radius"><i className = 'fa fa-facebook'></i></a> 
                    <a className ="btn btn-info p-r-fix zero-radius"><i className = 'fa fa-linkedin'></i></a> 
                    <a className ="btn btn-success p-r-fix zero-radius"><i className = 'fa fa-whatsapp'></i></a> 
                </div> 
                <div className = "pull-right"> 
                   <p className =""><i className = "fa  fa-home m-right-bit"></i> { this.props.user.hall }</p>
                    <p className =""><i className = "fa fa-hand-grab-o m-right-bit"></i> <i className = 'number-font'> 50 </i> Grabs</p>
                    <p className = "number-font"><i className = "fa fa-hand-lizard-o m-right-bit"></i> 30  Grabbed</p>
                    <p className = "number-font"><i className = "fa fa-money m-right-bit"></i> 100 </p>
                </div>
              </div> 
               {/* ===================================== END OF SECOND  DIV ===============================*/}
               <div id ="third-div-box"> 
                <div className = "thumbnail z-depth-1 zero-radius clearfix f-d-card"> 
                   <button className = "btn btn-default pull-right z-depth-1" onClick={()=>{ this.submit() }}> Save </button>
                  <h3>Edit Profile</h3>
                  <form >
                    <div className = "col-md-6"> 
                      <input ref="profileName" type="text" className = "form-control  phone-textbox-design" 
                      placeholder="Name" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.name }/>
                    </div>
                    <div className = "col-md-6"> 
                      <input ref="profileEmail" type="email" className = "form-control email phone-textbox-design" 
                      placeholder="email" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.email }/>
                    </div>
                    <div className = "col-md-6"> 
                      <input ref="profileNumber" type="number" className = "form-control number-font number phone-textbox-design" 
                      placeholder="Whatsapp number" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.number }/>
                    </div>
                    <div className = "col-md-6"> 
                      <input ref="profileCourse" type="text" className = "form-control course phone-textbox-design" 
                      placeholder="Course" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.course }/>
                    </div>
                    <div className = "col-md-6"> 
                      <input ref="profileUniversity" type="text" className = "form-control university phone-textbox-design" 
                      placeholder="University" onChange={()=>this.handleChange()} value ={ this.state.dataTrain.university }/>
                    </div>
                     <div className = "col-md-6"> 
                      <input ref="profileHall" type="text" className = "form-control hall phone-textbox-design" 
                      placeholder="Hall" onChange={()=>this.handleChange()} value = { this.state.dataTrain.hall } />
                    </div>
                  </form>
                </div>
              </div>
                  {/* ===================================== END OF THIRD DIV ===============================*/}
            </div>
          </div> 
        </div>
      </div>
    );
  }
}
export default Profile;
