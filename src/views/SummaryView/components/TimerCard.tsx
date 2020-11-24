import React, { useState } from 'react';
import { Card } from '../../../components';
import '../scss/TimerCard.scss';

import Timer from './Timer';
import TimeStampList from './TimeStampList';

interface ITimerCardProps {
    timestamp: string,
    setTimestamp: (timestamp: string) => void
}

export interface ITimerItem {
    text: string;
    createdAt: Date;
}

/**
 * @description 타이머 관련 부분
 */
const TimerCard = (props: ITimerCardProps) => {
    // 실제 입력될 타이머 
    const { timestamp, setTimestamp } = props;

    const [storedTimestamps, setStoredTimestamps] = useState([] as ITimerItem[]);

    const fn = {
        onRecordCreated: (record: ITimerItem) => {
            setStoredTimestamps([...storedTimestamps, record]);
        },
        onRemove: (record: ITimerItem) => {
            let idx = storedTimestamps.findIndex((item) => item.text === record.text);
            if (idx >= 0) {
                let cloned = [...storedTimestamps];
                cloned.splice(idx, 1);
                setStoredTimestamps([...cloned]);
            }
        }
    }

    return (
        <Card className="__article-timer-card">
            <div className="__article-timer-wrapper">
                <div className="__article-timer">
                    <Timer onRecordCreated={fn.onRecordCreated} />
                    <TimeStampList
                        selectedTimestamp={timestamp}
                        setSelectedTimestamp={setTimestamp}
                        storedTimestamp={storedTimestamps}
                        setStoredTimestamp={fn.onRemove}
                    />
                </div>
            </div>
        </Card>
    )
}

export default TimerCard
