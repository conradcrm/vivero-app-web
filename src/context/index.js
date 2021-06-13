import React from 'react';
import { AuthProvider } from './Auth';

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}