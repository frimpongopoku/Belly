import React from 'react'; 

class NewsPaperModal extends React.Component{


	render(){
		return (
				<div>
					<div className ="modal fade" id="paper-p-1"> 
						<div className = "modal-dialog modal-md" >
							<div className = " modal-content">
								<div className = "modal-header">
									<h1 className = "panel-title">Welcome</h1> 								
								</div>
								<div className = "modal-body"> 
									<center><p> I am a good boy </p></center>
								</div>
								<div className = "modal-footer"> 
									<button className ="btn btn-default" onClick = {(e)=>{e.preventDefault();$('#paper-p-1').modal('toggle')}}>close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default NewsPaperModal;