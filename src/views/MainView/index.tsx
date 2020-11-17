import React, {useState, useEffect } from 'react'
import * as API from '../../api';
import { Logo, Card ,RoundedCard,CircularImage } from '../../components';
import './scss/MainCommon.scss';
import {ISummary } from '../../api/interfaces/ISummary';
import mainBanner from '../../assets/img/main-banner.png';
import MainSlider from './MainSlider';

import { default as Slider} from "react-slick";

const MainView = () => {
    const [posts, setPosts] = useState<ISummary[]>([]);
    const getPosts = async () => {
        try {
            const result = await API.Summary.fetchAll();
            console.log(result);
            setPosts(result);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div className="main-view-container">
            <div className="main-banner">
                <img src={mainBanner}></img>
            </div>
            <div className="main-contents-container">
                <p className="main-contents-header">최근에 작성된 글</p>
                <div className="bar"></div>
                <div className="main-slider-recent">
                {posts.length >= 0 ? (
                        posts.map((post) => (
                            <MainSlider
                                key={1}
                                article = {post.article}
                                user = {post.user.username}
                                
                                deviceType="desktop"
                            />
                        ))
                    ) : (
                        <p className="main-slider-placeholder">등록된 질문이 없습니다</p>
                    )}
                    
                </div>
                <p className="main-contents-header">해시 태그</p>
                <div className="bar"></div>
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
                <div className="bar"></div>
                <div className="main-slider-user">
                    {/* <MainSlider deviceType="desktop">{CircularImage}<p className="main-slider-user-name">이름</p> */}
                    {/* <p className="main-slider-user-follow">팔로우 10</p>
                    <p className="main-slider-user-text">작성수 3</p></MainSlider> */}
                    
                </div>
            </div>
        </div>
    )
}

export default MainView;
