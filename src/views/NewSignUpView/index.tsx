import React, { useEffect, useState } from 'react';
import { Logo, Card, CustomButton, SignInput } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import * as API from '../../api';
import { Validator as VALIDATOR } from '../../lib';

import { useDispatch } from 'react-redux';
import { useUserInfo } from '../../lib/hooks';
import { } from '../../modules/Auth/reducer';

import './scss/NewSignUpView.scss';

const NewSignUpView = () => {
    const user = useUserInfo();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    useEffect(() => {
        if (user !== null) {
            history.push("/");
        }
    }, [user]);

    const fn = {
        validate: () => {
            if (!VALIDATOR.isEmail(email)) {
                alert("이메일을 확인해주세요");
                return false;
            }
            else if (!VALIDATOR.isUsername(username)) {
                console.log(username, VALIDATOR.isUsername);
                alert("유저명을 확인해주세요. 5~20자 이내의 영/숫자만 가능합니다");
                return false;
            }
            else if (!VALIDATOR.isPassword(password)) {
                alert("패스워드를 확인해주세요");
                return false;
            }
            else if (!VALIDATOR.comparePassword(password, passwordConfirm)) {
                alert("패스워드가 일치하지 않습니다");
                console.log(password, passwordConfirm)
                return false;
            }
            else {
                return true;
            }
        },
        signup: async () => {
            if (fn.validate()) {
                try {
                    await API.Auth.signup({
                        email: email,
                        username: username,
                        password: password,
                        validPassword: passwordConfirm
                    });

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
                        <SignInput value={username} setValue={setUsername} type="text" placeholder="유저 이름을 입력해주세요">
                            <FaUser />
                        </SignInput>
                        <SignInput value={password} setValue={setPassword} type="password" placeholder="패스워드를 입력해주세요">
                            <RiLockPasswordFill />
                        </SignInput>
                        <SignInput value={passwordConfirm} setValue={setPasswordConfirm} type="password" placeholder="확인용 패스워드를 입력해주세요">
                            <RiLockPasswordFill />
                        </SignInput>
                    </div>
                    <div className="signin-card-btns">
                        <CustomButton className="signin-card-btn " text="가입" onClick={fn.signup} />
                        <CustomButton className="signin-card-btn signup" text="로그인" onClick={() => {
                            history.push("/signin");
                        }} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default NewSignUpView;
