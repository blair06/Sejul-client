import { UserInfo } from 'os';
import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import { CircularImage, UserInfoHeader, Card } from '../../../components';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserFollowing.scss';
interface IUserInfoHeaderParams {
	username: string;
	// user?: IUser | undefined | null;
}
// TODO
// pagination
// slider
const UserFollowing = () => {
	const history = useHistory();
	const params = useParams();
	const matches = useRouteMatch();
	const [users, setUsers] = useState<Object>([]);

	const fetch = {
		user: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingUser(username);
					setUsers(result);
					console.log(result);
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
				<p className="userInfo-user-following header">내가 팔로우 중인 사용자</p>
				<div className="user-following-container">
					{users.users?.map((user: IUser, index:number) => {
						user !== null || user !== undefined ? <Card key={index} className="user-following-card">{user.users}</Card> : <></>;
					})}
				</div>
			</div>
			<div className="userInfo-user-following-posts">
				<p className="userInfo-user-following header">팔로잉한 사용자가 작성한 글</p>
				<div className="user-following-posts-container">
					{/* {users?.map((user, index) =>
						user !== null || user !== undefined ? <Card className="user-following-card">{user}</Card> : <></>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default UserFollowing;
