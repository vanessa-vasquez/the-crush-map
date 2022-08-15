import React, { useState } from 'react';
import { database } from '../firebase.js';
import { ref, set } from 'firebase/database';
import { Alert } from 'react-bootstrap';

export default function InsertBar(props) {
  const crushes = props.crushes;
  const currentUserUni = props.userUni;
  const crushUni = props.crushUni;
  const cy = props.cy;

  const [error, setError] = useState('');

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

  const addCrush = (e) => {
    e.preventDefault();

    if (crushes.includes(crushUni)) {
      return alert(`${crushUni} is already in your list!`);
    }

    if (!isUniValid(crushUni)) {
      return setError('This is not a valid Columbia.');
    } else {
      setError('');
    }

    cy.add([
      { group: 'nodes', data: { id: currentUserUni, label: currentUserUni } },
      { group: 'nodes', data: { id: crushUni, label: crushUni } },
      {
        group: 'edges',
        data: { id: currentUserUni + crushUni, source: currentUserUni, target: crushUni }
      }
    ]);

    const newCrushes = crushes.concat([crushUni]);

    props.setCrushes(newCrushes);

    // Add to database
    set(ref(database, 'crushes/' + currentUserUni), {
      targets: newCrushes
    });
  };

  return (
    <>
      <form
        id="crush-form"
        onSubmit={(e) => {
          addCrush(e);
        }}>
        <label className="label" htmlFor="add-crush">
          Add a Crush:{' '}
        </label>
        <input
          type="text"
          id="add-crush"
          name="add-crush"
          placeholder="UNI of your crush"
          value={crushUni}
          onChange={(e) => props.setCrushUni(e.target.value)}
        />
        <input id="submit-btn" type="submit" value="Add" />
      </form>
      {error && (
        <Alert id="error" className="text-center" key="danger" variant="danger">
          {error}
        </Alert>
      )}
    </>
  );
}
