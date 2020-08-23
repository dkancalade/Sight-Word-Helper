import React from 'react';

const WordList = (props) => {

  const createList = (words) => {
    console.log('words', words);
    if (words.length === 0) {
      return <li>Add a word in the input field to start your List</li>
    } else {
      return array.map( (word, i) => (
      <li
        onClick={(e)=> {e.preventDefault, props.handleClick(e.target)}}
        key={i.toString()}
      > {word} </li>
      ));
    }
  };

  return (
    <div>
      <h2>Sight Words List Creator</h2>

      <form id='listCreator'>
        <div>
          <label htmlFor='list_name'>Enter the name of your list</label>
          <input name='list_name' type="text"></input>
        </div>
        <div>
          <label htmlFor='word'>Add a new sight word to the box to start your list</label>
          <input type='text' name='word'></input>
        </div>
        <input type='submit' name='submit' onClick={(e) => {props.handleClick(e)}}></input>
      </form>

        <ul>
          {createList(props.newList)}
        </ul>
    </div>
  );
}


export default WordList