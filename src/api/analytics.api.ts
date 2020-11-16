import axios from 'axios';
import { IUser, ISummary, IAPIResponse } from './interfaces';
import { getUrl } from './tools/host';
import * as LIB from '../lib';

/**
 * @description 가장 관련 글이 많은 해시태그
 */
export const fetchHottestHashtag = async () => {
	const response = await axios({
		method: 'GET',
		url: getUrl('api/analytics/hashtag/hottest'),
	});
	return response.data;
};

/**
 * @description 최근 작성된 요약 글
 */
export const fetchRecentSummary = async () => {
	const response = await axios({
		method: 'GET',
		url: getUrl('api/analytics/summary/recent'),
	});
	return response.data;
};

/**
 * @description 글 작성이 많은 사용자
 */
export const fetchFeaturedUser = async () => {
	const response = await axios({
		method: 'GET',
		url: getUrl('api/analytics/user/featured'),
	});
	return response.data;
};
