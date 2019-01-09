import $ from 'jquery';
import { initialState } from './../reducers/dummy';



export const setProfilePictureAction=(picture_link)=>{
  return dispatch=>{
    $.ajax({method:'get',url:'change-profile',data:{picture_link:picture_link}})
    .done(function(){
       dispatch(getUserSettingsAction());
    })
  }
}
export const deletePDFAction =(id) =>{
  return dispatch =>{
    $.ajax({ method: 'get', url: '/delete-pdf/' + id });
  }
}
export const getUserSettingsAction=() =>{
  return dispatch => {
    $.ajax({ method: 'get', url: '/get-settings'})
      .done((response) => {
        dispatch(loadUserSettings(response));
      });
  }
}
export const getPdfNewsAction=(point) =>{
  return dispatch => {
    $.ajax({ method: 'get', url: '/get-pdf-news/'+point })
      .done((response) => {
        dispatch(loadPdfNews(response));
      });
  }
}

export const getMorePDFNewsAction=(oldTrain,point)=>{
  return dispatch => {
    $.ajax({ method: 'get', url: '/get-pdf-news/' + point })
      .done((response) => {
        if(response.length !== 0 ){
           let newSet = [...oldTrain,...response]
            dispatch(loadPdfNews(newSet));
        }
      });
  }
}
const loadPdfNews = (dataTrain)=>{
  return {type:'user/GET_PDF_NEWS',payload:dataTrain};
}
export const getRelationsAction =()=>{
  return dispatch=>{
    $.ajax({method:'get',url:'/get-user-relations'})
    .done((response)=>{
      dispatch(loadRelations(response));
    });
  }
}
export const loadRelations= (dataTrain)=>{
  return { type:"user/GET_RELATIONS",payload:dataTrain};
}
export const loadUserSettings= (dataTrain)=>{
  return { type:"user/GET_SETTINGS",payload:dataTrain};
}

export const getCommentsForPieceAction=(id,type) =>{
  return dispatch=>{
    $.ajax({method:'get',url:'/me/get-comments/'+id+"/"+type})
    .done((response)=>{
        dispatch(loadCurrentComment(response));
    });
  }
}

export const loadCurrentComment = (dataTrain)=>{
  return{ type:"user/PIECE_COMMENT_GET", payload:dataTrain};
}
export const picLikeAction =(miniTrain, allNews)=>{
  return dispatch => {
    $.ajax({ method: "get", url: "/me/picture-like", data: miniTrain })
      .done((response) => {
        let newState = { news: [], badgeNumber:null, active: true };
        allNews.news.forEach(function (picNews) {
          if (picNews.id === response.id && picNews.file_type === response.file_type) {
            picNews.likes = response.likes;
          }
          newState.news.push(picNews);
        });
        //you gotta bring the badge number here too
        dispatch(loadNewsPiecesAction(newState));
        dispatch(getRelationsAction());
      });
  }
}
export const newLikeAction = (miniTrain,allNews) =>{
    return dispatch =>{
      $.ajax({method:"get",url:"/me/like",data:miniTrain})
      .done((response)=>{ 
        let newState ={news:[],badgeNumber:null,active:true};
        allNews.news.forEach(function(textNews){
          if(textNews.id === response.id && textNews.file_type === response.file_type){
            textNews.likes = response.likes;
          }
          newState.news.push(textNews);
        });
        dispatch(loadNewsPiecesAction(newState));
        dispatch(getRelationsAction());
      });
    }
}

export const getAllCoursesAction = () =>{
  return dispatch=>{
    $.ajax({ method:'get',url:'/me/get-all-courses'})
    .done(response =>{
      dispatch({type:"user/GET_ALL_COURSES", payload:response});
    });
  }
}
export const getNewsAction =(point,oldNews)=>{
  return dispatch=>{
    $.ajax({method:'get',url:'/me/get-news/'+point})
    .done((data)=>{
      if(data.news.length === 0){
        dispatch(loadNewsPiecesAction(oldNews));
      }
      else{
        let fNews = oldNews !==null? oldNews.news : [];
        let finishedState ={ news:[...fNews,...data.news],active:data.active, badgeNumber:data.setNumber};
        dispatch(loadNewsPiecesAction(finishedState));
      }
    });
  }
}
export const loadNewsPiecesAction =(dataTrain) =>{
  //this fxn has access to the portion in the store, so you can pass anykinda data to the store to represent news.. 
  //this fxn is just the link, otherFxnsLikethisInclude: loadUserPieces,loadUserPicPieces
  return { type: "user/LOAD_NEWS",payload:dataTrain};
}
export const saveProfileEditsAction = (dataTrain)=>{
	return dispatch =>{ 
    $.ajax({ method:"get",	url:"/me/save-profile-edits",	data: dataTrain})
    .done(response=>{ 
      dispatch(saveAuthenticatedUserAction(response.user));
      dispatch(loadUserSettings(response.settings));
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
    $.ajax({	method:'get',url:'/me/delete-pic-item-'+id})
    .done(response=>{
		}); 
	}
	//what if something happens and it doesnt save.... Well, I wil be back 
}
export const newPicPieceAction =( newData,oldPieces)=>{
	//new dataTrain contains the newName, id, and other details of the 'just' uploaded file... 
	//so get it , and check if oldPics is up to othe pagination number which is "6" for now
	//if its not up to, just add it, if it is already up to, replace the new data with one... 
	let newDataSet = oldPieces.length === 6 ? oldPieces.slice(0,5) : oldPieces; 
	return dispatch=>{
		dispatch(loadPicsPiecesAction([newData, ...newDataSet]));
	}
}

export const getPicPiecesAction =()=>{
	return dispatch =>{
    $.ajax({method:'get',	url:'/me/get-all-pic-papers'})
    .done(response =>{
			dispatch(loadPicsPiecesAction(response.data));
		});
	}
}
export const paginatorPicValuesAction = (data) => {
  return dispatch => {
    dispatch(loadPicsPiecesAction(data));
  }
};

export const loadPicsPiecesAction =(newDataTrain)=>{
	return {type:'user/PICTURE_PIECES_GET', payload:newDataTrain};
}

export const test = ()=>{
	console.log(" I have been called upon!");
	return notifierAction('new shit!');
}

export const getTokenAction = ()=>{
	return dispatch=>{
    $.ajax({method:'get',url:'/me/get-token'})
    .done(response =>{
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
    $.ajax({method:'get',url:'/me/edit-piece/', data:{...newData}})
    .done(response =>{
			
			//put some notification here, but for now.....
		})
	}
}
export const dBDelete = (id) =>{
	return dispatch=>{
    $.ajax({method:'get',url:'/me/delete-paper/'+id})
    .done(response =>{
			//put some notification handler out here... but for now, just log some shit 
		
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
    $.ajax({method:'get',url:'/me/save-text-piece',data:{ name: dataTrain.name,course: dataTrain.course, body: dataTrain.body, user_id: dataTrain.user_id, title: dataTrain.title }})
    .done( response => {
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
export const paginatorTextValuesAction = (data) =>{
  return dispatch =>{
    dispatch(loadUserPiecesAction(data));
  }
};

export const getUserPiecesAction = ()=>{
	return dispatch =>{
    $.ajax({method:'get',url:'/me/get-all-text-papers'})
    .done( response =>{
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
    $.ajax({method:'get',url:'/me/get-auth-user'})
    .done( response =>{ 
				dispatch(saveAuthenticatedUserAction(response));
		});
	}
}


