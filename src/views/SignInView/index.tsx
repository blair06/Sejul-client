import React, { useEffect, useState } from 'react'
import './scss/SignIn.v2.scss';
import * as API from '../../api';
import { CustomButton } from '../../components';

const SignInView = () => {
    useEffect(() => {
        // fn();
    }, []);

    return (
        <div id="container" className="signin-view-container">
            <div className="wrap_form">
                <h1 id="login_logo">
                    <span className="lo_lo"><img src="img/logo.png" /></span>
                </h1>
                <form id="login_form">
                    <fieldset className="login_field">
                        <div id="login_ID">
                            <label>아이디를 입력하세요</label>
                            <input type="text" />
                        </div>
                        <div id="login_pw">
                            <label>비밀번호를 입력하세요</label>
                            <input type="password" />
                        </div>

                        <div className="wrap_btn">

                            <CustomButton className="login_btn" text='로그인' onClick={() => console.log('clicked')} />
                            <CustomButton className="kakao_btn" text='카카오로 로그인' onClick={() => console.log('clicked')} />
                            <CustomButton className="join_btn" text='회원가입' onClick={() => console.log('clicked')} />

                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default SignInView;
