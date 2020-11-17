import React,{ useEffect, useState } from 'react'
import './navbar_2.scss';
import { Link } from 'react-router-dom';

interface IClickProps{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Nav_2 = (props: IClickProps) => {

    return (
        <>
            <div className = "__navbar-wrap">
                <ul className="__navbar-links" >
                        <li className="__navbar-link-item" >
                            <div className="__btn" onClick={props.onClick}><Link to="/fallowing">팔로잉</Link></div>
                        </li>
                        <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><Link to="/hashtag">해시태그</Link></div>
                        </li>
                        <li className="__navbar-link-item" >
                        <div className="__btn" onClick={props.onClick}><Link to="/likeposts">좋아요 한 글</Link></div>
                        </li>
                        <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><Link to="/savenews">담은기사</Link></div>
                        </li>
                </ul>
            </div>
        </>
    );
}

export default Nav_2;
