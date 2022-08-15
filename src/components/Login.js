import { React, useState } from 'react';
import Header from './Header';
import { auth } from '../firebase.js';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.js';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const [uni, setUni] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const logUser = async (e) => {
    e.preventDefault();

    const email = uni + '@columbia.edu';

    try {
      setError('');
      setLoading(true);
      await login(auth, email, pass);
      navigate('/map');
    } catch (error) {
      console.log(error);
      setLoading(false);
      return setError('Failed to login. Please make sure your UNI and password are correct.');
    }

    setLoading(false);
  };

  return (
    <div className="home">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="login-container">
            <Header />
            <div className="text-center">
              {error && (
                <Alert id="error" key="danger" variant="danger">
                  {error}
                </Alert>
              )}
              <div className="title">Login</div>
              <form id="login-form" onSubmit={logUser}>
                <input
                  type="text"
                  id="uni-input"
                  name="uni"
                  onChange={(e) => setUni(e.target.value)}
                  placeholder="Enter your Columbia UNI"
                />
                <br />
                <input
                  type="password"
                  id="pass-input"
                  name="pass"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                />
                <br />
                <input id="login-btn" disabled={loading} type="submit" value="Sign In" />
                <div>
                  {"Don't have an account?"} <NavLink to="/">Sign up here</NavLink>
                </div>
              </form>
            </div>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}
