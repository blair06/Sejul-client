import React, { useEffect } from 'react';
import { Logo, Card, CustomButton } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import * as API from '../../api';

import { useDispatch } from 'react-redux';
import { useUserInfo } from '../../lib/hooks';

const NewSignInView = () => {
    const user = useUserInfo();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (user !== null) {
            history.push("/");
        }
    }, []);

    return (
        <div>

        </div>
    )
}

export default NewSignInView;
