import { combineReducers } from 'redux';
import  usersReducer  from './users-reducer'; 


const allReducers = combineReducers({ 
 	users: usersReducer
 });


export default allReducers; 