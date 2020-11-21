import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type SummaryTimerAction = ActionType<typeof actions>;
export type SummaryTimerState = {
	start: Date | null;
	finish: Date | null;
};
