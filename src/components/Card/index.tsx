import React, {useEffect, useState} from 'react'
import './Card.scss'

interface CardProps {
    children: any;
    className?: string;
    onClick?: string;
    //온클릭시 url
}
const Card = (prop: CardProps) => {
    const {children, className, onClick} = prop;
    return (
        <div className={`__Card-main-container ${className || ''}`} >
            {children}
        </div>
    )
}

export default Card;
