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
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
