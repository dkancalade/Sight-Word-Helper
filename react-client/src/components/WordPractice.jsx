import React from 'react';

// eslint-disable-next-line no-unused-vars
const WordPractice = ({word, url, handleAnswerSubmission, correct, correctWords, incorrectWords, stats}) => (
  <div>
    <h2>Learn the Word Below</h2>
    <audio controls>
      <track
        default
        kind='captions'
      />
      <source src={url} type="audio/mpeg"/>
    </audio>

    <form id={word} onSubmit={(e) => {
      e.preventDefault();
      return handleAnswerSubmission(e)
    }}>
      <label htmlFor={word}>
        Spell Word to the right:
        <input id="answer" type="text" name={word} />
        </label>

      <input id="spellcheck" type="submit" value="Submit" />
    </form>
  </div>


);




export default WordPractice;