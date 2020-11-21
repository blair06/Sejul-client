import { createAction } from 'typesafe-actions';

export const CREATE_TIMER_RECORD = 'summary/timer/CREATE_TIMER_RECORD';

export const createTimerRecord = createAction(CREATE_TIMER_RECORD, ({ key, value }) => ({ key, value }));
