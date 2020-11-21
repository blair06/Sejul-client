import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { CustomButton } from '../../components';
import SummaryContent from './components/SummaryContent';
import ArticleCard from './components/ArticleCard';
import TimerCard from './components/TimerCard';
import HashtagCard from './components/HashtagCard';

import './scss/summary.scss';

const SummaryView = () => {
    const matches = useRouteMatch();

    const [content, setContent] = useState("");

    return (
        <div className="__summary-view-container">
            <div className="__summary-view-wrapper">
                {/* 요약 내용 작성 */}
                <SummaryContent content={content} onChange={(content) => { setContent(content) }} />
                <div className="__summary-components-container">
                    <div className="__summary-components-wrapper">
                        {/* 기사 정보 카드  */}
                        <ArticleCard />
                        {/* 타이머 카드 */}
                        <TimerCard />
                        {/* 해시태그 카드 */}
                        <HashtagCard />
                        {/* 저장 버튼 */}
                        <CustomButton className="__article-submit-btn" text="저장" onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryView;

