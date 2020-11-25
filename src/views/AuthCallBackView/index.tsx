import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useLocationSearch } from '../../lib/hooks';
import { useDispatch } from 'react-redux';
import { getUserInfoThunk } from '../../modules/Auth/';
import * as LIB from '../../lib';

import './authcallback.scss';

const AuthCallbackView = () => {
    const loc = useLocation();
    const searches = useLocationSearch(loc.search);
    const dispatch = useDispatch();

    const signin = () => {
        const token = searches.find(search => search.key === "token");

        if (token === undefined || token === null) {
            alert("토큰 정보가 잘못됐습니다");
            window.location.href = "/";
        }
        else {
            LIB.Token.clear();
            LIB.Token.set(token.value);
            dispatch(getUserInfoThunk());
            window.location.href = "/";
        }
    }

    useEffect(() => {
        signin();
    }, []);

    return (
        <div className="__auth-callback-container">
            <div className="__auth-callback-wrapper">
                <h1>로그인 중</h1>
                <p className="__auth-callback-title">로그인 처리 중 입니다. <br />잠시 후 자동으로 이동합니다. 👏🏽 </p>
            </div>
        </div>
    )
}

export default AuthCallbackView;
