import React, { useState } from 'react';
import { Card } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import '../scss/TimerCard.scss';

import Timer from './Timer';
import TimeStampList from './TimeStampList';

const TimerCard = () => {
    return (
        <Card className="__article-timer-card">
            <div className="__article-timer-wrapper">
                <div className="__article-timer">

                    <Timer />
                    <TimeStampList />
                </div>
            </div>
        </Card>
    )
}

export default TimerCard
