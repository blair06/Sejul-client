import React from 'react';
import { CustomButton, Card } from '../../components';
import SummaryCardTitle from './components/SummaryCardTitle';
import ArticleCard from './components/ArticleCard';
import TimerCard from './components/TimerCard';
import HashtagCard from './components/HashtagCard';

import './scss/summary.scss';

const SummaryView = () => {
    return (
        <div className="__summary-view-container">
            <div className="__summary-view-wrapper">
                <div className="__summary-content-container">
                    <textarea className="__summary-content" placeholder="내용을 입력하세요" >
                    </textarea>
                </div>
                <div className="__summary-components-container">
                    <div className="__summary-components-wrapper">
                        {/* 기사 정보 카드  */}
                        <ArticleCard />
                        {/* 타이머 카드 */}
                        <TimerCard />
                        {/* 해시태그 카드 */}
                        <HashtagCard />
                        <CustomButton className="__article-submit-btn" text="저장" onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryView;

