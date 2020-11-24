import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './scss/NotFound.scss';

const NotFoundView = () => {
    const loc = useLocation();

    useEffect(() => {
        console.log(loc);
    }, [])

    return (
        <div className="__not-found-container">
            <div className="__not-found-wrapper">
                <h1>404</h1>
                <p className="__not-found-title">Page is not found 🤷🏽‍♂️ </p>
                <p className="__not-found-text">
                    <b>'{loc.pathname}'</b>은 존재하지 않는 페이지입니다
                </p>
            </div>
        </div>
    )
}

export default NotFoundView;
