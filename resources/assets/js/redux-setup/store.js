import { createStore,applyMiddleware } from 'redux'; 
import allReducers  from './../reducers/root-reducer';
import thunkMiddleWare from 'redux-thunk';
import logger from 'redux-logger'
		

export const store = createStore( 
	allReducers, 
		applyMiddleware(thunkMiddleWare,logger)
	);