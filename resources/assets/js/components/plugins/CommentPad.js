import React from 'react'; 

class CommentPad extends React.Component{


	render(){
		return (
				<div>
					<div id = "comment-on-piece " className = {' comment-box-initial vanish ' +'js-comment-on-piece-'+this.props.type+'-'+ this.props.id }> 
						<div className = 'triangle' style={{borderBottomColor:'navajowhite', marginLeft:90}}> </div> 
						<div className = 'thumbnail z-depth-1' style={{marginTop:0,padding:15,borderRadius:7,background:'white'}}> 
							<div className = 'write-comment clearfix'> 
								<textarea type ='text' placeholder="Write a comment..." ref= "comment " 
									className = ' comment-box rounded form-control pull-right ' style={{width:'85%'}}>
								</textarea>
								<button className = 'user-badge-comment btn btn-default rounded' style={{ padding:7,fontSize:'1.2rem'}}>@Agyingo</button> 
							</div>
							<hr />
							<div className = ' display-comments'> 
								<ul style={{listStyleType:'none',padding:0}}> 
									<li className = 'comment-item ' style={{padding:5, margin:0}}>
										<small className = "comment-item-text rounded">
											<small className = ' comment-item-title black-text'><b>Frimpong</b> </small> <br/>
											I am going to school
										</small>
										<div className = 'comment-action-div' style={{paddingLeft:15}}>
											<small><i className = ' fa fa-thumbs-up awesome-margin'></i><a href="#" style={{color:'green'}}>Like</a></small> 
											<small>  </small>
											<small><i className = ' fa fa-thumbs-down awesome-margin'></i><a href="#" style={{color:'red'}}>dislike</a></small>
										</div>
									</li>
									<li className = 'comment-item ' style={{padding:5, margin:0}}>
										<small className = "comment-item-text rounded">
											<small className = ' comment-item-title black-text'><b>Finney</b> </small> <br/>
											I am going to school
										</small>
									</li>
									<li className = 'comment-item ' style={{padding:5, margin:0}}>
										<small className = "comment-item-text rounded">
											<small className = ' comment-item-title black-text'><b>Lizzy</b> </small> <br/>
											I am going to school, lorem ipsum aye made be amenhuu bida. And sgoe oficiatm aofica.
										</small>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			);

	}
}
export default CommentPad;