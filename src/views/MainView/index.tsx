import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import { RoundedCard} from '../../components';
import './scss/MainCommon.scss';
import { ISummary, IHashtag, IUser } from '../../api/interfaces';
import mainBanner from '../../assets/img/main-banner.png';
import MainSlider from './MainSlider';
import UserSlider from './UserSlider';

// TODO
// 링크연결하기
const MainView = () => {
	const [posts, setPosts] = useState<ISummary[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [hashTags, setHashTags] = useState<IHashtag[]>([]);
	const getPosts = async () => {
		try {
			const result = await API.Analytics.fetchRecentSummary();
			console.log(result);
			setPosts(result);
		} catch (e) {
			console.log(e);
		}
	};

	const getHashTags = async () => {
		try {
			const result = await API.Analytics.fetchHottestHashtag();
			setHashTags(result);
		} catch (e) {
			console.log(e);
		}
	};
	const getUsers = async () => {
		try {
			const result = await API.Analytics.fetchFeaturedUser();
			console.log(result);
			setUsers(result);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		getPosts();
		getHashTags();
		getUsers();
	}, []);
	return (
		<div className="main-view-container">
			<div className="main-banner">
				<div className="layer">
					<p>Sejul</p>
					<p>시사 상식을 접하는 <span>습관</span>을 길러주는 방법</p>
					<p>매일새로운 기사를 <span>요약</span>하고</p>
					<p>시사 상식을 길러보세요</p>
				</div>
			</div>
			<div className="main-contents-container">
				<p className="main-contents-header">최근에 작성된 글</p>
				<div className="bar"></div>
				<div className="main-slider-recent">
					<MainSlider data={posts} />
				</div>
				<p className="main-contents-header">해시 태그</p>
				<div className="bar"></div>
				<div className="main-hashtag">
					{hashTags.length > 7 ? (
						hashTags.map((hashTag, index) => (
							<RoundedCard key={index} className="add" cancelable={false}>
								{hashTag.text}
							</RoundedCard>
						))
					) : (
						<div className="main-hashtag-placeholder">더 많은 해시태그를 작성해보세요!</div>
					)}
				</div>
				<p className="main-contents-header">활동이 많은 사용자들</p>
				<div className="bar"></div>
				<div className="main-slider-user">
					<UserSlider data={users} />
				</div>
			</div>
			<div className="main-footer">Sejul</div>
		</div>
	);
};

export default MainView;
