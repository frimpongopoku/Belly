const authenticatedUser = (state=null , action ) =>{ 


	switch (action.type) {
		case "user/AUTHENTICATED":
			console.log(' I am response in redu: ', action.payload);
			return {  action.payload} ;
			break;
		
		default:
			return state;
			break;
	}
	
	return state;

}

export default authenticatedUser;

