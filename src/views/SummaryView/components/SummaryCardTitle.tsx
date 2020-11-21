import React from 'react';

interface ISummaryCardTitleProps {
    text: string;
    className?: string;
}

/**
 * @description 자주 사용되는 요약 컴포넌트 부분 헤더
 */
const SummaryCardTitle = (props: ISummaryCardTitleProps) => {
    return (
        <h1 className="__summary-card-title">{
            props.text
        }</h1>
    );
}

export default SummaryCardTitle;