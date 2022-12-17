import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CrushMap from './components/CrushMap';
import Login from './components/Login';
import PrivateLoggedOut from './components/PrivateLoggedOut';
import PrivateLoggedIn from './components/PrivateLoggedIn';
import { AuthProvider } from './contexts/AuthContext.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLoggedIn>
              <App />
            </PrivateLoggedIn>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateLoggedOut>
              <CrushMap />
            </PrivateLoggedOut>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateLoggedIn>
              <Login />
            </PrivateLoggedIn>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);
