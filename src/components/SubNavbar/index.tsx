import React from 'react'
import { NavLink } from 'react-router-dom';
import './scss/index.scss';

interface ISubNavbarLinks {
    to: string,
    text: string
}
interface ISubNavbarProps {
    className?: string;
    links: ISubNavbarLinks[]
}

const SubNavbar = (props: ISubNavbarProps) => {
    const { className, links } = props;
    return (
        <div className={`__subnavbar-container ${className || ''}`}>
            <div className="__subnavbar-wrapper">
                {
                    links.map((link, idx) => {
                        return <NavLink to={link.to} className="__subnavbar-link" activeClassName="__subnavbar-link-active">{link.text}</NavLink>
                    })
                }
            </div>
        </div>
    )
} 

export default SubNavbar;
