import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CustomButton } from '../../../components';
import SummaryCardTitle from './SummaryCardTitle';

import { ITimerItem } from './TimerCard';

enum TIMER_STATE {
    IDLE,
    STARTED,
    PAUSE,
}

interface ITimerProps {
    onRecordCreated: (record: ITimerItem) => void;
}

const Timer = (props: ITimerProps) => {
    const { onRecordCreated } = props;
    const [timerState, setTimerState] = useState(TIMER_STATE.IDLE);
    const [seconds, setSeconds] = useState(0);
    const [displayTimer, setDisplayTimer] = useState("00:00:00");

    const fn = {
        start: () => {
            // 시작 했을 경우 
            setTimerState(TIMER_STATE.STARTED);
        },
        pause: () => {
            // 중지 했을 경우
            setTimerState(TIMER_STATE.PAUSE);
        },
        finish: () => {
            // 완전히 종료된 경우
            onRecordCreated({
                text: displayTimer,
                createdAt: new Date()
            });
            setDisplayTimer("00:00:00");
            setSeconds(0);
            setTimerState(TIMER_STATE.IDLE);

        },
        cancel: () => {
            // 취소한 경우 
            setDisplayTimer("00:00:00");
            setSeconds(0);
            setTimerState(TIMER_STATE.IDLE);
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timerState === TIMER_STATE.STARTED) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        else {
            if (interval !== null) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [
        timerState
    ]);

    useEffect(() => {
        setDisplayTimer(moment.utc(seconds * 1000).format('HH:mm:ss'));
    }, [seconds]);

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
