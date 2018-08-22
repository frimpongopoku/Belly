import { combineReducers } from 'redux';
import   { userPiecesReducer, authenticatedUserReducer, userPicturePiecesReducer }  from './users-reducer'; 
import { saveMenuItemsReducer, notifierReducer,tokenReducer } from './application-reducer';

const allReducers = combineReducers({ 
 	textPieces: userPiecesReducer, 
 	picturePieces:userPicturePiecesReducer,
 	authUser: authenticatedUserReducer, 
 	menuItems: saveMenuItemsReducer, 
 	notification: notifierReducer, 
 	token:tokenReducer
 });

export default allReducers; 