import React from 'react';

// eslint-disable-next-line no-unused-vars
const DevelopWordList = ({newList, newListName, newListSize}) => {
  const newWordList = newList.map((word, i) =>
    <li key={`newWordList-${word + i}`}>
      {word}
      {/* in case I want to give the user the option to verify and possible create their own audio file
      <span>
        <button type='button' className={`audio-file-getter${i}`}>
          Get Audio File
        </button>
      </span> */}
    </li>);
  return (
    <div>
      <div>
          <h1>{newListName}</h1>
          <ul>
            {newWordList}
          </ul>
          <div>
            <button type='button' id='audioFile'>
              Generate Audio Files
            </button>
          </div>
      </div>

    </div>
  );
};


export default DevelopWordList;