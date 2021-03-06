import React from 'react';

const CreateWordList = (props) => {

    // a 2 part form builder to create lists
    const createWordListForm = (listName, listLength) => {
        //if there is no list specify the size and name of the list
        if (!listLength) {
          return (
            <div id='list-starter'>
              <div>
                <label htmlFor='list_name'>Enter the name of your list</label>
                <input name='list_name' type="text"></input>
              </div>
              <div id='number_of_words'>
                <label htmlFor='count'>How many words do you want to be in this list? Max:20</label>
                <input type='number' name='count'></input>
              </div>
              <input
                id='listCreator'
                type='submit'
                value='Start New List'
                onClick={(e) => {e.preventDefault(), props.handleListSubmission(e)}}
              ></input>
            </div>
          );
        } else if (listLength) {
          // if there is a specified length already then build list
          let wordInputs = [];
            for (let i = 1; i <= listLength; i++) {
              wordInputs.push(
              <div className='formElements'>
                <label htmlFor={`word${i}`}>Enter word here:</label>
                <input name={`word${i}`} type="text"></input>
              </div>
              );
            };
          return (
            <div id='list-finisher'>
              {wordInputs.map((wordInput, i) => (
                <div key={`wordInput-${i}`}>{wordInput}</div>
              ))}
              <input
                id='list-submitter'
                type='submit'
                value='Complete List'
                onClick={(e) => {e.preventDefault(), props.handleListSubmission(e)}}
              ></input>
            </div>
          );
        } else {
          console.log('anomaly', `${listName} and ${listLength} are not compatible`)
        }
    };

    return (
      <div>
        <h2>Sight Words List Creator</h2>
        <form id='create-new-list' >
          {createWordListForm(props.newListName, props.newListSize)}
        </form>
      </div>
    );
};

export default CreateWordList;
