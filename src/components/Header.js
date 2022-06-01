import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../styles/Header.css'; 

import logo from '../assets/crush_map_logo.svg'; 

export default function Header() {
    document.body.style.backgroundColor = "white";

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div className='logo-container'>
                        <div>
                            <Image src={logo} className="logo" fluid="true" />
                        </div>
                        <div className=''>
                            <span className='title d-md-block'>the crush map.</span> <br />
                            <span className='desc d-md-block'>A graph visualization of student crushes <br /> 
                            at Columbia University.</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}