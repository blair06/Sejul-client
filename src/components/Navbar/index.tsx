import React, { useEffect } from 'react';
import './navbar.scss';
import { Logo, CircularImage } from '../';
import { Link } from 'react-router-dom';

import * as API from '../../api';
import { clearUserInfoThunk } from '../../modules/Auth/thunks';
import { useDispatch } from 'react-redux';
import { useUserInfo } from '../../lib/hooks';

const Navbar = () => {
    const user = useUserInfo();
    const dispatch = useDispatch();

    const ui = {
        signout: async () => {
            if (user !== null) {
                dispatch(clearUserInfoThunk());
            }
        }
    }

    useEffect(() => {
        API.Auth.signin('dev.yoogomja@gmail.com', '@rhawk1202');
    }, []);

    return (
        <div className="__navbar-container">
            <div className="__navbar-content-container">
                <div className='__navbar-content-wrapper'>
                    <Link className="__navbar-logo-container" to="/">
                        <Logo className="__navbar-logo" />
                    </Link>
                    <ul className="__navbar-links">
                        <li className="__navbar-link-item">
                            <Link to="/search">탐색</Link>
                        </li>
                        <li className="__navbar-link-item">
                            <Link to="/summary">요약</Link>
                        </li>
                        {
                            user === null || user === undefined ?
                                <>
                                    <li className="__navbar-link-item">
                                        <Link to="/signin">로그인</Link>
                                    </li>
                                    <li className="__navbar-link-item">
                                        <Link to="/signup">회원 가입</Link>
                                    </li>
                                </> : <></>
                        }
                        {
                            user !== null ?
                                <li className="__navbar-link-item" onClick={ui.signout}>
                                    <span >로그아웃</span>
                                </li> :
                                <></>
                        }
                    </ul>
                    <Link to="/user" className="__navbar-user-info">
                        {
                            user !== null ?
                                <p>{user.username}</p> : <></>
                        }
                        <CircularImage url={user?.profile} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
