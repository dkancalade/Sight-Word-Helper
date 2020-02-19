import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WordList from './components/WordList.jsx';
import SightWordPractice from './components/SightWordPractice.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightWords: ['hi', 'you', 'we', 'get', 'set', 'how', 'who', 'it', 'the', 'and'],
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

  handleClick(word) {
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

  wordSelector() {
    const currentWord = this.state.currentWord;
    if (currentWord === null) {
      return (<div>
        <h1>Sight Word List</h1>
        <WordList sightWords={this.state.sightWords} handleClick = {this.handleClick.bind(this)}/>
      </div>);
    } else {
        return (<SightWordPractice word={currentWord} />);
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