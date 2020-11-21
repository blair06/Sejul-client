import React, { useState } from 'react';
import moment from 'moment';
import { Card, CustomButton } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';

enum TIMER_STATE {
    IDLE,
    STARTED,
    PAUSE,
}

const Timer = () => {
    const [timerState, setTimerState] = useState(TIMER_STATE.IDLE);
    const [startDT, setStartDT] = useState(undefined as Date | undefined);
    const [finishDT, setFinishDT] = useState(undefined as Date | undefined);
    const [displayTimer, setDisplayTimer] = useState("00:00:00");


    const fn = {
        start: () => {
            // 시작 했을 경우 
            setTimerState(TIMER_STATE.STARTED);
            setStartDT(new Date());
        },
        pause: () => {
            // 중지 했을 경우
            setDisplayTimer("00:00:00");
            setTimerState(TIMER_STATE.PAUSE);
        },
        finish: () => {
            // 완전히 종료된 경우
            setDisplayTimer("00:00:00");
            setTimerState(TIMER_STATE.IDLE);

        },
        cancel: () => {
            // 취소한 경우 
            setDisplayTimer("00:00:00");
            setTimerState(TIMER_STATE.IDLE);
        }
    }

    return <div className="__timer-container">
        <SummaryCardTitle text="타이머" />
        <p className="__timer-text">{displayTimer}</p>
        <div className="__timer-buttons-container">
            {
                timerState === TIMER_STATE.STARTED ?
                    <CustomButton className="__timer-btn pause" text="중지" onClick={fn.pause} />
                    :
                    <CustomButton className="__timer-btn start" text="시작" onClick={fn.start} />
            }
            <CustomButton className="__timer-btn cancel" text="취소" onClick={fn.cancel} />
            <CustomButton className="__timer-btn finish" text="종료" onClick={fn.finish} />
        </div>
    </div>
}
export default Timer
