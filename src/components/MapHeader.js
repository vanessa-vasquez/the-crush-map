import React from 'react';
import { Container, Row, Col, Image, Popover, OverlayTrigger } from 'react-bootstrap';
import '../styles/Header.css'; 
import logo from '../assets/crush_map_logo_white.svg'; 

export default function MapHeader() {
    document.body.style.backgroundColor = "#ff5143";

    const popoverLeft = (
        <Popover id="popover-positioned-left" title="Information">
            "the crush map." is a graph visualization meant to illustrate the complicated network of
            student crushes at Columbia University. <br /> Start by adding a crush to the map.
            <strong> Don't worry! </strong> Your crush will not be able to see that you liked them nor can you see who 
            specifically has liked you. That is unless there's a match ;). <br /> What you are able to see are any anonymous admirers that you and other
            people may have.
        </Popover>
    );

    return (
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <div className='logo-container'>
                        <div>
                            <Image src={logo} className="logo" fluid="true" />
                        </div>
                        <div>
                            <span className='title d-none d-sm-none d-md-block'>the crush map.</span> <br />
                            <span className='desc d-none d-sm-none d-md-block'>A graph visualization of student crushes <br />
                            at Columbia University.</span>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="info">
                        <OverlayTrigger trigger="click" placement='bottom' overlay={popoverLeft}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-info-circle info-btn" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </OverlayTrigger>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}