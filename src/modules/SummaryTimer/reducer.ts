import { createReducer } from 'typesafe-actions';
import { CREATE_TIMER_RECORD } from './actions';
import { SummaryTimerState } from './types';

const initialState = {
	start: null,
	finish: null,
} as SummaryTimerState;

export default createReducer(initialState, {
	[CREATE_TIMER_RECORD]: (state: SummaryTimerState, action: { key: any; value: any }) => ({
		...state,
		[action.key]: action.value,
	}),
});
