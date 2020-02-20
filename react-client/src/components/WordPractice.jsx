import React from 'react';
const WordPractice = (props) => (
  <div>
    <h2>Learn the Word Below</h2>
    <form id={props.currentWord}>
      <label htmlFor={props.currentWord}></label>
      <input type="text" name={props.currentWord}></input>
    </form>
  </div>
);




export default WordPractice;