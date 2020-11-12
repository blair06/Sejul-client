import axios from 'axios';

const BEARER_TOKEN_KEY = 'API_SERVER_BEARER_TOKEN';

/**
 * @description 로그인 토큰을 가져옵니다
 */
export const get = () => {
	const token = localStorage.getItem(BEARER_TOKEN_KEY);
	return token;
};

/**
 * @description 로그인 토큰을 설정합니다
 * @param token 저장될 토큰 값입니다. 공백일 수 없습니다. 삭제 시 clear 함수를 사용합니다
 */
export const set = (token: string) => {
	if (token.length <= 0) {
		throw new Error('[Lib][Token] 토큰은 공백일 수 없습니다');
	} else {
		localStorage.setItem(BEARER_TOKEN_KEY, token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
};

/**
 * @description 저장된 토큰 정보를 모두 삭제합니다
 */
export const clear = () => {
	localStorage.clear();
	delete axios.defaults.headers.common['Authorization'];
};
