import React from 'react';
import { IUser } from '../../../api/interfaces';
import CircularImage from '../../../components/CircularImage';
import './UserInfoHeader.scss';
interface InfoHeaderProps {
	user?: IUser | undefined | null;
}
const InfoHeader = (props: InfoHeaderProps) => {
	const { user } = props;
	return (
		<div className="info-header-container">
			<div className="info-header-content">
				<CircularImage className="info-header-profile" url={user?.profile}/>

				<div className="info-header-text">
					<div className="info-header-name">{user?.username}</div>
					<div className="info-header-small">
						<p>팔로우 {user?.following.length} </p>
						<p>작성글 {user?.articles.length} </p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoHeader;
