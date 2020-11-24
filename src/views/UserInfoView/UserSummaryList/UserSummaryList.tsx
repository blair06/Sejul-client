import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import '../UserFollowing/UserFollowing.scss';

import UserFollowingPosts from '../UserFollowing/UserFollowingPosts';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
const UserSummaryList = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [Posts, setPosts] = useState<ISummary[]>();

	const fetch = {
		Posts: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchUserSummary(username,6);
					setPosts(result);
					console.log(result);
				} catch (e) {
					console.log(e);
				}
			}
		},
	};
	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		fetch.Posts(params.username);
	}, []);

	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">내가 작성한 글</p>
						<UserFollowingPosts posts={Posts} setPosts={fetch.Posts} />
				</div>
			</div>
		</>
	);
};

export default UserSummaryList;
