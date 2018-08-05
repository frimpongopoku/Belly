const mechReducer =( state =initialState , action )=>{

	switch (action.type) {
		case "toggle/SNACKBAR":
			return { ...state , 
				: 'something'
			}
			break;
		
		default:
			return state ;
			break;
	}

	return state;
}


export default mechReducer;

