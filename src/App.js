import React from 'react';
import { useAuth } from './context/Auth';
import { LogoutRoutes, Modules } from './routes';
import Notification from './component/notification';
import LoadingData from './component/loading/data';
import "./App.css";
import "./index.css";

export default function App() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <div className="h-screen">
        <LoadingData />
      </div>
    );
  }

  return (
    <>
      {user ? <Modules /> : <LogoutRoutes />}
      <Notification />
    </>
  );
}


