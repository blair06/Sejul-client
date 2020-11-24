import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { CircularImage, Card, Pagination } from '../../../components';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import '../UserFollowing/UserFollowing.scss';
import { useLocationSearch } from '../../../lib/hooks';
import moment from 'moment';
import UserFollowingPosts from '../UserFollowing';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
const UserLike = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [posts, setPosts] = useState<ISummary[]|undefined>();

	const fetch = {
		posts: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchLikeSummary(username);
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
		fetch.posts(params.username);
	}, []);

	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">좋아요한 글</p>
					<div className="user-following-container">
						{/* <UserFollowingPosts posts={posts} setPosts={fetch.posts} /> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLike;
