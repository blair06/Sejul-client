import React, { useState } from 'react';
import { Card } from '../../../components';
import '../scss/TimerCard.scss';

import Timer from './Timer';
import TimeStampList from './TimeStampList';

export interface ITimestampData {
    start: Date,
    finish: Date
}

interface ITimerCardProps {
    timestamp: ITimestampData,
    setTimestamp: (timestamp: ITimestampData) => void
}

/**
 * @description 타이머 관련 부분
 */
const TimerCard = (props: ITimerCardProps) => {
    // 실제 입력될 타이머 
    const { timestamp, setTimestamp } = props;

    const fn = {
        onCreateNewRecord: (record: ITimestampData) => {

        }
    }

    return (
        <Card className="__article-timer-card">
            <div className="__article-timer-wrapper">
                <div className="__article-timer">
                    <Timer />
                    <TimeStampList selectedTimestamp={timestamp} setSelectedTimestamp={setTimestamp} />
                </div>
            </div>
        </Card>
    )
}

export default TimerCard
