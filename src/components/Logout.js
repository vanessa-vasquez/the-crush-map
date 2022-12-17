import React from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button id="log-out-btn" onClick={handleLogOut}>
      Log Out
    </button>
  );
}
