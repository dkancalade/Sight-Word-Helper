import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WordList from './components/WordList.jsx';
import WordPractice from './components/WordPractice.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightWords: ['hi', 'you', 'we', 'get', 'set', 'how', 'who', 'it', 'the', 'and'],
      sightWordsUrl: [],
      currentWord: null,
      correct: null,
      completed: 0,
      currentIndex: null
    }
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/sightWords',
  //     success: (data) => {
  //       this.setState({
  //         sightWords: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  handleClick(tag) {
    if (tag.id === 'lists') {
      console.log('clicked lists', tag);
    }
    if (tag.id === 'create') {
      console.log('clicked create', tag);
    }
    if (tag.className === 'word') {
      let word = tag.innerText;
      console.log('word', word);
      // if (tag.className === )
      this.setState(
        (state)=> (
          {
            currentIndex:
            state.sightWords.findIndex((element) => {
              return element === word;
            }),

            currentWord: word
          }), () => {
            console.log('newState', this.state);
          }
          );
    }
  }

  wordSelector() {
    const currentWord = this.state.currentWord;
    if (currentWord === null) {
      return (
      <div>
        <h1>Welcome to Sight Words Helper</h1>
        <table id='menu'>
          <thead>
            <tr>
              <th id='lists' onClick = {(e) => {this.handleClick(e.target)}}>| Sight Word Lists |</th>
              <th id='create' onClick = {(e) => {this.handleClick(e.target)}}>| Create Custom List |</th>
            </tr>
          </thead>

        {/* <WordList
          sightWords={this.state.sightWords}
          handleClick = {this.handleClick.bind(this)}/> */}
          </table>
      </div>
      );
    } else {
        return (<WordPractice word={currentWord} />);
      };
  }



  render () {
    let select = this.wordSelector();

    return (
      <div>
        {select}
      </div>
      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));