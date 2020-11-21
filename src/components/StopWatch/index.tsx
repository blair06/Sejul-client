import React,{useState,useRef} from 'react';


const StopWatch = () => {


    const [record,setRecrod]= useState([]);
    const [timer,setTimer] = useState(3595);
    const [isActive,setIsActive] = useState(false);
    const [isPaused,setIsPaused] = useState(false);
    const countRef= React.useRef<HTMLInputElement | null>(null);
// timer 함수
    const formatTimer = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer/60)}`
        const getMinutes = `0${(+minutes % 60)}`.slice(-2);
        const getHours = `0${Math.floor(timer/3600)}`.slice(-2);
        
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }




// timer button 함수
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);

        
    }
    const handlePause = () => {

        setIsPaused(false)
    }
    const handleResume = () => {
        setIsPaused(true)

    }
    const handleReset = () => {

        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }


    return(
        <>
        <div className="__timer-container">
            <div className ="__timer-container-wrap">
                <p className="__header">타이머</p>
                <div className = "__timer-time">
                    <p className = "__timer">{formatTimer()}</p>
                </div>
            <div className = "__timer-button-wrap">
                {
                    !isActive && !isPaused ?
            <button onClick={handleStart}>Start</button> :
         isPaused? <button onClick={handlePause}>Pause</button>:
          <button onClick={handleResume}>Resume</button>
                          }          <button onClick={handleReset}>Reset</button>
            </div>
            <p className="__header">측정 기록</p>
            <div className="__timer-record-wrap">
                
            </div>
            </div>
        </div>
        </>
    )
}
export default StopWatch;