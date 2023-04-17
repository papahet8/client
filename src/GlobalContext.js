import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import UserApi from './API/UserApi';

export const GlobalContext = createContext();


function DataProvider(props) {
    const [token, setToken] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('loginStatus')) {
            const refToken = async () => {
                const res = await axios.get(`/api/auth/refToken`);
                console.log(`token =`, res.data);
                setToken(res.data.accessToken);
                setTimeout(() => {
                    refToken();
                }, 10 * 60 * 1000);
            };
            refToken();
        }
    }, []);


    let data = {
        token: [token, setToken],
        userAPI: UserApi(token),
        isAdmin: [isAdmin, setIsAdmin]
    }

    return (
        <GlobalContext.Provider value={data}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default DataProvider