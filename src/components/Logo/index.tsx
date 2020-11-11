import React from 'react'
import './logo.scss';

interface ILogoProps {
    className?: string,
}

const Logo = (props: ILogoProps) => {
    const { className, } = props;
    return (
        <p className={`__logo-text ${props.className || ''}`} >
            sejul
        </p>
    )
}

export default Logo;
