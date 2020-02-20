import React from 'react';

const WordDisplay = (props) => (
  <div
    className="word"
    onClick = {
      (e) => {
        props.handleClick(e.target);
        }
      }>
    { props.sightWord }
  </div>
)

export default WordDisplay;