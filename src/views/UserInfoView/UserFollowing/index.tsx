import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { CircularImage, Card, Pagination } from '../../../components';
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

	const fetch = {
		user: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingUser(username);
					setUsers(result.users);
				} catch (e) {
					console.log(e);
				}
			}
		},
			posts: async (username: string | undefined) => {
				if (username === undefined) {
					// 404
					alert('유저 정보가 올바르지 않습니다');
					history.push('/');
				} else {
					try {
						const result = await API.User.fetchFollowingUser(username);
						setPosts(result.summary.data);
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
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">내가 팔로우 중인 사용자</p>
					<div className="user-following-container">
						{users !== null && users !== undefined ? (
							users.map((user: IUser, index: number) => (
								<Link className="__user-link" key={index} to={`/user/${user?.username}/following`}>
									<Card key={index} className="user-following-card">
										<CircularImage className="user-following-profile" url={user.profile} />
										<div className="user-following-text">
											<div className="user-following-name">{user?.username}</div>
											<div className="user-following-small">
												{user?.summaries !== undefined && user.following !== undefined ? (
													<>
														<p>팔로우 {user.following.length} </p>
														<p>작성글 {user.summaries.length} </p>
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
				<UserFollowingPosts posts={posts} setPosts={fetch.posts}/>
				</div>
				
			</div>
		</>
	);
};

export default UserFollowing;
