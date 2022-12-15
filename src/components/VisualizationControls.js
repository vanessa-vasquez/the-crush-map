import React from 'react';

export default function VisualizationControls(props) {
  const cy = props.cy;
  const currentUserUni = props.userUni;

  const centerView = () => {
    var node = cy.$('#' + currentUserUni);
    cy.center(node);
  };

  const viewAll = () => {
    cy.fit();
  };

  const resetView = () => {
    cy.reset();
  };

  return (
    <div className="cy-options">
      <button onClick={centerView}>Center</button>
      <button onClick={viewAll}>View All</button>
      <button onClick={resetView}>Reset</button>
    </div>
  );
}
