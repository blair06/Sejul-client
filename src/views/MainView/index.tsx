import React, { useEffect } from 'react'
import * as API from '../../api';
import { Logo, Card ,RoundedCard } from '../../components';
import './scss/MainCommon.scss';
import mainBanner from '../../assets/img/main-banner.png';

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
            <div className="main-banner">
                <img src={mainBanner}></img>
            </div>
            <div className="main-contents-container">
                <p className="main-contents-header">최근에 작성된 글</p>
                <p className="main-contents-header">해시 태그</p>
                <div className="main-hashtag">
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                <RoundedCard className = "add" cancelable = {true}>
                    #해시태그
                </RoundedCard>
                    
                </div>
                <p className="main-contents-header">활동이 많은 사용자들</p>
            </div>
        </div>
    )
}

export default MainView;
