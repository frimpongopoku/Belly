import { 
	saveProfileEditsAction, 
  test,
  deletePicturePieceAction,
  newPicPieceAction,
  getPicPiecesAction,
  getTokenAction,
  editPaperAction, 
	getUserPiecesAction, 
	fetchUserAction, 
	loadUserPiecesAction, 
	createNewPaperAction, 
	saveMenuToRemoteAction, 
  deletePaperPieceAction, 
  getNewsAction, 
  getAllCoursesAction,
  newLikeAction,
  picLikeAction,

} from './../../actions/root-action';


export const appActions = { 
	saveProfileEditsAction: saveProfileEditsAction, 
	test: test, 
  deletePicturePieceAction: deletePicturePieceAction, 
  editPaperAction:editPaperAction,
	newPicPieceAction: newPicPieceAction, 
	getPicPiecesAction: getPicPiecesAction, 
	getTokenAction: getTokenAction, 
	getUserPiecesAction: getUserPiecesAction, 
	fetchUserAction: fetchUserAction, 
	loadUserPiecesAction:loadUserPiecesAction ,
	createNewPaperAction: createNewPaperAction, 
	saveMenuToRemoteAction: saveMenuToRemoteAction, 
  deletePaperPieceAction: deletePaperPieceAction, 
  getNewsAction: getNewsAction, 
  getAllCoursesAction: getAllCoursesAction, 
  
};
export const likeActions = { 
  sendNewLike: newLikeAction
};
export const gistActions ={
  picLikeAction:picLikeAction,
  newLikeAction: newLikeAction,
  getNews: getNewsAction
};