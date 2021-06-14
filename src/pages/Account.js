import React from 'react'
import HeaderBarTitle from '../component/headerbar/tittle'
import { notify } from '../component/notification';
import { useAuth } from '../context/Auth';

export default function Profile({ history }) {
    const { user, logout } = useAuth();
    async function closeSession() {
        try {
            await logout();
            history.push('/');
        } catch (error) {
            notify("error", `Ha ocurrido un error, inténtelo más tarde. ${error}`);
        }
    }

    return (
        <div>
            <HeaderBarTitle module="Perfil" />
            
        </div>
    )
}
