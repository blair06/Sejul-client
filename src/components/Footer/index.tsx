import React from 'react'
import Logo from '../Logo';
import './footer.scss';

const Footer = () => {
    return (
        <div className="__footer-container">
            <div className="__footer-left">
                <p>개인 정보 보호 방침</p>
                <p>서울특별시 노원구 화랑로 815 삼육대학교, 학생회관 402호 멋쟁이 사자처럼</p>
                <p>보안 정보 책임자 : 유경수 | <a href="mailto:dev.yoogomja@gmail.com" target="_blank" rel="noopener noreferrer">
                    dev.yoogomja@gmail.com
                </a></p>
            </div>
            <div className="__footer-right">
                <Logo />
            </div>
        </div>
    )
}

export default Footer;
