import React from 'react';
import WordDisplay from './WordDisplay.jsx';

const WordList = (props) => {
  const createHead = (props) => {
    var sightWords = props.sightWords;
      if (props.lastWord && props.sightWords.length) {
        return (
          <div>
            <h4> Current List: {props.currentList} </h4>
            <p>There are { props.sightWords.length } words to practice.</p>
            <p>Your stats are: {`${props.stats[0]}/${props.stats[1]}`}</p>
          </div>
        );
      } else {
        if (props.sightWords.length === 0) {
          return (
            <div>
              <p>
                You've Finished!  Your final stats are: {`${props.stats[0]}/${props.stats[1]}`}. If you missed any, try again to get a perfect score
              </p>
                <button
                  id="restart"
                  onClick = {(e) => {
                    props.handleClick(e.target);
                  }}
                >
                Restart</button>
            </div>
          );
        } else {
          return (
            <div>
              <h4> Current List: {props.currentList} </h4>
              <p>There are { props.sightWords.length } words to practice.</p>
            </div>
          );
        }
      }
  };

return (
  <div>
    <table>
      <thead>
        <tr>
        <th>| Practice your spelling |</th>
        <th>| Sight Word Flash Cards |</th>
        </tr>
      </thead>


    </table>
    {createHead(props)}
    {props.sightWords.map(
      (sightWord, i) => (
        <WordDisplay
          sightWord={sightWord}
          url={props.urls[i]}
          handleClick={props.handleClick}
          key={i.toString()}
        />
      )
    )}
  </div>
)




return (<HeadingElement/>);
};

export default WordList;