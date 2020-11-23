import axios from 'axios';
import { IAPIResponse, IHashtag, ISummary, IUser } from './interfaces';
import { getUrl } from './tools/host';

export interface IUserFetchResponse {
	user: IUser;
	summaries: ISummary[];
}

export const fetch = async (username: string): Promise<IUserFetchResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}`),
	});
	return result.data;
};

/**
 * @description 사용자가 작성한 글 가져오기
 * @param username 사용자 이름
 */
export const fetchUserSummary = async (username: string): Promise<ISummary[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/summaries`),
	});
	return result.data;
};

export interface IFetchFollowingUserResponse {
	summary: {
		currentPage: Number;
		data: ISummary[];
		total: Number;
	};
	users: IUser[];
}

/**
 * @description 사용자가 팔로우한 사용자들과 해당 사용자들이 작성한 글 가져오기
 * @param username 사용자 이름
 */
export const fetchFollowingUser = async (username: string): Promise<IFetchFollowingUserResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/following`),
	});
	return result.data;
};

export interface IFetchFollowingHashtagResponse {
	hashtags: IHashtag[];
	summaries: ISummary[];
}

/**
 * @description 사용자가 팔로우한 해시태그와 해당 해시태그에 작성된 글 가져오기
 * @param username 사용자 이름
 */
export const fetchFollowingHashtag = async (username: string): Promise<IFetchFollowingHashtagResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/hashtags`),
	});
	return result.data;
};

/**
 * @description 사용자가 좋아요한 글 가져오기
 * @param username 사용자 이름
 */
export const fetchLikeSummary = async (username: string): Promise<ISummary[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/likes`),
	});
	return result.data;
};
