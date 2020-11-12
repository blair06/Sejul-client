import React, { ReactNode } from 'react'
import './Card.scss';

interface ICardProps {
    children?: ReactNode;
    className?: string;
    onClick?: Function;
}
const Card = (props: ICardProps) => {
    const { children, className, onClick } = props;
    return (
        <div className={`__card-container ${className || ''}`} onClick={
            () => {
                if (onClick) {
                    onClick();
                }
            }
        }>
            {
                children
            }
        </div>
    )
}

export default Card;
