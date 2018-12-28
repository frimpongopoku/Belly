import React from 'react'; 

class CommentPad extends React.Component{

    constructor(props){
      super(props); 
      this.ejectComments = this.ejectComments.bind(this);
    }
  ejectComments(){
   if(this.props.myComments !== null || this.props.myComments !==undefined){
      return this.props.myComments.map(function(item,index){
        return (
          <li key ={index}className='comment-item ' style={{ padding: 5, margin: 0 }}>
            <small className="comment-item-text rounded">
              <small className=' comment-item-title black-text'><b>Frimpong</b> </small> <br />
              {item.body}
                        </small>
              {/* <div className='comment-action-div' style={{ paddingLeft: 15 }}>
                <small><i className=' fa fa-thumbs-up awesome-margin'></i><a href="#" style={{ color: 'green' }}>Like</a></small>
                <small>  </small>
                <small><i className=' fa fa-thumbs-down awesome-margin'></i><a href="#" style={{ color: 'red' }}>dislike</a></small>
              </div> */}
          </li>
        );
      });
    }
  }
  doComment(){
    JSON.stringify(this.props.myComments);
  }

  doComment(){
    alert("Spaces");
  }
	render(){
    console.log("I am thecomments:::   ",this.props.myComments)
		return (
      <div>
        <div id = "comment-on-piece " className = {' comment-box-initial vanish ' +'js-comment-on-piece-'+this.props.type+'-'+ this.props.id }> 
          <div className = 'triangle' style={{borderBottomColor:'navajowhite', marginLeft:90}}> </div> 
          <div className = 'thumbnail z-depth-1' 
          style={{marginTop:0,padding:15,borderRadius:7,
                background:'white',maxHeight:320,minHeight:320,overflowY:"scroll",width:"60rem"}}> 
            <div className = 'write-comment clearfix'> 
              <form onSubmit = {(e)=>{e.preventDefault();this.doComment()}}>
                <button className='user-badge-comment btn btn-default rounded pull-right' 
                style={{ padding: 7, fontSize: '1.2rem' }}>@Agyingo</button> 
              <textarea type ='text' placeholder="Write a comment..." ref= "comment " 
                className = ' comment-box rounded form-control  ' style={{width:'85%'}}>
              </textarea>
            </form>
              
            </div>
            <hr />
            <div className = ' display-comments'> 
              <ul style={{listStyleType:'none',padding:0}}> 
           
              </ul>
            </div>
          </div>
        </div>
      </div>
			);

	}
}
export default CommentPad;