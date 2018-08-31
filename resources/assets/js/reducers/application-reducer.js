
export const tokenReducer = (state=null, action) =>{
	if(action.type==="application/GET_TOKEN"){
		return action.payload;
	}

	return state;
}
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
		case "application/NOTIFY":
				return action.payload
			break;
			
		default:
			return state;
			break;
	}

	return state; 
}
