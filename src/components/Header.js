import React from 'react';
import { Image } from 'react-bootstrap';
import '../styles/Header.css';

import logo from '../assets/crush_map_logo.svg';

export default function Header() {
  document.body.style.backgroundColor = 'white';

  return (
    <div className="header-container">
      <div>
        <Image src={logo} className="logo" fluid="true" />
      </div>
      <div className="header-text">
        <div className="title">the crush map.</div>
        <div className="desc">
          A graph visualization of student <br />
          crushes in the CU community
        </div>
      </div>
    </div>
  );
}
