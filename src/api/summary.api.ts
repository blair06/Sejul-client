import axios from 'axios';
import { ISummary, IAPIResponse } from './interfaces';
import { getUrl } from './tools/host';

/**
 * @description 모든 요약 글을 가져옵니다
 * @param keyword 검색할 키워드
 * @param page 조회할 페이지
 * @param cnt 한번에 보여줄 갯수
 */
export const fetchAll = async (keyword: string = '', page: Number, cnt: Number = 10): Promise<ISummary[]> => {
	const response = await axios({
		method: 'get',
		url: getUrl('/api/summary'),
		params: {
			search: keyword,
			page: page,
			cnt: cnt,
		},
	});

	return response.data;
};

/**
 * @description 하나의 요약 글을 조회합니다
 * @param summary_id 요약 글 번호
 */
export const fetch = async (summary_id: Number): Promise<ISummary> => {
	const response = await axios({
		method: 'get',
		url: getUrl('/api/summary/' + summary_id),
	});

	return response.data;
};

interface ISummaryForm {
	// 기사 제목
	articleTitle: string;
	// 기사 링크
	articleLink: string;
	// 신문사 링크
	articleOriginalLink: string;
	// 내용
	content: string;
	// 스탬프 시작 시간
	timestampStartDt: Date;
	// 스탬프 종료 시간
	timestampFinishDt: Date;
	// 해시태그
	hashtags: string[];
}

/**
 * @description 글을 생성합니다
 * @param data 글 생성에 필요한 데이터
 */
export const create = async (data: ISummaryForm): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'post',
		url: getUrl('/api/summary/'),
		data: data,
	});

	return response.data;
};

/**
 * @description 글을 수정합니다
 * @param summary_id 수정할 글의 번호
 * @param content 내용
 */
export const update = async (summary_id: Number, content: string): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'put',
		url: getUrl('/api/summary' + summary_id),
		data: {
			content: content,
		},
	});
	return response.data;
};

/**
 * @description 글을 삭제합니다
 * @param summary_id 삭제할 글 번호입니다
 */
export const remove = async (summary_id: Number): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'DELETE',
		url: getUrl('/api/summary/' + summary_id),
	});

	return response.data;
};
