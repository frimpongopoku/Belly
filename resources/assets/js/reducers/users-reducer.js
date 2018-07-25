var initialState = ['Frimpong', 'Akwesi','Opoku','Agyemang'];

const usersReducer =( state =initialState , action )=>{

	switch (action.type) {
		case "LOAD":
			return { ...state , fresh: 'something'}
			break;
		
		default:
			return state ;
			break;
	}

	return state;
}


export default usersReducer;

