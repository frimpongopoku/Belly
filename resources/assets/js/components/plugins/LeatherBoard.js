import React, { Component } from 'react';
import Card from './LeatherBoardCard';
import $ from 'jquery';
class LeatherBoard extends Component {

  constructor(props){
    super(props);
    this.state={
      honorables:[],
      theRest:[],
      totalNumberOfBallers:0,
      userPosition:null,
      userNumbers:null
    }
    this.grabRankings = this.grabRankings.bind(this);
  }

  componentDidMount() {
    this.grabRankings();
  }
  
  grabRankings(){
    let thisClass = this;
    $.ajax({method:'get',url:'get-rankings'})
    .done(function(response){
      thisClass.setState({
        honorables:response.ballerz.slice(0,3),
        totalNumberOfBallers: response.totalNumber,
        userPosition:response.userPosition,
        userNumbers:response.userNumbers
      });
        if(response.ballerz.length >3){
          thisClass.setState({theRest:response.ballerz.slice(3)});
        }
      $('#l-b-reload').removeClass('l-b-spinner-yellow').removeClass('fa-spin');
      });
  }
  ejectTheRest(){
    if(this.state.theRest !==null){
      var thisClass = this;
      return this.state.theRest.map(function (baller, index) {
        return (
          <Card
            firstName={baller.firstName}
            lastName={baller.lastName}
            id={baller.id}
            position={index + 4}
            numberOfPdfPieces={baller.numberOfPdfPieces}
            numberOfPicturePieces={baller.numberOfPicturePieces}
            numberOfTextPieces={baller.numberOfTextPieces}
            reputationPoints={baller.reputationPoints}
            totalCommentsOnPieces={baller.totalCommentsOnPieces}
            totalLikesOnPieces={baller.totalLikesOnPieces}
            colorClass='l-b-default-left-color'
            totalNumber={thisClass.state.totalNumberOfBallers}
            cardType="type-1"
          />
        );
      });
    }
  }
  ejectHonorables(){
    var thisClass = this;
    return this.state.honorables.map(function(baller,index){
      let honorColors = ['l-b-winner-color','l-b-second-winner-color','l-b-third-winner-color'];
      return( 
        <Card
          firstName={baller.firstName}
          lastName = {baller.lastName}
          id={baller.id} 
          position ={index + 1}
          numberOfPdfPieces = {baller.numberOfPdfPieces}
          numberOfPicturePieces ={baller.numberOfPicturePieces}
          numberOfTextPieces = {baller.numberOfTextPieces}
          reputationPoints = {baller.reputationPoints}
          totalCommentsOnPieces = {baller.totalCommentsOnPieces}
          totalLikesOnPieces  = {baller.totalLikesOnPieces}
          colorClass ={honorColors[index]}
          totalNumber ={thisClass.state.totalNumberOfBallers}
          cardType ="type-1"
          />
      );
      });
  }
  ejectUser(){
    if(this.state.userNumbers !== null ){
      return (
        <Card
          firstName={this.state.userNumbers.firstName}
          lastName={this.state.userNumbers.lastName}
          id={this.state.userNumbers.id}
          position={this.state.userPosition}
          numberOfPdfPieces={this.state.userNumbers.numberOfPdfPieces}
          numberOfPicturePieces={this.state.userNumbers.numberOfPicturePieces}
          numberOfTextPieces={this.state.userNumbers.numberOfTextPieces}
          reputationPoints={this.state.userNumbers.reputationPoints}
          totalCommentsOnPieces={this.state.userNumbers.totalCommentsOnPieces}
          totalLikesOnPieces={this.state.userNumbers.totalLikesOnPieces}
          totalNumber={this.state.totalNumberOfBallers}
          cardType="type-2"
        />
      );
    }
  }
  render() {
    return (
      <div>
        <div className="leather-board leather-curtain-style">
          <div className="col-md-offset-3 col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <center>
                {/* =====================WRITING AREA =============== */}
              <h1 className="l-writings" style={{  color: 'white'}}
                >Hello 
                {this.props.user !==null ? this.props.user.name :''}, 
                these are the 
                <span style={{color:'#FF9800'}}>
                  <b> ballerz</b>
                  </span> in {this.props.user !==null?this.props.user.school.split('-')[0]:''}
                , {this.props.user !== null ? this.props.user.course : ''}
              </h1>
            </center>
            {/* -------------------------------------------------------- */}
            {/* ======================CARDS AREA ==================== */}
           
            {this.ejectUser()}
            <hr/>
            {this.ejectHonorables()}
            {this.ejectTheRest()}

            {/* ------------------------------------------------------- */}
          </div>
            {/* ==================BUTTON AREA================= */}
          <center>
            <button style={{
              color:'black',
              fontSize:'x-large',
              bottom:100,
              right:60,
              position:'fixed',
            }}
              id="l-b-reload" className="see-me raise outline-remove rounded btn-lg btn btn-default"
              onClick={() => { 
                $('#l-b-reload').addClass('l-b-spinner-yellow').addClass('fa-spin');
                setTimeout(() => {
                  this.grabRankings() 
                }, 1000);
                
              }}>
              <i className="fa fa-refresh"></i>
              </button>
            <button style={{
              color:'black',
              fontSize:'x-large',
              bottom:30,
              right:60,
              position:'fixed',
            }}
              id="test-animations" className="see-me raise outline-remove rounded btn-lg btn btn-default"
              onClick={() => { this.props.leatherCurtainUp() }}>
              <i className="fa fa-arrow-up"></i>
              </button>
          </center>
        </div>
      </div>
    );
  }
}

export default LeatherBoard;
