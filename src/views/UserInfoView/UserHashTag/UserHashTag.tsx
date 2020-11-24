import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { HashTag, Pagination } from '../../../components';
import { useLocationSearch } from '../../../lib/hooks';
import { ISummary, IUser, IHashtag } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserHashTag.scss';
import UserFollowingPosts from '../UserFollowing/UserFollowingPosts';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
// TODO
// pagination

const UserHashTag = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [hashTags, setHashTags] = useState<IHashtag[]>([]);
	const [summaries, setSummaries] = useState<ISummary[]>([]);

	const loc = useLocation();
	const searches = useLocationSearch(loc.search);

	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);

	const fetch = {
		hashTags: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingHashtag(username);
					setHashTags(result.hashtags);
				} catch (e) {
					console.log(e);
				}
			}
		},
		summaries: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchFollowingHashtag(username);
					setSummaries(result.summaries);
				} catch (e) {
					console.log(e);
				}
			}
		},
	};

	const fetchHashtags = async () => {
		const params = matches.params as IUserInfoHeaderParams;
		if (params.username === undefined) {
			// 404
			alert('유저 정보가 올바르지 않습니다');
			history.push('/');
		}
		else {
			const result = await API.User.fetchFollowingHashtag(params.username);
			setHashTags(result.hashtags);
			setSummaries(result.summaries);
			setTotal(result.summaries.length);
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
		fetchHashtags();
	}, []);
	return (
		<div className="userInfo-contents-container">
			<div className="userInfo-user-following">
				<p className="userInfo-user-following header">내가 팔로우 중인 해시태그</p>
				<div className="user-following-container">
					<HashTag className="user-following-hashtags" hashTags={hashTags} />
				</div>
			</div>
			<div className="userInfo-user-following-posts">
				<p className="userInfo-user-following header">팔로우 중인 해시태그에 올라온 글</p>
				<div className="user-following-hashtag-posts-container">
					<UserFollowingPosts posts={summaries} />
					<Pagination total={total} page={page} itemsPerPage={6} />
				</div>
			</div>
		</div>
	);
};

export default UserHashTag;
