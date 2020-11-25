import axios from 'axios';
import { ISummary } from './interfaces';
import { getUrl } from './tools/host';

/**
 * @description 검색을 실행합니다
 * @param search 검색어 입니다. 반드시 주어져야 합니다
 * @param page 현재 페이지입니다. 1을 기본값으로 갖습니다
 * @param cnt 한번에 보여줄 갯수입니다 10을 기본값으로 갖습니다
 */
export const exec = async (search: string, page: Number = 1, cnt: Number = 10): Promise<ISummary[]> => {
	const response = await axios({
		method: 'get',
		url: getUrl('api/summary'),
		params: {
			search: search,
			page: page,
			cnt: cnt,
		},
	});

	return response.data;
};

/**
 * @description 네이버 API로 기사를 검색해옵니다
 * @param search 검색어
 * @param page 현재 페이지
 * @param cnt 페이지 당 보여줄 갯수
 */
export const fetchArticles = async (search: string, page: Number = 1, cnt: Number = 10) => {
	const response = await axios({
		method: 'get',
		url: getUrl('api/search/article'),
		params: {
			search: search,
			page: page,
			cnt: cnt,
		},
	});
	return response.data;
};

/**
 * @description 요약글 검색을 실행합니다
 * @param search 검색어 입니다. 반드시 주어져야 합니다
 * @param page 현재 페이지입니다. 1을 기본값으로 갖습니다
 * @param cnt 한번에 보여줄 갯수입니다 10을 기본값으로 갖습니다
 */
interface IfetchSummariesResponse {
	page: number;
	data: ISummary[];
	count: number;
}

export const fetchSummaries = async (
	search: string,
	page: Number = 1,
	cnt: Number = 10
): Promise<IfetchSummariesResponse> => {
	const response = await axios({
		method: 'get',
		url: getUrl('api/search/summary'),
		params: {
			search: search,
			page: page,
			cnt: cnt,
		},
	});
	return response.data;
};
