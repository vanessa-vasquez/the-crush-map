import { React, useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import '../styles/Auth.css';
import cytoscape from 'cytoscape';
import { useAuth } from '../contexts/AuthContext.js';
import { auth } from '../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom';
import spread from 'cytoscape-spread';

cytoscape.use(spread);

export default function SignUp() {
  const [uni, setUni] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cytoscape({
      container: document.getElementById('home-cy'),
      elements: [
        {
          data: { id: 'you' }
        },
        {
          data: { id: 'me' }
        },
        {
          data: { id: 'love', source: 'you', target: 'me' }
        }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(id)'
          }
        }
      ]
    });
  }, []);

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
    <Container>
      <Row>
        <Col md={12} className="text-center">
          <Alert id="warning" key="warning" variant="warning">
            For security reasons, please use a secure password that is not affiliated with your
            Columbia account.
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="d-none d-sm-none d-md-block" id="home-cy"></div>
        </Col>
        <Col xs={12} md={6} className="text-center">
          <span className="page-type-title">Sign Up</span>
          {error && (
            <Alert id="error" key="danger" variant="danger">
              {error}
            </Alert>
          )}
          <form id="sign-up-form" onSubmit={addUser}>
            <input
              type="text"
              id="uni-input"
              name="uni"
              onChange={(e) => setUni(e.target.value)}
              placeholder="Columbia UNI"
            />{' '}
            <br />
            <input
              type="password"
              id="pass-input"
              name="pass"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              placeholder="Password"
            />{' '}
            <br />
            <span>
              Already have an account? <NavLink to="/login">Login here!</NavLink>
            </span>{' '}
            <br />
            <input id="sign-up-btn" disabled={loading} type="submit" value="Sign Up" />
          </form>
        </Col>
      </Row>
    </Container>
  );
}
