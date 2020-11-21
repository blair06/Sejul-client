import React, { useState } from 'react';
import { Card, CustomButton } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';
import TimeStampListItem from './TimeStampListItem';

const TimeStampList = () => {
    return <div className="__timer-timestamp-list-container">
        <SummaryCardTitle text="타이머 기록" />
        <div className="__timer-timestamp-list-wrapper">
            <TimeStampListItem />
            <TimeStampListItem />
            <TimeStampListItem />
            <TimeStampListItem />
            <TimeStampListItem />
            <TimeStampListItem />
        </div>
    </div>
}



export default TimeStampList
