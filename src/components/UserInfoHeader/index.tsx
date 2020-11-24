import React, { useEffect, useState } from 'react';
import * as API from '../../api';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ISummary, IUser } from '../../api/interfaces';
import { CircularImage, SubNavbar } from '../../components';
import './UserInfoHeader.scss';
import { IUserFetchResponse } from '../../api/user.api'
interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}

const UserInfoHeader = () => {
	const params = useParams();
	const history = useHistory();
	const loc = useLocation();

	const [user, setUser] = useState<IUser>();
	const [summaries, setSummaries] = useState<ISummary[]>();
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

	useEffect(() => {
		if (loc.pathname.split("/").length < 4) {
			console.log("not had depth");
			history.push(loc.pathname + "/summaries");
		}
	}, []);

	useEffect(() => {
		fetch();
	}, [history]);

	useEffect(() => {
		console.log(user);
	}, [user]);

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
