import React from 'react'

const SummaryContent = () => {
    return (
        <div className="__summary-content-container">
            <textarea className="__summary-content" placeholder="내용을 입력하세요" >
            </textarea>
            <p className="__summary-content-length">23/3000자</p>
        </div>
    )
}

export default SummaryContent
