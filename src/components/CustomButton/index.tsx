import React from 'react'
import './CustomButton.scss';

interface ICustomButtonProps {
    // 클래스 이름
    className?: string;
    // 버튼에 표기되는 텍스트 
    text: string;
    // 클릭했을 때 실행되는 함수 
    onClick: Function;
}

const CustomButton = (prop: ICustomButtonProps) => {
    const { className, text, onClick } = prop;

    return (
        <button className={
            `__custom-btn ${className || ''}`
        } type='button' onClick={() => onClick()}>
            { text}
        </button>
    )
}

export default CustomButton;
