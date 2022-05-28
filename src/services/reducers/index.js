import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { authReducer } from './auth';
import { modalReducer } from './modal';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	modal: modalReducer,
  auth: authReducer,
  router: connectRouter(history)	
});