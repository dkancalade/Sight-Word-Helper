import React from 'react';
const WordList = (props) => {
  const createList = (words) => {
    if (words.length === 0) {
      return <li>Add a word in the input field to start your List</li>
    } else {
      return array.map( (word, i) => (
      <li onClick={(e)=> {e.preventDefault, props.handleClick(e.target)}}key={i.toString()}>{word}</li>
      ));
    }
  };
  return (
    <div>
      <h2>Sight Words List Creator</h2>
      <form id="listCreator">
        <label htmlFor="word">Add a new sight word to the box to start your list</label>
        <input type="text" name="word"></input>
        <input type="submit" name="submit"></input>
      </form>
        <ul>
          {createList(props.newList)}
        </ul>


    </div>


  );
}


export default WordList