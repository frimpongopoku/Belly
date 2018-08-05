

export const saveMenuItemsReducer = (state=null, action)=>{
	if(action.type ==="application/SAVE_MENU"){
		return action.payload;
	}else{
		return state; 
	}
	return state;
};

export const notifierReducer = (state = null, action )=>{
	switch (action.type) {
		case "application/PIECE_DB_SAVE":
				return action.payload
			break;
			
		default:
			return state;
			break;
	}

	return state; 
}
