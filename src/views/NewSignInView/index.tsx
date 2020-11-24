import React, { useEffect, useState } from 'react';
import { Logo, Card, CustomButton, SignInput } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import * as API from '../../api';

import { useDispatch } from 'react-redux';
import { useUserInfo } from '../../lib/hooks';
import { } from '../../modules/Auth/reducer';

import './scss/NewSignInView.scss';

const NewSignInView = () => {
    const user = useUserInfo();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user !== null) {
            history.push("/");
        }
    }, [user]);

    const fn = {
        signin: async () => {
            if (email.trim() === "" || password.trim() === "") {
                alert("이메일 혹은 패스워드를 확인해주세요");
            }
            else {
                try {
                    await API.Auth.signin(email, password);
                    window.location.href = "/";
                }
                catch (e) {
                    if (e.response !== undefined && e.response.status === 400) {
                        alert("이메일 혹은 패스워드를 확인해주세요");
                    }
                    else {
                        alert("로그인 중 오류가 발생했습니다");
                    }
                }
            }
        }
    }

    return (
        <div className="__signin-view-container">
            <Card className="signin-card-container">
                <div className="signin-card-wrapper ">
                    <Logo className="signin-logo" />
                    <div className="signin-form-container">
                        <SignInput value={email} setValue={setEmail} type="email" placeholder="이메일을 입력해주세요">
                            <MdEmail />
                        </SignInput>

                        <SignInput value={password} setValue={setPassword} type="password" placeholder="패스워드를 입력해주세요">
                            <RiLockPasswordFill />
                        </SignInput>
                    </div>
                    <div className="signin-card-btns">
                        <CustomButton className="signin-card-btn " text="로그인" onClick={fn.signin} />
                        <CustomButton className="signin-card-btn kakao" text="카카오 로그인" onClick={() => {
                            // window.open("http://34.64.70.82/api/auth/kakao/signin");
                        }} />
                        <CustomButton className="signin-card-btn signup" text="회원가입" onClick={() => {
                            history.push("/signup");
                        }} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default NewSignInView;
