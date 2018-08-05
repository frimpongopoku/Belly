

export const userPiecesReducer =( state = null , action )=>{
	switch (action.type) {
		case "user/PIECESLOAD":
			return action.payload
			break;
				
		default:
			return state ;
			break;
	}
	return state;
}


export const authenticatedUserReducer = (state=null, action ) =>{ 
	switch (action.type) {
		case "user/AUTHENTICATED":

			return  action.payload ===null ? state : action.payload;
		break;
		default:
			return state;
			break;
	}
	return state;
}






