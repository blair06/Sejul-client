import { UserInfo } from 'os';
import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { HashTag, RoundedCard } from '../../../components';
import { ISummary, IUser,IHashtag } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserHashTag.scss';
import {IFetchFollowingHashtagResponse} from '../../../api/user.api'

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
// TODO
// pagination
//왜 속성이 없다고 하는지
const UserHashTag = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [hashTags, setHashTags] = useState<IHashtag[]>([]);
	
	const fetch = {
		hashTags: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingHashtag(username);
					//setHashTags(result.hashtags);
					console.log(result);
				} catch (e) {
					console.log(e);
				}
			}
		},
	};
	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		fetch.hashTags(params.username);
	}, []);
	return (
		<div className="userInfo-contents-container">
			<div className="userInfo-user-following">
				<p className="userInfo-user-following header">내가 팔로우 중인 해시태그</p>
				<div className="user-following-container">
					<HashTag hashTags={hashTags}/>
				</div>
			</div>
			<div className="userInfo-user-following-posts">
				<p className="userInfo-user-following header">팔로우 중인 해시태그에 올라온 글</p>
				<div className="user-following-posts-container">
					
				</div>
			</div>
		</div>
	);
};

export default UserHashTag;
