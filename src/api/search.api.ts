import axios from 'axios';
import { ISummary } from './interfaces';
import { getUrl } from './tools/host';

export const fetchAll = async (page: Number): Promise<ISummary[]> => {
	const response = await axios({
		method: 'get',
		url: getUrl('/api/summary'),
		params: {
			search: '',
			page: 1,
			cnt: 10,
		},
	});

	return response.data;
};
