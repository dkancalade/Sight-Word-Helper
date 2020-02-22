import React from 'react';
const WordPractice = ({word, url, handleSubmit, correct, correctWords, incorrectWords, stats}) => (
  <div>
    <h2>Learn the Word Below</h2>
    <audio controls>
      <source src={url} type="audio/mpeg"/>
    </audio>

    <form id={word} onSubmit={(e) => {e.preventDefault(), handleSubmit(e)}}>
      <label htmlFor={word}>Spell Word to the right:</label>
      <input id="answer" type="text" name={word}></input>
      <input id="spellcheck" type="submit" value="Submit" />
    </form>
  </div>


);




export default WordPractice;