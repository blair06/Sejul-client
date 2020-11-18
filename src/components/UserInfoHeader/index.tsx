import React, { useEffect, useState } from 'react';
import * as API from '../../api';
import { useHistory, useParams } from 'react-router-dom';
import { IUser } from '../../api/interfaces';

interface IUserInfoHeaderParams {
    username: string;
}

const UserInfoHeader = () => {
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const fetch = async () => {
        // 404
        try {
            const currentParams = params as IUserInfoHeaderParams;
            const result = await API.User.fetch(currentParams.username);
            console.log(result);
        }
        catch (e) {
            if (e.response !== undefined && e.response.status === 404) {
                // 404 (NOT FOUND)면 뭐해라
                alert("사용자 정보가 없다");
                history.push("/");
            }
            else {
                // 그냥 서버에러 
                alert("일시적인 오류가 발생했다.\n잠시 후 실행해달라 ");
                history.push("/");
            }
        }
    }

    useEffect(() => {
        fetch();
    }, []);
    return (
        <div>
            <p>UserInfoHeader</p>
        </div>
    )
}

export default UserInfoHeader;
