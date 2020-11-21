import React from 'react';
import { CustomButton } from '../../../components';

const TimeStampListItem = () => {
    return (<div className="__timer-timestamp-item-container">
        <p className="__timestamp-text">99:99:99</p>
        <p className="__timestamp-created-at">20분전</p>
        {/* <CustomButton className="__timestamp-btn" text="선택" onClick={() => { }} /> */}
        <CustomButton className="__timestamp-btn delete" text="취소" onClick={() => { }} />
    </div>)
}


export default TimeStampListItem;
