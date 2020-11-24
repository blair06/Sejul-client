import React, { Children, ReactNode } from 'react';
import './signinput.scss';

interface ISignInpuProps {
    value: string,
    setValue: (value: string) => void,
    type: string,
    children: ReactNode,
    placeholder: string;
}

const SignInput = (props: ISignInpuProps) => {
    const { children, value, setValue, type = "text", placeholder } = props;
    return (
        <div className="__sign-form-item">
            {children}
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
        </div>
    )
}

export default SignInput;
