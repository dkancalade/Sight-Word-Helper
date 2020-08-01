import React from 'react';


const WordDisplay = ({sightWord, url, handleClick}) => (
  <div
  className = "word"
  data-url = {url}
  onClick = {
    (e) => {
      handleClick(e.target);
    }
  }
  >
      {sightWord}
  </div>
);

export default WordDisplay;