import React, { useEffect } from 'react'
import * as API from '../../api';
import { Logo, Card } from '../../components';
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
            <Card>
            </Card>
        </div>
    )
}

export default MainView;
