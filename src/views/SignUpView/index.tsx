import React from 'react';
import { CustomButton } from '../../components';

const SignUpView = () => {
    return (
        <div id="container" className="signin-view-container">
            <div className="wrap_form">
                <h1 id="signUp_logo">
                    <span className="lo_lo"><img src="img/logo.png" /></span>
                </h1>
                <form id="signUp_form">
                    <fieldset className="signUp_field">
                        <div id="signUp_ID">
                            <label>아이디를 입력하세요</label>
                            <input type="text" />
                        </div>
                        <div id="signUp_email">
                            <label>이메일을 입력하세요</label>
                            <input type="text" />
                        </div>
                        <div id="signUp_pw">
                            <label>비밀번호를 입력하세요</label>
                            <input type="password" />
                        </div>
                        <div id="signUp_pwch">
                            <label>비밀번호를 확인하세요</label>
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

export default SignUpView;

