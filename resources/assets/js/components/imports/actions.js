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
  getCommentsForPieceAction,
  paginatorTextValuesAction,
  paginatorPicValuesAction,
  getRelationsAction,
  getPdfNewsAction,
  getMorePDFNewsAction,
  deletePDFAction,
  getUserSettingsAction,
  setProfilePictureAction,

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
  paginatorTextValuesAction:paginatorTextValuesAction,
  paginatorPicValuesAction:paginatorPicValuesAction,
  getRelationsAction: getRelationsAction,
  getPdfNewsAction: getPdfNewsAction,
  getMorePDFNewsAction:getMorePDFNewsAction,
  deletePDFAction:deletePDFAction,
  getUserSettingsAction:getUserSettingsAction,
  setProfilePictureAction:setProfilePictureAction,
  
};
export const likeActions = { 
  sendNewLike: newLikeAction
};
export const gistActions ={
  picLikeAction:picLikeAction,
  newLikeAction: newLikeAction,
  getNewsAction: getNewsAction,
  getCommentsForPieceAction:getCommentsForPieceAction,

};