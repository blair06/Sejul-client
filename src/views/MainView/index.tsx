import React, { useEffect } from 'react'
import * as API from '../../api';
import { Logo } from '../../components';
import { Card } from '../../components';
import './scss/MainCommon.scss';

const MainView = () => {
    const test = async () => {
        const response = await API.Summary.fetchAll();
        console.log(response);
    }
    useEffect(() => {
        test();
    }, [])
    return (
        <div className="main-view-container">
            <Logo />
            {/*  */}
            <Card className="add">
                <div className="test">이것은 테스트</div>
                <div>이것도 테스트이다</div>
                <div>이것은 테스트333</div>
            </Card>
        </div>
    )
}

export default MainView;
