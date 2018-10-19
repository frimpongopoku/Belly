

export const allCoursesReducer = (state = null, action) => {
  switch (action.type) {
    case "user/GET_ALL_COURSES":
      return action.payload
      break;

    default:
      return state
      break;
  }
  return state
}
export const newsFeedReducer = ( state ={texts:[],pics:[],active:false}, action) =>{
  switch (action.type) {
    case "user/LOAD_NEWS":
      return action.payload
      break;
  
    default:
    return state
      break;
  }
  return state
}
export const userPicturePiecesReducer=( state = null, action )=>{
	switch (action.type) {
		case "user/PICTURE_PIECES_GET":
			return action.payload
			break;
		
		default:
			return state
			break;
	}
	return state;
}

export const userPiecesReducer =( state = null , action )=>{
	switch (action.type) {
		case "user/TEXT_PIECES_GET":
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

			return  action.payload === null ? state : action.payload;
		break;
		default:
			return state;
			break;
	}
	return state;
}






