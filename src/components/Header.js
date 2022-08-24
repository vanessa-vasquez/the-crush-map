import React from 'react';
import { Image } from 'react-bootstrap';
import '../styles/Header.css';

import web_logo from '../assets/crush_map_logo.svg';
import mobile_logo from '../assets/crush_heart.svg';

export default function Header() {
  return (
    <div className="header-container">
      <div className="d-block d-lg-none">
        <Image src={mobile_logo} className="logo" fluid="true" />
      </div>
      <div className="d-none d-lg-block">
        <Image src={web_logo} className="logo" fluid="true" />
      </div>
      <div className="header-text">
        <div className="title">the crush map.</div>
        <div className="d-none d-lg-block desc">
          A graph visualization of student crushes in the CU community
        </div>
      </div>
    </div>
  );
}
