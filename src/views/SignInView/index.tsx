import React, { useEffect, useState } from 'react'
import './scss/SignIn.v2.scss';
import * as API from '../../api';
import { CustomButton } from '../../components';

interface ILoginFieldInputProps {
    id: string,
    labelText: string,
}

const LoginFieldInput = (props: ILoginFieldInputProps) => {
    return <div id={props.id}>
        <label>{props.labelText}</label>
        <input type="text" />
    </div>;
}

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
                        <LoginFieldInput id="login_ID" labelText="아이디를 입력해주세요" />
                        <LoginFieldInput id="login_pw" labelText="비밀번호를 입력하세요" />

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
