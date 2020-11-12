import { createAsyncAction } from 'typesafe-actions';
import { IUser } from '../../api/interfaces';
import { AxiosError } from 'axios';

export const FETCH_CURRENT_USER_INFO = 'user/FETCH_CURRENT_USER_INFO';
export const FETCH_CURRENT_USER_INFO_SUCCESS = 'user/FETCH_CURRENT_USER_INFO_SUCCESS';
export const FETCH_CURRENT_USER_INFO_ERROR = 'user/FETCH_CURRENT_USER_INFO_ERROR';
export const CLEAR_CURRENT_USER_INFO = 'user/CLEAR_CURRENT_USER_INFO';

// 비동기 액션 생성
export const getUserInfoAsync = createAsyncAction(
	FETCH_CURRENT_USER_INFO,
	FETCH_CURRENT_USER_INFO_SUCCESS,
	FETCH_CURRENT_USER_INFO_ERROR,
	CLEAR_CURRENT_USER_INFO
)<undefined, IUser, AxiosError, undefined>();
