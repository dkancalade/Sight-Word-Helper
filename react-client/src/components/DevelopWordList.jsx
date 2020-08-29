import React from 'react';

const DevelopWordList = (newList, newListName, newListSize) => {
  const newWordList = newList.map(word => <li>word</li>);
  return (
    <div>
        <h3> Please wait while your Audio Files are created or Fetched </h3>
    </div>
    <div>
        <ol>
          {newWordList}
        </ol>
    </div>
  );
};


export default DevelopWordList;