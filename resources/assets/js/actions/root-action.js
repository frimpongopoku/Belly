import $ from 'jquery';
import { initialState } from './../reducers/dummy';


export const saveProfileEditsAction = (dataTrain)=>{
	//console.log("I am th etrain in saveProfileEdits : ", dataTrain);
	return dispatch =>{ 
		$.ajax({ 
			method:"get", 
			url:"/me/save-profile-edits", 
			data: dataTrain
		}).done(user=>{ 
			dispatch(saveAuthenticatedUserAction(user));
			dispatch( notifierAction("Profile Saved"));
		});
	}
}
export const deletePicturePieceAction =(id,allPieces)=>{
	let filtered = allPieces.filter(item=>{
		return item.id !=id;
	}); 
	return dispatch=>{
		dispatch(deleteDBPic(id));
		dispatch(loadPicsPiecesAction(filtered))
	}   
}

export const deleteDBPic = (id) =>{
	return dispatch =>{ 
		$.ajax({
			method:'get',
			url:'/me/delete-pic-item-'+id
		}).done(response=>{
			console.log("Your Image has been deleted nigga!!");
		}); 
	}
	//what if something happens and it doesnt save.... Well, I wil be back 
}
export const newPicPieceAction =( newData,oldPieces)=>{
	//new dataTrain contains the newName, id, and other details of the 'just' uploaded file... 
	//so get it , and check if oldPics is up to othe pagination number which is "6" for now
	//if its not up to, just add it, if it is already up to, replace the new data with one... 
	console.log("I am all the picture pieces in newAction:", oldPieces);
	let newDataSet = oldPieces.length === 6 ? oldPieces.slice(0,5) : oldPieces; 
	return dispatch=>{
		dispatch(loadPicsPiecesAction([newData, ...newDataSet]));
	}
}

export const getPicPiecesAction =()=>{
	return dispatch =>{
		$.ajax({
			method:'get',
			url:'/me/get-all-pic-papers'
		}).done(response =>{
			dispatch(loadPicsPiecesAction(response.data));
		});
	}
}
export const loadPicsPiecesAction =(newDataTrain)=>{
	return {type:'user/PICTURE_PIECES_GET', payload:newDataTrain};
}

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
	var old = oldPieces.length === 6 ? oldPieces.slice(0,5) : oldPieces ;//This will make sure to written only 5 elements + the new one so It will much my pagination
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
	return({type:'application/NOTIFY',payload:data})
}
export const getUserPiecesAction = ()=>{
	return dispatch =>{
		$.ajax({
			method:'get',
			url:'/me/get-all-text-papers'
		}).done( response =>{
			dispatch(loadUserPiecesAction(response.data))
		});
	}
}

export const loadUserPiecesAction =(newDataTrain)=>{
	//this action's sole fxn is to pass data on to the txtreducer part in the store >> it has direct access
	return ({ type:'user/TEXT_PIECES_GET', payload:newDataTrain ===null ? initialState : newDataTrain });
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


