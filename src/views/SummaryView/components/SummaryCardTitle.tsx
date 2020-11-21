import React from 'react';

interface ISummaryCardTitleProps {
    text: string;
    className?: string;
}

const SummaryCardTitle = (props: ISummaryCardTitleProps) => {
    return (
        <h1 className="__summary-card-title">{
            props.text
        }</h1>
    );
}

export default SummaryCardTitle;