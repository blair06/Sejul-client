import React, { useEffect } from 'react'
import * as API from '../../api';


const MainView = () => {
    const test = async () => {
        const response = await API.Summary.fetchAll();
        console.log(response);
    }
    useEffect(() => {
        test();
    }, [])
    return (
        <div>
            <p>
                Hello
        </p>
        </div>
    )
}

export default MainView;
