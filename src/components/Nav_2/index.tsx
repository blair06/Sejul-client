import React,{ useEffect, useState } from 'react'
import './navbar_2.scss';
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';
interface IClickProps{
    name: string;
    page: number;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Nav_2 = (props: IClickProps) => {
    const [page,setPage] = useState<any[]>([]);
    useEffect( ()=> {
        axios.get("http://localhost:3000",
        params:{
            page: page
        })
    })
    const response = ;
    setPage(response);
    return (
        <>
            <div className = "__navbar-wrap">
                <ul className="__navbar-links" >
                        <li className="__navbar-link-item" >
                            <div className="__btn" onClick={props.onClick}><NavLink to={{"pathname:`/${name}`"}}>팔로잉</Link></div>
                        </li>
                        <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><NavLink to="/hashtag">해시태그</Link></div>
                        </li>
                        <li className="__navbar-link-item" >
                        <div className="__btn" onClick={props.onClick}><NavLink to="/likeposts">좋아요 한 글</Link></div>
                        </li>
                        <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><NavLink to="/savenews">담은기사</Link></div>
                        </li>
                </ul>
            </div>
        </>
    );
}

export default Nav_2;
