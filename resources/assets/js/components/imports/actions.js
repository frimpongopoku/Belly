import { 
	saveProfileEditsAction, 
	test,deletePicturePieceAction,
	newPicPieceAction,getPicPiecesAction,
	getTokenAction,editPaperAction, 
	getUserPiecesAction, 
	fetchUserAction, 
	loadUserPiecesAction, 
	createNewPaperAction, 
	saveMenuToRemoteAction, 
	deletePaperPieceAction 
} from './../../actions/root-action';


export const appActions = { 
	saveProfileEditsAction: saveProfileEditsAction, 
	test: test, 
	deletePicturePieceAction: deletePicturePieceAction, 
	newPicPieceAction: newPicPieceAction, 
	getPicPiecesAction: getPicPiecesAction, 
	getTokenAction: getTokenAction, 
	getUserPiecesAction: getUserPiecesAction, 
	fetchUserAction: fetchUserAction, 
	loadUserPiecesAction:loadUserPiecesAction ,
	createNewPaperAction: createNewPaperAction, 
	saveMenuToRemoteAction: saveMenuToRemoteAction, 
	deletePaperPieceAction: deletePaperPieceAction
};