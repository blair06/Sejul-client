import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { CircularImage, Card, Pagination } from '../../../components';
import { useLocationSearch } from '../../../lib/hooks';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserFollowing.scss';
import moment from 'moment';
import UserFollowingPosts from './UserFollowingPosts';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}

const UserFollowing = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [users, setUsers] = useState<IUser[] | undefined>();
	const [posts, setPosts] = useState<ISummary[]>();

	const loc = useLocation();
	const searches = useLocationSearch(loc.search);

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);


	const fn = {
		fetch: async () => {
			const params = matches.params as IUserInfoHeaderParams;
			if (params.username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingUser(params.username, page);
					setPosts(result.summary.data);
					setUsers(result.users);

					setTotal(result.summary.total as number);
				} catch (e) {
					console.log(e);
				}
			}
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
	}, []);

	useEffect(() => {
		fn.fetch();
	}, [page])


	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">내가 팔로우 중인 사용자</p>
					<div className="user-following-container">
						{users !== null && users !== undefined ? (
							users.map((followingUser, index) => (
								<Link className="__user-link" key={index} to={`/user/${followingUser.username}/following`}>
									<Card key={index} className="user-following-card">
										<CircularImage className="user-following-profile" url={followingUser.profile} />
										<div className="user-following-text">
											<div className="user-following-name">{followingUser.username}</div>
											<div className="user-following-small">
												{followingUser.summaries !== undefined && followingUser.following !== undefined ? (
													<>
														<p>팔로우 {followingUser.following.length} </p>
														<p>작성글 {followingUser.summaries.length} </p>
													</>
												) : (
														<></>
													)}
											</div>
										</div>
									</Card>
								</Link>
							))
						) : (
								<div className="user-following-placeholder">아직 팔로우한 유저가 없습니다</div>
							)}
					</div>
				</div>
				<div className="userInfo-user-following-posts">
					<p className="userInfo-user-following header">팔로잉한 사용자가 작성한 글</p>
					{
						posts !== undefined ?
							<UserFollowingPosts posts={posts} /> : <></>
					}
					<Pagination total={total} itemsPerPage={6} page={page} />
				</div>

			</div>
		</>
	);
};

export default UserFollowing;
