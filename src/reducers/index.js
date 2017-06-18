import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import weather from './weather';

const rootReducer = combineReducers({
	auth,
	menu,
	weather,
});

export default rootReducer;
