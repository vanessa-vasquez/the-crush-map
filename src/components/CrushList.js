import React, { useEffect } from 'react';
import { database } from '../firebase.js';
import { ref, get, child, remove } from 'firebase/database';

export default function CrushList({ crushes, cy, currentUserUni, dbRef, setCrushes }) {
  useEffect(() => {
    if (cy) {
      styleChildren();
      calculateMatches();
    }
  }, [cy, crushes]);

  const styleChildren = () => {
    for (const crush in crushes) {
      cy.$('#' + crushes[crush]).addClass('child-node');
      cy.$('#' + currentUserUni + crushes[crush]).addClass('child-edge');
    }
  };

  const calculateMatches = () => {
    let matches = [];

    let nodes = cy.$('node');

    let source = cy.$('#' + currentUserUni);

    let edges = nodes.edgesTo(source);

    for (let i = 0; i < edges.length; i++) {
      let person = edges[i]['_private']['data']['source'];

      if (crushes.includes(person)) {
        matches.push(person);

        cy.$('#' + person).removeClass('child-node');
        cy.$('#' + currentUserUni + person).removeClass('child-edge');

        cy.$('#' + person).addClass('node-match');
        cy.$('#' + currentUserUni + person).addClass('edge-match');
        cy.$('#' + person + currentUserUni).addClass('edge-match');
      }
    }

    for (let i = 0; i < matches.length; i++) {
      document.getElementById(matches[i]).style.color = '#ff5143';
      document.getElementById(matches[i]).style.fontWeight = '700';
      document.getElementById(matches[i]).innerHTML = matches[i] + ' - match';
    }
  };

  const deleteCrush = async (crush) => {
    //Remove edge from map
    cy.remove(cy.$('#' + currentUserUni + crush));

    if (cy.$('#' + crush).hasClass('node-match')) {
      cy.$('#' + crush).removeClass('node-match');
      cy.$('#' + currentUserUni + crush).removeClass('edge-match');
      cy.$('#' + crush + currentUserUni).removeClass('edge-match');
    } else if (cy.$('#' + crush).hasClass('child-node')) {
      cy.$('#' + crush).removeClass('child-node');
      cy.$('#' + currentUserUni + crush).removeClass('child-edge');
    }

    //Remove from crushes list
    setCrushes((prevCrushes) => prevCrushes.filter((uni) => uni !== crush));

    //Remove from database
    let crushKey = 0;

    const dbObj = get(child(dbRef, 'crushes/' + currentUserUni));

    await dbObj
      .then((snapshot) => {
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).forEach((key) => {
            let targets = snapshot.val()[key];
            console.log(targets);
            Object.keys(targets).forEach((key) => {
              if (targets[key] === crush) {
                crushKey = key;
                return;
              }
            });
          });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const dbCrushRef = ref(database, 'crushes/' + currentUserUni + '/targets/' + String(crushKey));

    remove(dbCrushRef);
  };

  return (
    <div id="list">
      {Object.keys(crushes).map((item) => {
        return (
          <div className="d-flex align-items-center crush" key={crushes[item]}>
            <button className="delete-btn" onClick={() => deleteCrush(crushes[item])}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <span id={crushes[item]}>{crushes[item]}</span>
            <br />
          </div>
        );
      })}
    </div>
  );
}
