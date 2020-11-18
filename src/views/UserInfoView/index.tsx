import { UserInfo } from 'os'
import React from 'react'
import InfoHeader from './UserInfoHeader/InfoHeader';
import './scss/index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
const UserInfoView = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <div className="UserInfo-main-container">
            
            {/* <InfoHeader user={user}/> */}
        </div>
    )
}

export default UserInfoView;
