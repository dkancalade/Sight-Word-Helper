import React from 'react';

const WordDisplay = (props) => (
  <div
    onClick = {
      (e) => {
        props.handleClick(e.target.innerText);
        }
      }>
    {/* {console.log('sightWords', props.sightWord)} */}
    { props.sightWord }
  </div>
)

export default WordDisplay;