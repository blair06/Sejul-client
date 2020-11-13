import axios from 'axios';
import { IUser, IAPIResponse } from './interfaces';
import { getUrl } from './tools/host';
import * as LIB from '../lib';

interface ISignUpParams {
	email: string;
	password: string;
	validPassword: string;
	username: string;
}

export const signup = async (data: ISignUpParams): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'POST',
		url: getUrl('api/auth/signup'),
		data: {
			email: data.email,
			password: data.password,
			password_valid: data.validPassword,
			username: data.username,
		},
	});
	return response.data;
};

export const signin = async (email?: string, pw?: string) => {
	// 토큰이 없는 경우
	const response = await axios({
		method: 'POST',
		url: getUrl('api/auth/signin'),
		data: {
			email: email,
			password: pw,
		},
	});

	if (response.status === 200) {
		LIB.Token.clear();
		LIB.Token.set(response.data.token);
	}

	return response.data;
};

export const fetch = async (token: string): Promise<IUser> => {
	const response = await axios({
		method: 'GET',
		url: getUrl('api/user/'),
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
