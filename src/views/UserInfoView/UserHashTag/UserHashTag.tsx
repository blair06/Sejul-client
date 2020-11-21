import { UserInfo } from 'os';
import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { CircularImage,HashTag } from '../../../components';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserHashTag.scss';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
// TODO
// pagination
// slider
const UserHashTag = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [hashtags, setHashtags] = useState([]);
	
	const fetch = {
		user: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					// const result = await API.User.fetchFollowingUser(username);
					// setHashtags(result);
					// console.log(result);
				} catch (e) {
					console.log(e);
				}
			}
		},
	};
	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		fetch.user(params.username);
	}, []);
	return (
		<div className="userInfo-contents-container">
			<div className="userInfo-user-following">
				<p className="userInfo-user-following header">내가 팔로우 중인 해시태그</p>
				<div className="user-following-container">
					
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
