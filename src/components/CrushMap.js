import React, { useEffect, useState } from 'react';
import MapHeader from './MapHeader';
import InsertBar from './InsertBar';
import Visualization from './Visualization';
import VisualizationControls from './VisualizationControls';
import CrushList from './CrushList';
import { useAuth } from '../contexts/AuthContext.js';
import { Container, Row, Col } from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { database } from '../firebase.js';
import { ref, get, child } from 'firebase/database';

import '../styles/CrushMap.css';

export default function CrushMap() {
  const [crushUni, setCrushUni] = useState('');
  const [cy, setCy] = useState(null);
  const [data, setData] = useState([]);
  const [crushes, setCrushes] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const currentUserUni = currentUser.email.replace('@columbia.edu', '');
  const dbRef = ref(database);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let data = [];

    //Get data from database
    const dbObj = get(child(dbRef, 'crushes/'));

    await dbObj.then((snapshot) => {
      if (snapshot.exists()) {
        let allSources = snapshot.val();

        Object.keys(allSources).forEach((key) => {
          let source = key;
          let targets = allSources[key]['targets'];

          let newTargets = Object.values(targets).filter((t) => t);

          if (source === currentUserUni) {
            setCrushes(newTargets);
          }

          data.push({
            data: { id: source, label: source }
          });

          for (let i = 0; i < newTargets.length; i++) {
            let t = newTargets[i];

            data.push(
              {
                data: { id: t, label: t }
              },
              {
                data: { id: source + t, source: source, target: t }
              }
            );
          }
        });
      } else {
        console.log('No data available');
      }
    });

    setData(data);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const popoverLeft = (
    <Popover id="popover-positioned-left" title="Information">
      {`the crush map. is a graph visualization meant to illustrate the complicated network of
      student crushes at Columbia University. Start by adding a crush to the map.
      Don't worry! Your crush will not be able to see that you liked them nor
      can you see who specifically has liked you. That is unless there's a match ;). What
      you are able to see are any anonymous admirers that you and other people may have.`}
    </Popover>
  );

  return (
    <div className="crush-map">
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <MapHeader />
          </Col>
          <Col md={2}>
            <div className="info">
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverLeft}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-info-circle info-btn"
                  viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={11}>
            <InsertBar
              cy={cy}
              crushUni={crushUni}
              userUni={currentUserUni}
              setCrushUni={setCrushUni}
              crushes={crushes}
              setCrushes={setCrushes}
            />
          </Col>
        </Row>
        <Row className="map-container">
          <Col md={2} className="d-none d-md-block list-container">
            <div className="user-info">You: {currentUserUni}</div>
            <div className="label">Your Crushes</div>
            <CrushList
              dbRef={dbRef}
              cy={cy}
              currentUserUni={currentUserUni}
              crushes={crushes}
              setCrushes={setCrushes}
            />
            <button id="log-out-btn" onClick={handleLogOut}>
              Log Out
            </button>
          </Col>
          <Col md={10}>
            <div className="d-none d-md-block visualization-container">
              <VisualizationControls cy={cy} userUni={currentUserUni} />
              <Visualization
                crushes={crushes}
                data={data}
                cy={cy}
                setCy={setCy}
                userUni={currentUserUni}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
