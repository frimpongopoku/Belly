import { combineReducers } from 'redux';
import   { userPiecesReducer, authenticatedUserReducer,  }  from './users-reducer'; 
import { saveMenuItemsReducer, notifierReducer,tokenReducer } from './application-reducer';

const allReducers = combineReducers({ 
 	userPieces: userPiecesReducer, 
 	authUser: authenticatedUserReducer, 
 	menuItems: saveMenuItemsReducer, 
 	notification: notifierReducer, 
 	token:tokenReducer
 });

export default allReducers; 