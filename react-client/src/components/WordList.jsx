import React from 'react';
import WordDisplay from './WordDisplay.jsx';

const WordList = (props) => (
  <div>
    <h4> Current List: default </h4>
    There are { props.sightWords.length } words to practice.
    { props.sightWords.map((sightWord, i) => <WordDisplay sightWord={sightWord} handleClick={props.handleClick}key={i.toString()}/>)}
  </div>
)

export default WordList;