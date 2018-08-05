import { combineReducers } from 'redux';
import   { userPiecesReducer, authenticatedUserReducer,  }  from './users-reducer'; 
import { saveMenuItemsReducer, notifierReducer } from './application-reducer';

const allReducers = combineReducers({ 
 	userPieces: userPiecesReducer, 
 	authUser: authenticatedUserReducer, 
 	menuItems: saveMenuItemsReducer, 
 	notification: notifierReducer
 });

export default allReducers; 