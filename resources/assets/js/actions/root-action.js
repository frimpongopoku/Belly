import $ from 'jquery';
import { initialState } from './../reducers/dummy';

export const addPaper = (dataTrain,oldPieces) =>{
	let newState = [...state,dataTrain]; 
	return newState;
}
export const delPaper = (id, oldPieces) =>{
	var filtered = oldPieces.filter( piece =>{
		piece.id !==id
	});
	return filtered;
}
export const deletePaperPieceAction = (id,oldPieces) =>{
	//get the oldState(array) for the pieces in the store as a parameter
	//remove items from the store and then load the rest back in to the store.
	return dispatch =>{
		dispatch(dBDelete(id)); 
		dispatch(loadUserPiecesAction(delPaper(id,oldPieces)))
	}

}

export const dBDelete = (id) =>{

}
export const saveMenuToRemoteAction = (menuItems) =>{
	return ({type:'application/SAVE_MENU',payload: menuItems});
}
export const createNewPaperAction = (dataObj, oldPieces) =>{ 

	return dispatch => { 
		dispatch(dBSaveAction(dataObj));
		dispatch(loadUserPiecesAction(addPaper(dataObj,oldPieces)))
	};
};

export const dBSaveAction = (dataTrain) =>{
	return dispatch => {
		$.ajax({
			method:'get',
			url:'/save-text-piece',
			data:{ name: dataTrain.owner, body: dataTrain.body, user_id: dataTrain.owner_id, title: dataTrain.title}
		}).done( response => {
			if( response === "True" ){
				dispatch(notifierAction(dataTrain));
			}
		});
	};
};            

export const notifierAction = (dataTrain)=>{ 
	return({type:'application/PIECE_DB_SAVE',payload:dataTrain.title})
}

export const loadUserPiecesAction =(newDataTrain)=>{
	return ({ type:'user/PIECESLOAD', payload:newDataTrain ===null ? initialState : newDataTrain });
};

export const saveAuthenticatedUserAction = ( user )=> { 
		return({ type:'user/AUTHENTICATED', payload:user });
};

export const fetchUserAction = ()=> { 
	return dispatch =>{
		$.ajax({
			method:'get',
			url:'/get-auth-user'
		}).done( response =>{ 
				dispatch(saveAuthenticatedUserAction(response));
		});
	}

}


