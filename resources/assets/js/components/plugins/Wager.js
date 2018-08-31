import React from 'react'; 

//Rename your class 
class Wager extends React.Component{


	render(){
		return (
				<div>
					<div className = "thumbnail p-black-color zero-radius z-depth-1 rating-belt clearfix vanish" style={{padding:"0px 50px"}} > 
               <h3 >
                 <span className = " p-r-fix pull-right confidence-level number-font ">
                   60%<br/>
                   <small className = ' font-small text text-muted'>CONFIDENCE</small>
                 </span>
               </h3>
               <h1 className = "angel clearfix"> 
                
                 <span className="p-r-fix">
                   <i className="fa fa-tint tint-focus"></i> <span className = ' number-font'>560</span>
                 </span>
                 <span style ={{marginLeft:10}}>
                   <i className="fa fa-arrow-down " style={{  color:'crimson'}}></i>
                   <span className = ' number-font' > 50 </span>
                 </span>
               </h1>
            </div>
				</div>
			);

	}
}
//remember to export your class
export default Wager;