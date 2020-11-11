import React from 'react'
import './navbar.scss';
import { Logo, CircularImage } from '../';
import { Link } from 'react-router-dom';
const Navbar = () => {
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
                        <li className="__navbar-link-item">
                            <Link to="/signin">로그인</Link>
                        </li>
                    </ul>
                    <Link to="/user" className="__navbar-user-info">
                        <CircularImage />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
