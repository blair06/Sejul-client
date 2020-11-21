import React, { useState } from 'react';
import { Card, CustomButton } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';

const Timer = () => {
    const [timerState, setTimerState] = useState(false);
    const [timer, setTimer] = useState("00:00:00");

    return <div className="__timer-container">
        <SummaryCardTitle text="타이머" />
        <p className="__timer-text">00:00:00</p>
        <div className="__timer-buttons-container">
            <CustomButton className="__timer-btn start" text="시작" onClick={() => { }} />
            {/* <CustomButton className="__timer-btn pause" text="중지" onClick={() => { }} /> */}
            <CustomButton className="__timer-btn finish" text="종료" onClick={() => { }} />
        </div>
    </div>
}
export default Timer
