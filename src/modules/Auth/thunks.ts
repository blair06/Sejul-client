import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction } from './types';
import * as API from '../../api';
import * as LIB from '../../lib';
import { AxiosError } from 'axios';

import { getUserInfoAsync } from './actions';

export function getUserInfoThunk(): ThunkAction<void, RootState, null, AuthAction> {
	return async (dispatch) => {
		const { request, success, failure } = getUserInfoAsync;
		dispatch(request());
		try {
			const token = LIB.Token.get();
			if (token === null) {
				const errorData = {
					name: 'Token is not valid',
					message: '로그인 토큰이 없습니다',
					config: {},
					isAxiosError: false,
				};
				const error: AxiosError = {
					...errorData,
					toJSON: () => {
						return errorData;
					},
				};
				throw error;
			} else {
				const response = await API.Auth.fetch(token);
				dispatch(success(response));
			}
		} catch (e) {
			dispatch(failure(e));
		}
	};
}

export function clearUserInfoThunk(): ThunkAction<void, RootState, null, AuthAction> {
	return (dispatch) => {
		const { cancel } = getUserInfoAsync;
		LIB.Token.clear();
		dispatch(cancel());
	};
}
