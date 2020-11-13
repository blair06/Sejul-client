import { combineReducers } from 'redux';

import auth from './Auth';

const rootReducer = combineReducers({
	auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
