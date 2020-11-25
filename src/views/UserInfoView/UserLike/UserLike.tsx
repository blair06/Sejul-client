import React, { useState, useEffect } from 'react';
import { CircularImage, Card, Pagination } from '../../../components';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import '../UserFollowing/UserFollowing.scss';
import { useLocationSearch } from '../../../lib/hooks';
import moment from 'moment';
import UserFollowingPosts from '../UserFollowing/UserFollowingPosts';

import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
const UserLike = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [posts, setPosts] = useState<ISummary[] | undefined>([]);

	const loc = useLocation();
	const searches = useLocationSearch(loc.search);

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);

	const fetch = async () => {
		const params = matches.params as IUserInfoHeaderParams;
		if (params.username === undefined) {
			// 404
			alert('유저 정보가 올바르지 않습니다');
			history.push('/');
		}
		else {
			const result = await API.User.fetchLikeSummary(params.username, page, 6);
			setPosts(result.data);
			setTotal(result.count);
		}

	}

	useEffect(() => {
		if (searches.length < 1) {
			setPage(1);
		}
		else {
			const __page = searches.find(item => item.key === "page");
			if (__page) {
				setPage(Number(__page.value));
			}
		}

		fetch();
	}, []);

	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">좋아요한 글</p>
					<div className="user-following-container" style={{
						display: "flex",
						flexDirection: "column",
						height: "100%"
					}}>
						<UserFollowingPosts posts={posts} />
						<Pagination page={page} total={total} itemsPerPage={6} />
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLike;
