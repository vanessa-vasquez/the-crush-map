import { React, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext.js';
import { auth } from '../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom';

import '../styles/Auth.css';

export default function SignUp() {
  const [uni, setUni] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    if (!isUniValid(uni)) {
      return setError('Your Columbia UNI is not valid.');
    }

    if (pass.length < 6) {
      return setError('Your password must be at least 6 characters long.');
    }

    let email = uni + '@columbia.edu';

    try {
      setError('');
      setLoading(true);
      await signup(auth, email, pass);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return setError('Failed to create an account. Please try again.');
    }

    setLoading(false);

    navigate('/map');
  };

  const isUniValid = (uni) => {
    if (uni == '') {
      return false;
    }

    for (let i = 0; i < uni.length; i++) {
      if (uni.length == 6) {
        if (i < 2) {
          if (!uni[i].match(/[a-z]/i)) {
            return false;
          }
        } else {
          if (!(uni[i] >= '0' && uni[i] <= '9')) {
            return false;
          }
        }
      } else if (uni.length == 7) {
        if (i < 3) {
          if (!uni[i].match(/[a-z]/i)) {
            return false;
          }
        } else {
          if (!(uni[i] >= '0' && uni[i] <= '9')) {
            return false;
          }
        }
      } else {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="home">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="login-container">
            <Header />
            <div className="text-center">
              <Alert id="warning" key="warning" variant="warning">
                For security reasons, please use a secure password that is not affiliated with your
                Columbia account.
              </Alert>
              {error && (
                <Alert id="error" key="danger" variant="danger">
                  {error}
                </Alert>
              )}
              <div className="title">Sign Up</div>
              <form id="sign-up-form" onSubmit={addUser}>
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
                <input id="sign-up-btn" disabled={loading} type="submit" value="Create Account" />
                <div>
                  {'Already have an account?'} <NavLink to="/login">Login</NavLink>
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
