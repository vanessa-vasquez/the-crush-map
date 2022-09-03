import React from 'react';
import logo from '../assets/crush_map_logo_white.svg';
import '../styles/Header.css';
import { Image } from 'react-bootstrap';

export default function MapHeader() {
  return (
    <>
      <div className="header-container">
        <div className="d-block d-lg-none">
          <Image src={logo} className="logo" fluid="true" />
        </div>
        <div className="d-none d-lg-block">
          <Image src={logo} className="logo" fluid="true" />
        </div>
        <div className="header-text">
          <div className="title">the crush map.</div>
          <div className="d-none d-lg-block desc">
            A graph visualization of student crushes in the CU community
          </div>
        </div>
      </div>
    </>
  );
}
