import React, {Fragment} from 'react';

const DevelopWordList = ({newList, newListName, newListSize}) => {
  const newWordList = newList.map((word, i) => <li key={`newWordList-${i}`}>{word}</li>);
  return (
    <div>
      <div>
          <h3> Please wait while your Audio Files are created or Fetched </h3>
      </div>
      <div>
          <h1>{newListName}</h1>
          <ul>
            {newWordList}
          </ul>
      </div>

    </div>
  );
};


export default DevelopWordList;