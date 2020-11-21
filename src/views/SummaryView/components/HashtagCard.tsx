import React from 'react';
import { Card } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import '../scss/HashtagCard.scss';

import { IoMdClose } from 'react-icons/io';

const HashtagListItem = () => {
    return <div className="__hashtag-item-container">
        <p className="__hashtag-item-text">#해시</p>
        <button className="__hashtag-item-remove" type="button">
            <IoMdClose />
        </button>
    </div>;
}

const HashtagCard = () => {
    return (
        <Card className="__article-hashtags-card">
            <div className="__article-hashtags-wrapper">
                <SummaryCardTitle text="해시태그" />
                <div className="__article-hashtags-items-container">
                    <input type="text" className="__article-hashtag-input" placeholder="해시태그 입력" />
                    <HashtagListItem />
                    <HashtagListItem />
                    <HashtagListItem />
                    <HashtagListItem />
                    <HashtagListItem />
                </div>
            </div>
        </Card>
    )
};

export default HashtagCard
