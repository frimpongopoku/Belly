import React from 'react'; 

class PageSwitcher extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      lp: null,
      moreContent: { current_page: 1 },
      moreData: null
    }
    this.fillState = this.fillState.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.handleGoTo = this.handleGoTo.bind(this)
  }

  componentDidMount(){
    this.fetchData();
  }
  fillState(newDataTrain) {
    console.log(newDataTrain);
    this.props.values(newDataTrain.data);
    this.setState({ items: newDataTrain })
  }
  dataFinder(url, method, func) {
    //func = any function to do something with the response
    $.ajax({ method: method, url: url })
      .done(function (response) {
        func(response);
    });
  }
  shakeRight(){
    $(this.props.animateDiv).css({ transform: "rotateZ(5deg)", transition: ".2s ease-in-out all" });
    setTimeout(() => {
      $(this.props.animateDiv).css({ transform: "rotateZ(0deg)", transition: ".2s ease-in-out all" });
    }, 200);
  }
  shakeLeft() {
    $(this.props.animateDiv).css({ transform: "rotateZ(-5deg)", transition: ".2s ease-in-out all" });
    setTimeout(() => {
      $(this.props.animateDiv).css({ transform: "rotateZ(0deg)", transition: ".2s ease-in-out all" });
    }, 200);
  }
  nextPage() {
    if (this.state.items.next_page_url !== null) {
      console.log("I am the new Page:::: ");
      this.dataFinder(this.state.items.next_page_url, 'get', this.fillState);
    } else {
      console.log("I am the new Page:::: ");
      this.dataFinder(this.state.items.first_page_url, 'get', this.fillState);
    }
  }
  previousPage() {
    if (this.state.items.prev_page_url !== null) {
      console.log("I am the prev Page:::: ");
      this.dataFinder(this.state.items.prev_page_url, 'get', this.fillState);
    } else {
      console.log("I am the prev Page:::: ");
      this.dataFinder(this.state.items.last_page_url, 'get', this.fillState);
    }
  }
  fetchData() {
    let thisClass = this;
    $.ajax({
      method: 'get',
      url: this.props.baseURL
    }).done(function (response) {
      
     
      console.log("I am the response: ", response);
      thisClass.setState({ lp: response.last_page,items:response })
    });
  }
  goToPage(number) {
    let thisClass = this;
    $.ajax({ method: 'get', url: this.state.items.path + '?page=' + number })
      .done(function (response) {
        thisClass.fillState(response);
      });
  }
  handleGoTo() {
    if (this.refs._goBox.value !== "") {
      if (this.refs._goBox.value > this.state.lp || this.refs._goBox.value < 1) { }
      else {
        this.goToPage(this.refs._goBox.value);
      }
    }
    else {
      console.log("Please input a correct page value!")
    }
  }
  mainCheck(){
    if (this.state.items !== null) {
      if (this.state.items.total > this.state.items.per_page) {
        return (
          <div style={{ marginBottom: 10, padding: "auto 20px" }} id={this.props.unique}>
            <div className="" style={{ margin: 5 }}>
              <button className="btn btn-default black-text" style={{ marginRight: 5 }}
                onClick={() => { this.previousPage(); this.shakeLeft(); }}
              >
                <i className="fa fa-backward"></i>
              </button>
              <button className="btn btn-default black-text" style={{ marginRight: 5 }}
                onClick={() => { this.nextPage(); this.shakeRight(); }}
              >
                <i className="fa fa-forward"></i>
              </button>
              <small style={{ margin: 5 }}><b>Page</b></small>
              <input type='number' max={this.state.items === null ? 4 : this.state.items.lp}
                defaultValue={this.state.moreContent.current_page} ref="_goBox"
                style={{ borderRadius: 5, width: "5%", padding: 5, marginRight: 5, textAlign: 'center' }} />
              <button className="btn btn-default black-text" onClick={() => { this.handleGoTo() }}>Go</button>
              <small style={{ marginLeft: 15 }}>
                <span style={{ marginRight: 5 }} className="number-font">
                  <b>{this.state.items !== null ? this.state.items.total : 0}</b>
                </span>
                <span style={{ marginRight: 15 }}> {this.props.type} pieces by you   </span>
                <span className="text text-danger"><b>Page <span className="number-font ">
                  {this.state.items !== null ? this.state.items.current_page : 0} / {this.state.lp}</span></b></span>
              </small>
            </div>
          </div>
        );
      }
    }
   
  }
	render(){
    return(<div>
      {this.mainCheck()}
    </div>); 
	}
}
export default PageSwitcher;