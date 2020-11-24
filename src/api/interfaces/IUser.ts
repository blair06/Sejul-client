import { ICollection } from './ICollection';
import { IHashtag } from './IHashtag';
import { IArticle } from './IArticle';
import { ISummary } from '.';

/**
 * Author       : 유경수
 * Create Date  : 2020-10-14
 * Description  : 유저 정보
 * History
 * 2020-11-13 담은 기사 정보 추가
 */
export interface IUser extends ICollection {
	email: string; // 사용자 이메일
	password?: string; // 사용자 비밀번호
	username: string; // 유저 정보
	tokens?: {
		// 소셜 로그인 정보
		kakao?: string; // 카카오 로그인 토큰
		facebook?: string; // 페이스북 로그인 토큰
		google?: string; // 구글 로그인 토큰
		naver?: string; // 네이버 로그인 토큰
	};
	profile?: string; // 프로필 이미지 주소
	articles?: [IArticle]; // 담은 기사
	summaries?: [IArticle];
	following?: [IUser]; // 내가 팔로우 중인 유저
	likes?: [ISummary]; // 내가 좋아요 한 글
	hashtags?: [IHashtag]; // 내가 관심 가진 분야
	isAdmin?: Boolean; // 관리자 여부
}
