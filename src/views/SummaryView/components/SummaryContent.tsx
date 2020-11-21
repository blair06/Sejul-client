import React, { useState } from 'react'


interface ISummaryContentProps {
    content: string;
    onChange: (content: string) => void;
}

const SUMMARAY_CONTENT_MAX_LEN = 3000;

const SummaryContent = (props: ISummaryContentProps) => {
    const { content, onChange } = props;
    const [len, setLen] = useState(0);
    const updateContent = (t: string) => {
        if (t.length > SUMMARAY_CONTENT_MAX_LEN) {
            alert(`내용은 ${SUMMARAY_CONTENT_MAX_LEN}자를 넘을 수 없습니다`);
            return;
        }
        onChange(t);
        setLen(t.length);
    }
    return (
        <div className="__summary-content-container">
            <textarea className="__summary-content" placeholder="내용을 입력하세요" value={content}
                onChange={(e) => updateContent(e.target.value)}>
            </textarea>
            <p className="__summary-content-length">{len}/3000자</p>
        </div>
    )
}

export default SummaryContent
