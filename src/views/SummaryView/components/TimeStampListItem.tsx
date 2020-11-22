import React from 'react';
import { CustomButton } from '../../../components';
import moment from 'moment';

import { ITimerItem } from './TimerCard';
interface ITimestampListItemProps {
    timestamp: ITimerItem;
    selectedTimestamp: string;
    setSelectedTimestamp: (record: string) => void;
}

const TimeStampListItem = (props: ITimestampListItemProps) => {
    const { timestamp, selectedTimestamp, setSelectedTimestamp } = props;
    return (<div className="__timer-timestamp-item-container">
        <p className="__timestamp-text">{timestamp.text}</p>
        <p className="__timestamp-created-at">{moment(timestamp.createdAt).fromNow()}</p>
        {
            selectedTimestamp === timestamp.text ?
                <CustomButton className="__timestamp-btn delete" text="취소" onClick={() => {
                    setSelectedTimestamp("");
                }} /> :
                <CustomButton className="__timestamp-btn" text="선택" onClick={() => {
                    setSelectedTimestamp(timestamp.text);
                }} />

        }
    </div>)
}


export default TimeStampListItem;
