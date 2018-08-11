import $ from 'jquery';
import { initialState } from './../reducers/dummy';


export const test = ()=>{
	console.log(" I have been called upon!");
	return notifierAction('new shit!');
}

export const getTokenAction = ()=>{
	return dispatch=>{
		$.ajax({
			method:'get',
			url:'/me/get-token'
		}).done(response =>{
			console.log("I am the token nigga:",response);
			dispatch({type:"application/GET_TOKEN", payload:response })
		})
	}
}

export const editPaper = (newData,oldPieces) =>{
	//find the piece that is to be edited from the whole bunch, 
	//insert the edits into the isolated piece, 
	//now remove the outdated piece from the whole bunch
	//now create a new object that would be stored in the state and add the updated version of the piece
	let oldData = oldPieces.find(piece => newData.id === piece.id ); 
	let latestData = { ...oldData, title:newData.title, body: newData.body };
	let newTrain = oldPieces.filter( piece =>{
		return piece.id !== newData.id
	})
	let newState =[latestData,...newTrain];
	return newState;
}

export const addPaper = (dataTrain,oldPieces) =>{
	var old = oldPieces.slice(0,5);//This will make sure to written only 5 elements + the new one so It will much my pagination
	let newState = [dataTrain,...old]; 
	return newState;
}
export const delPaper = (id, oldPieces) =>{
	var filtered = oldPieces.filter( piece =>{
			return piece.id !==id
	});
	return filtered;
}
export const editPaperAction = (newData,oldPieces)=>{
	return dispatch =>{
		dispatch(dBEditPaper(newData));
		dispatch(loadUserPiecesAction(editPaper(newData,oldPieces)));
	}
}
export const deletePaperPieceAction = (id,oldPieces) =>{
	//get the oldState(array) for the pieces in the store as a parameter
	//remove items from the store and then load the rest back in to the store.
	return dispatch =>{
		dispatch(dBDelete(id)); 
		dispatch(loadUserPiecesAction(delPaper(id,oldPieces)));
	}
}

export const dBEditPaper =(newData)=>{
	return dispatch =>{
		$.ajax({
			method:'get',
			url:'/me/edit-piece/', 
			data:{...newData}
		}).done(response =>{
			console.log("Updated done from behind toooo!");
			//put some notification here, but for now.....
		})
	}
}
export const dBDelete = (id) =>{
	return dispatch=>{
		$.ajax({
			method:'get',
			url:'/me/delete-paper/'+id
		}).done(response =>{
			//put some notification handler out here... but for now, just log some shit 
			console.log("Your paper has been deleted from the database!");
		});
	}
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
			url:'/me/save-text-piece',
			data:{ name: dataTrain.owner, body: dataTrain.body, user_id: dataTrain.owner_id, title: dataTrain.title }
		}).done( response => {
			if( response === "True" ){
				setTimeout(function(){
					dispatch(notifierAction(dataTrain.title));
				},2000)
				
			}
		});
	};
};            

export const notifierAction = (data)=>{ 
	return({type:'application/PIECE_DB_SAVE',payload:data})
}
export const getUserPiecesAction = ()=>{
	return dispatch =>{
		$.ajax({
			method:'get',
			url:'/me/get-all-papers'
		}).done( response =>{
			dispatch(loadUserPiecesAction(response.data))
		});
	}
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
			url:'/me/get-auth-user'
		}).done( response =>{ 
				dispatch(saveAuthenticatedUserAction(response));
		});
	}
}


