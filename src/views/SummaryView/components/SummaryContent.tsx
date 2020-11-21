import React, { useEffect, useState } from 'react'

interface ISummaryContentProps {
    content: string;
    onChange: (content: string) => void;
}

/**
 * @description 요약 글 관리 부 
 */
const SummaryContent = (props: ISummaryContentProps) => {
    // 제한 글 수 
    const SUMMARAY_CONTENT_MAX_LEN = 5000;
    const { content, onChange } = props;
    // 컨텐츠 글자 수 
    const [len, setLen] = useState(0);
    // 글 입력 시 글자 수 체크
    const updateContent = (t: string) => {
        if (t.length > SUMMARAY_CONTENT_MAX_LEN) {
            alert(`내용은 ${SUMMARAY_CONTENT_MAX_LEN}자를 넘을 수 없습니다`);
            return;
        }
        onChange(t);
    }
    
    // 콘텐츠가 변경되면 글자 수를 변경 함
    useEffect(() => {
        setLen(content.length);
    }, [content]);
    return (
        <div className="__summary-content-container">
            <textarea className="__summary-content" placeholder="내용을 입력하세요" value={content}
                onChange={(e) => updateContent(e.target.value)}>
            </textarea>
            <p className="__summary-content-length">{len}/{SUMMARAY_CONTENT_MAX_LEN}자</p>
        </div>
    )
}

export default SummaryContent
