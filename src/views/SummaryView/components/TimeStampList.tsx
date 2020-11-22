import React, { useState } from 'react';
import SummaryCardTitle from './SummaryCardTitle';
import TimeStampListItem from './TimeStampListItem';


import { ITimerItem } from './TimerCard';

interface ITimeStampListProps {
    selectedTimestamp: string;
    setSelectedTimestamp: (timestamp: string) => void;
    storedTimestamp: ITimerItem[];
    setStoredTimestamp: (record: ITimerItem) => void;
}

const TimeStampList = (props: ITimeStampListProps) => {
    const { selectedTimestamp, setSelectedTimestamp, storedTimestamp, setStoredTimestamp } = props;
    return <div className="__timer-timestamp-list-container">
        <SummaryCardTitle text="타이머 기록" />
        <div className="__timer-timestamp-list-wrapper">
            {
                storedTimestamp.map((item, idx) => {
                    return <TimeStampListItem
                        key={idx}
                        timestamp={item}
                        selectedTimestamp={selectedTimestamp}
                        setSelectedTimestamp={setSelectedTimestamp} />
                })
            }
        </div>
    </div>
}



export default TimeStampList
