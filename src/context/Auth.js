import React, { useState, useEffect } from 'react';
import LoadingData from '../component/loading/data';
import Axios from 'axios';
import { useHistory } from 'react-router';
import {
    getToken,
    deleteToken,
    setToken,
    deleteUserCurrent,
    setUserCurrent,
    initAxiosInterceptors,
} from '../helpers/helper-auth';


const AuthContext = React.createContext();
initAxiosInterceptors();

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    let history = useHistory();
    useEffect(() => {
        async function loadUser() {
            if (!loadingUser) {
                return;
            }
            if (!getToken()) {
                setLoadingUser(false);
                return;
            }
            try {
                const { data } = await Axios.get('http://127.0.0.1:8000/api/userinfo')
                setUser(data);
                setUserCurrent(data)
                setLoadingUser(false);
            } catch (error) {
                history.push("/");
                setLoadingUser(false);
            }
        }
        if (!user) {
            loadUser()
        }
    }, [loadingUser, history, user]);

    async function login(credentials) {
        const { data } = await Axios.post('http://127.0.0.1:8000/api/login', credentials);
        setToken(data.access_token);
        setUser(data.user);
        setUserCurrent(JSON.stringify(data.user))
    }

    async function update(credentials) {
        const { data } = await Axios.patch('http://127.0.0.1:8000/api/update-user', credentials);
        setUser(data.user);
        setUserCurrent(JSON.stringify(data.user))
        logout()
    }

    async function signup(usuario) {
        const { data } = await Axios.post('http://127.0.0.1:8000/api/register', usuario);
        setToken(data.access_token);
        setUser(data.user);
    }

    function logout() {
        deleteToken(null);
        deleteUserCurrent(null)
        setUser(null);
    }

    if (loadingUser) {
        return (
            <div className="h-screen">
                <LoadingData />
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{ login, signup, user, logout, update }}
            {...props} loadingUser
        />
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('Error Auth');
    }
    return context;
}