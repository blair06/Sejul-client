import React, { useEffect, useState } from 'react';
import * as API from '../../api';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ISummary, IUser } from '../../api/interfaces';
import { CircularImage, SubNavbar, CustomButton } from '../../components';
import './UserInfoHeader.scss';
import { IUserFetchResponse } from '../../api/user.api'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getUserInfoThunk } from '../../modules/Auth';
interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}

enum FOLLOW_STATE {
	ITSELF,
	NOT_FOLLOW,
	FOLLOW
}

const UserInfoHeader = () => {
	const params = useParams();
	const history = useHistory();
	const loc = useLocation();
	const dispatch = useDispatch();
	const { auth } = useSelector((state: RootState) => state);

	const [user, setUser] = useState<IUser>();
	const [summaries, setSummaries] = useState<ISummary[]>();
	const [followState, setFollowState] = useState(FOLLOW_STATE.NOT_FOLLOW);
	const fetch = async () => {
		// 404
		try {
			const currentParams = params as IUserInfoHeaderParams;
			const result = await API.User.fetch(currentParams.username);
			setUser(result.user);
			setSummaries(result.summaries);
			console.log(result);
		} catch (e) {
			if (e.response !== undefined && e.response.status === 404) {
				// 404 (NOT FOUND)면 뭐해라
				alert('사용자 정보가 없습니다');
				history.push('/');
			} else {
				// 그냥 서버에러
				alert('일시적인 오류가 발생했습니다.\n잠시 후 실행해주십시오');
				history.push('/');
			}
		}
	};

	const fn = {
		follow: async () => {
			if (user !== undefined && user !== null) {
				await API.User.followUser(user.username);
				await fetch();
				dispatch(getUserInfoThunk());
			}
		},
		unfollow: async () => {
			if (user !== undefined && user !== null) {
				await API.User.unfollowUser(user.username);
				await fetch();
				dispatch(getUserInfoThunk());
			}
		},
		computeFollowState: () => {
			if (auth.user.data !== null && auth.user.data !== undefined && user !== undefined) {
				if (auth.user.data._id === user._id) {
					setFollowState(FOLLOW_STATE.ITSELF);
					return;
				}

				if (auth.user.data.following !== undefined && user !== undefined) {
					const exists = auth.user.data.following.find((followingUser) => followingUser._id === user._id);
					if (exists) {
						console.log("?");
						setFollowState(FOLLOW_STATE.FOLLOW);
					}
					else {
						console.log("!");
						console.log(auth.user.data.following, user);
						setFollowState(FOLLOW_STATE.NOT_FOLLOW);
					}
				}
			}
		}
	}

	useEffect(() => {
		if (loc.pathname.split("/").length < 4) {
			console.log("not had depth");
			history.push(loc.pathname + "/summaries");
		}
	}, []);

	useEffect(() => {
		fetch();
	}, [history, loc]);


	useEffect(() => {
		console.log('updated');
		fn.computeFollowState();
	}, [user, auth.user]);

	return (
		<>
			<div className="info-header-container">
				<div className="info-header-content">
					<CircularImage className="info-header-profile" url={user?.profile} />

					<div className="info-header-text">
						<div className="info-header-name">{user?.username}</div>
						<div className="info-header-small">
							{summaries !== undefined && user?.following !== undefined ? (
								<>
									<p>팔로우 {user?.following.length} </p>
									<p>작성글 {summaries.length} </p>

								</>
							) : (
									<><p>조회할 수 없습니다</p></>
								)}
						</div>
						{
							followState === FOLLOW_STATE.NOT_FOLLOW ?
								<CustomButton className="info-header-btn follow" text="팔로우 하기" onClick={fn.follow} />
								: followState === FOLLOW_STATE.FOLLOW ?
									<CustomButton className="info-header-btn unfollow" text="언팔로우 하기" onClick={fn.unfollow} /> : <></>
						}
					</div>
				</div>
			</div>
			<SubNavbar
				className="__user-navbar"
				links={[
					{ to: `/user/${user?.username}/summaries`, text: '작성한 글' },
					{ to: `/user/${user?.username}/following`, text: '팔로잉' },
					{ to: `/user/${user?.username}/hashtag`, text: '해시태그' },
					{ to: `/user/${user?.username}/likes`, text: '좋아요한 글' },
					{ to: `/user/${user?.username}/scrap`, text: '담은 기사' },
				]}
			/>
		</>
	);
};

export default UserInfoHeader;
