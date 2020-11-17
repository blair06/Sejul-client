import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './scss/search-header.scss'

interface IClickProps{
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SearchHeader = ( props: IClickProps) => {
    const { onClick } = props;
    return(
        <>
        <div className = "search-bar">
                <input 
                    type="input" 
                    placeholder="검색어를 입력 하세요." 
                    className="search-bar-input"/>
                    <button className="search-button-img-wrap" ><img className="search-button-img" /></button>
            </div>  
            <div className = "__navbar-wrap">
                <ul className="__navbar-links" >
                        <li className="__navbar-link-item" >
                            <div className="__btn" onClick={props.onClick}><Link to="/newsearch">기사검색</Link></div>
                        </li>
                        <li className="__navbar-link-item">
                        <div className="__btn" onClick={props.onClick}><Link to="/postsearch">글검색</Link></div>
                        </li>
                </ul>
            </div>
        </>
    )
}

export default SearchHeader