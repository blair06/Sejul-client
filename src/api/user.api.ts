import axios from 'axios';
import { IAPIResponse, IHashtag, ISummary, IUser } from './interfaces';
import { getUrl } from './tools/host';

export const fetch = async (username: string): Promise<IUser> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}`),
	});
	return result.data;
};

interface IFetchFollowingUserResponse {
	summary: {
		currentPage: Number;
		data: ISummary[];
		total: Number;
	};
	users: IUser[];
}

export const fetchFollowingUser = async (username: string): Promise<IFetchFollowingUserResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/following`),
	});
	return result.data;
};

export const fetchFollowingHashtag = async (username: string): Promise<IHashtag[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/${username}/hashtags`),
	});
	return result.data;
};

export const fetchLikeSummary = async (username: string): Promise<ISummary[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/${username}/likes`),
	});
	return result.data;
};
