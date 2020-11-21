import { combineReducers } from 'redux';

import auth from './Auth';
import summaryTimer from './SummaryTimer';

const rootReducer = combineReducers({
	auth,
	summaryTimer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
