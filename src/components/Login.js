import { React, useState } from 'react';
import Header from './Header'; 
import { auth } from '../firebase.js'; 
import { Container, Row, Col, Alert } from 'react-bootstrap'; 
import '../styles/Auth.css'; 
import { useAuth } from '../contexts/AuthContext.js'; 
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login(){
    const [uni, setUni] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false)
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const logUser = async (e) => {
        e.preventDefault();
        console.log("hey");

        let email = uni + '@columbia.edu'; 

        try {
            setError('');
            setLoading(true);
            await login(auth, email, pass);
            navigate('/map');
        } catch (error){
            console.log(error);
            setLoading(false);
            return setError('Failed to login. Please make sure your UNI and password are correct.');
        }

        setLoading(false)
    }

    return (
        <Container>
            <Row>
                <Header />
                <Col md={12} className="text-center">
                    {error && <Alert id="error" key="danger" variant="danger">{error}</Alert>}
                    <span className='page-type-title'>Login</span>
                    <form id="login-form" onSubmit={logUser}>
                        <input type="text" id="uni-input" name="uni" onChange={(e) => setUni(e.target.value)} placeholder='Columbia UNI' /> <br />
                        <input type="password" id="pass-input" name="pass" onChange={(e) => setPass(e.target.value)} placeholder='Password' /> <br />
                        <span>Don't have an account? <NavLink to="/">Sign up here!</NavLink></span> <br />
                        <input id="login-btn" disabled={loading} type="submit" value="Login" />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}