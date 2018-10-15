import { combineReducers } from 'redux';
import   { userPiecesReducer, allCoursesReducer,authenticatedUserReducer, userPicturePiecesReducer,newsFeedReducer }  from './users-reducer'; 
import { saveMenuItemsReducer, notifierReducer,tokenReducer} from './application-reducer';

const allReducers = combineReducers({ 
 	textPieces: userPiecesReducer, 
 	picturePieces:userPicturePiecesReducer,
 	authUser: authenticatedUserReducer, 
 	menuItems: saveMenuItemsReducer, 
  notification: notifierReducer, 
  newsFeed:newsFeedReducer, 
  token:tokenReducer, 
  allCourses: allCoursesReducer
 });

export default allReducers; 