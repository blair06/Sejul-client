import React, { useEffect, useState } from 'react'
import './navbar_2.scss';
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';
interface IClickProps {
    name: string;
    page: number;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Nav_2 = (props: IClickProps) => {
    const [page, setPage] = useState<any[]>([]);
    const something = "";
    useEffect(() => {

    })

    // setPage(response);
    return (
        <>
            <div className="__navbar-wrap">
                <ul className="__navbar-links" >
                    <li className="__navbar-link-item" >
                        <div className="__btn" onClick={props.onClick}><NavLink to={`/${something}`}>팔로잉</NavLink></div>
                    </li>
                    <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><NavLink to="/hashtag">해시태그</NavLink></div>
                    </li>
                    <li className="__navbar-link-item" >
                        <div className="__btn" onClick={props.onClick}><NavLink to="/likeposts">좋아요 한 글</NavLink></div>
                    </li>
                    <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><NavLink to="/savenews">담은기사</NavLink></div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Nav_2;
