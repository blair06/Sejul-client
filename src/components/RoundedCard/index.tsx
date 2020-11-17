import React, {ReactNode} from 'react'
import './RoundedCard.scss';

interface RoundedCardProps {
    children?: ReactNode;
    className?: string;
    onClick?: Function;
    cancelable?: boolean;
}

const RoundedCard = (props: RoundedCardProps) => {
    const {children, className, onClick, cancelable} = props;
    return (
        <div className={`__Rounded-Card-main-container ${className || ''}`} onClick={() => {
            if(onClick !== null && onClick !== undefined){
                onClick();
                }}
            }>
                {cancelable?<div className="__Rounded-Card-cancle" >#{children} X</div>:<p>#{children}</p>}
            
        </div>
    )
}

export default RoundedCard;
