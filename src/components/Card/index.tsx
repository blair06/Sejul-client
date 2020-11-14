import React, {ReactChild, ReactNode, useEffect, useState} from 'react'
import './Card.scss'

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: Function;
    
}
// how to use
// 박스안 내용들은 Card태그 사이 children을 이용해 담아줍니다
// prop로 className을 주어 scss를 조정할 수 있습니다
// 클릭 후 이동이 필요할시 onClick prop을 통해 함수전달이 가능합니다

const Card = (prop: CardProps) => {
    const {children, className, onClick} = prop;
    return (
        <div className={`__Card-main-container ${className || ''}`} onClick={() => {
            if(onClick !== null && onClick !== undefined){
                onClick();
                }}}>
            {children}
        </div>
    )
}

export default Card;
