import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateLoggedIn({ children }) {
    const { currentUser } = useAuth();
  
    return !currentUser ? children : <Navigate to="/map" />;
}