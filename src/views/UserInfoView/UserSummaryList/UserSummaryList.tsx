import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useLocationSearch } from '../../../lib/hooks';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import '../UserFollowing/UserFollowing.scss';

import UserFollowingPosts from '../UserFollowing/UserFollowingPosts';
import { Pagination } from '../../../components';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
const UserSummaryList = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const loc = useLocation();
	const searches = useLocationSearch(loc.search);
	const [Posts, setPosts] = useState<ISummary[]>();

	const [page, setPage] = useState(1);

	const fetch = {
		Posts: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchUserSummary(username, page);
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

		if (searches.length < 1) {
			setPage(1);
		}
		else {
			const __page = searches.find(item => item.key === "page");
			if (__page) {
				setPage(Number(__page.value));
			}
		}
	}, []);

	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		fetch.Posts(params.username);
	}, [page])

	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">내가 작성한 글</p>
					<UserFollowingPosts posts={Posts} />
					<Pagination total={Posts === undefined ? 10 : Posts.length} page={page} itemsPerPage={6} />
				</div>
			</div>
		</>
	);
};

export default UserSummaryList;
