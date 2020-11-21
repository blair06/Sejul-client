import React from 'react';
import { CustomButton, Card } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import '../scss/ArticleCard.scss';

const ArticleCard = () => {
    return (
        <Card className="__article-info-card">
            <div className="__article-info-card-wrapper">
                <div className="__article-title-container">
                    <SummaryCardTitle text="기사 제목" />
                    <textarea className="article-input" placeholder="기사 제목을 입력하세요"></textarea>
                </div>
                <div className="__article-link-container">
                    <SummaryCardTitle text="기사 링크" />
                    <textarea className="article-link-input" placeholder="기사 링크를 넣어주세요"></textarea>
                </div>
            </div>
        </Card>
    )
}

export default ArticleCard
