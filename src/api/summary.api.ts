import axios from 'axios';
import { ISummary, IAPIResponse } from './interfaces';
import { getUrl } from './tools/host';

export const fetchAll = async (keyword: string, page: Number, cnt: Number): Promise<ISummary[]> => {
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

export const fetch = async (summary_id: Number): Promise<ISummary> => {
	const response = await axios({
		method: 'get',
		url: getUrl('/api/summary/' + summary_id),
	});

	return response.data;
};

interface ISummaryForm {
	articleTitle: string;
	articleLink: string;
	articleOriginalLink: string;
	content: string;
	timestampStartDt: Date;
	timestampFinishDt: Date;
	hashtags: string[];
}

export const create = async (data: ISummaryForm): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'post',
		url: getUrl('/api/summary/'),
		data: data,
	});

	return response.data;
};

export const remove = async (summary_id: Number): Promise<IAPIResponse> => {
	const response = await axios({
		method: 'DELETE',
		url: getUrl('/api/summary/' + summary_id),
	});

	return response.data;
};
