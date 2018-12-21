import { combineReducers } from 'redux';
import   { 
    userPiecesReducer, 
    allCoursesReducer,
    authenticatedUserReducer, 
    userPicturePiecesReducer,
    pdfNewsReducer,
    newsFeedReducer, 
    currentCommentReducer,
    userRelationsReducer, 
    
  }  
from './users-reducer'; 
import { saveMenuItemsReducer, notifierReducer,tokenReducer} from './application-reducer';

const allReducers = combineReducers({ 
 	textPieces: userPiecesReducer, 
 	picturePieces:userPicturePiecesReducer,
  authUser: authenticatedUserReducer, 
  authUserRelations:userRelationsReducer,
 	menuItems: saveMenuItemsReducer, 
  notification: notifierReducer, 
  newsFeed:newsFeedReducer, 
  token:tokenReducer, 
  allCourses: allCoursesReducer, 
  currentPieceComments:currentCommentReducer,
  pdfNews:pdfNewsReducer
 });

export default allReducers; 