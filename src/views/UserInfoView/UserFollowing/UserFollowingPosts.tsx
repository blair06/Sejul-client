import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { CircularImage, Card, Pagination } from '../../../components';
import { ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserFollowingPosts.scss';
import { useLocationSearch } from '../../../lib/hooks';
import moment from 'moment';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}


interface IUserFollowingPosts {
	posts: ISummary[] | undefined;
	setPosts: Function;
	className?: string;
}
//TODO
//소요시간
const UserFollowingPosts = (props:IUserFollowingPosts) => {
	const {posts, setPosts, className} = props;

	const history = useHistory();
	const location = useLocation();
	const matches = useRouteMatch();
	const search = useLocationSearch(location.search);

	const [currentPage, setCurrentPage] = useState(1);

	
	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		setPosts(params.username);
	}, [currentPage]);
	
	useEffect(() => {
		search.forEach((item) => {
			if (item.key === 'page') {
				setCurrentPage(Number(item.value));
			}
		});
	});
	return (
		<>
			{}
				<div className="user-following-posts-container">
					{posts !== undefined && posts !== undefined ? (
						posts.map((item: ISummary, index: number) => (
							<Link key={index} className ="__user-link" to={`/summary/${item._id}`}>
							<Card key={index} className="user-following-post-card">
								<div className="user-following-post-group">
									{item.user === undefined || item.user === null ? (
										<div className="user-following-post-author">
											<CircularImage className="user-following-post-author-profile" />
											아무개
										</div>
									) : (
										<div className="user-following-post-author">
											<CircularImage className="user-following-post-author-profile" url={item.user.profile} />
											{item.user.username}
										</div>
									)}
									<div className="user-following-post-article-title">{item.article.title}</div>
								</div>

								{/* 해시태그 */}
								<div className="user-following-post-group">
									<div className="user-following-post-hashtags">
										{item.hashtags.length > 0 ? item.hashtags.map((hashtag) => (
											<p className="user-following-post-hashtags-text">#{hashtag.text} </p>
										)):(<p className="user-following-post-hashtags-text">등록된 해시태그가 없습니다</p>)}
									</div>

									<div className="user-following-post-date">
										<p className="user-following-post-date-required">{item.timestamp }</p>
										<p className="user-following-post-date-update">{moment(item.createdAt).fromNow()}</p>
									</div>
								</div>
							</Card>
							</Link>
						))
					) : (
						<></>
					)}
				</div>
			<Pagination total={10} itemsPerPage={6} page={currentPage} />
		</>
	);
};

export default UserFollowingPosts;