import React, { useEffect, useState } from 'react';
import MapHeader from './MapHeader';
import Identifier from './Identifier';
import InsertBar from './InsertBar';
import CrushList from './CrushList';
import Visualization from './Visualization';
import VisualizationControls from './VisualizationControls';
import { useAuth } from '../contexts/AuthContext.js';
import '../styles/CrushMap.css';
import { Container, Row, Col, Collapse } from 'react-bootstrap';

import { database } from '../firebase.js';
import { ref, get, child } from 'firebase/database';

export default function CrushMap() {
  const [crushUni, setCrushUni] = useState('');
  const [cy, setCy] = useState(null);
  const [data, setData] = useState([]);
  const [crushes, setCrushes] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
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

  const toggleCrushes = (open) => {
    if (open) {
      document.getElementById('toggle-crushes-chevron').classList.add('toggle');
    } else {
      document.getElementById('toggle-crushes-chevron').classList.remove('toggle');
    }
  };

  return (
    <>
      <MapHeader />
      <Container>
        <Row>
          <Col>
            <Identifier userUni={currentUserUni} />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <div className="label d-none d-sm-none d-md-block">Your Crushes</div>
          </Col>
          <Col md={10}>
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
        <Row>
          <Col md={2}>
            <div className="d-md-none">
              <button
                onClick={() => {
                  setOpen(!open);
                  toggleCrushes(!open);
                }}
                id="toggle-crushes-btn"
                aria-controls="collapse-crushes"
                aria-expanded={open}
              >
                <div className="d-flex">
                  <div className="label">Your Crushes</div>
                  <div id="toggle-crushes-chevron">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-caret-right"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div className="d-block d-md-none">
              <Collapse in={open}>
                <div id="collapse-crushes">
                  <CrushList
                    dbRef={dbRef}
                    cy={cy}
                    crushes={crushes}
                    setCrushes={setCrushes}
                    userUni={currentUserUni}
                  />
                </div>
              </Collapse>
            </div>
            <div className="d-none d-sm-none d-md-block">
              <CrushList
                dbRef={dbRef}
                cy={cy}
                crushes={crushes}
                setCrushes={setCrushes}
                userUni={currentUserUni}
              />
            </div>
          </Col>
          <Col md={8}>
            <Visualization
              crushes={crushes}
              data={data}
              cy={cy}
              setCy={setCy}
              userUni={currentUserUni}
            />
          </Col>
          <Col md={2}>
            <VisualizationControls cy={cy} userUni={currentUserUni} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
