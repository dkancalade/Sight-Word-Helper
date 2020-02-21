import React from 'react';
import WordDisplay from './WordDisplay.jsx';

const WordList = ({currentList, sightWords, urls, handleClick}) => (
  <div>
    <h4> Current List: {currentList} </h4>
    There are { sightWords.length } words to practice.
    {
      sightWords.map(
        (sightWord, i) => (
          <WordDisplay
            sightWord={sightWord}
            url={urls[i]}
            handleClick={handleClick}
            key={i.toString()}
          />
        )
      )
    }
  </div>
);

export default WordList;