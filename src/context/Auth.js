import React, { useState, useEffect } from 'react';
import LoadingData from '../component/loading/data';
import { notify } from '../component/notification';
import { getToken, deleteToken, setToken, initAxiosInterceptors } from '../helpers/helper-auth';
import Axios from 'axios';
import { useHistory } from 'react-router';

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
                const { data } = await Axios.get('http://127.0.0.1:8000/api/userinfo');
                setUser(data);
                setLoadingUser(false);
            } catch (error) {
                history.push("/");
                setLoadingUser(false);
            }
        }
        loadUser();
    }, [loadingUser]);

    async function login(credentials) {
        const { data } = await Axios.post('http://127.0.0.1:8000/api/login', credentials);
        setToken(data.access_token);
        setUser(data.user);
    }

    async function signup(usuario) {
        const { data } = await Axios.post('http://127.0.0.1:8000/api/register', usuario);
        setToken(data.access_token);
        setUser(data.user);
    }

    async function login1(data) {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
        let resp = await response.json();
        if (resp.access_token) {
            setToken(resp.access_token);
            setUser(resp.user);
        }
        else {
            notify('error', resp.response);
        }
    }

    async function signup1(data) {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
        let resp = await response.json();
        if (resp.access_token) {
            setToken(resp.access_token);
            setUser(resp.user);
        }
        else {
            logout()
        }
    }

    function logout() {
        deleteToken(null);
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
            value={{ login, signup, user, logout, }}
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