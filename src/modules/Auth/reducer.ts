import { createReducer } from 'typesafe-actions';
import { AuthState, AuthAction } from './types';

import {
	FETCH_CURRENT_USER_INFO,
	FETCH_CURRENT_USER_INFO_ERROR,
	FETCH_CURRENT_USER_INFO_SUCCESS,
	CLEAR_CURRENT_USER_INFO,
} from './actions';

const initialState: AuthState = {
	user: {
		loading: false,
		error: null,
		data: null,
	},
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
	[FETCH_CURRENT_USER_INFO]: (state) => ({
		...state,
		user: {
			loading: true,
			error: null,
			data: null,
		},
	}),
	[FETCH_CURRENT_USER_INFO_SUCCESS]: (state, action) => ({
		...state,
		user: {
			loading: false,
			error: null,
			data: action.payload,
		},
	}),
	[FETCH_CURRENT_USER_INFO_ERROR]: (state, action) => ({
		...state,
		user: {
			loading: false,
			error: action.payload,
			data: null,
		},
	}),
	[CLEAR_CURRENT_USER_INFO]: (state) => ({
		...state,
		user: {
			loading: false,
			error: null,
			data: null,
		},
	}),
});

export default auth;
