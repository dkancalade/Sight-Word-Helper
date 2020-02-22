import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HomePage from './components/HomePage.jsx';
import WordList from './components/WordList.jsx';
import WordPractice from './components/WordPractice.jsx';
import CreateWordList from './components/CreateWordList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightWords: ['hi', 'you', 'we', 'get', 'set', 'how', 'who', 'it', 'the', 'and'],
      currentList: null,
      urls: ['/default/hi', '/default/you', '/default/we', '/default/get', '/default/set', '/default/how', '/default/who', '/default/it', '/default/the', '/default/and'],
      usedWords: [],
      incorrectWords: [],
      currentWord: null,
      currentUrl: null,
      correctInput: null,
      correct: 0,
      completed: 0
    };
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
      this.setState({currentList: "default"}, () => {
      });
    }
    if (tag.id === 'create') {
      this.setState({currentList: "new"}, () => {
      });
    }
    if (tag.className === 'word') {
      const url = tag.dataset.url;
      const word = tag.innerText;
      this.setState(
        {
          correctInput: null,
          currentWord: word,
          currentUrl: url
        }, () => {
          console.log('this.state', this.state);
        }
        );
      }
    }

    pageSelector() {
      const currentWord = this.state.currentWord;
      const currentUrl = this.state.currentUrl;
      const currentList = this.state.currentList;
      const afterEval = this.state.correctInput
      if (currentWord === null && currentList === null) {
        return (
          <HomePage handleClick={this.handleClick.bind(this)}/>
          );
        } else if (currentWord === null && currentList){
          if (currentList === 'default'  && afterEval === null) {
            return (
              <WordList
                listName={this.state.currentList}
                sightWords={this.state.sightWords}
                urls={this.state.urls}
                handleClick = {this.handleClick.bind(this)}
              />
            );
            } else if (currentList === 'new') {
              return (
                <CreateWordList />
                );
              }

            } else if (afterEval !== null) {
              const remainingSightWords = this.state.sightWords.filter(word => -1 === this.state.usedWords.indexOf(word));
              const remainingUrls = this.state.urls.filter(
                (url, i) => {
                    const word = url.split('/')[2];
                    return remainingSightWords.includes(word);
              });
              console.log('remainingSightWords', remainingSightWords);
              console.log('remainingUrls', remainingUrls)
              // if (remainingSightWords === 0) {
              //   let redoSightWords = this.state.incorrectWords;
              //   if (redoSightWords.length === 0) {
              //     return (
              //       <WordList
              //         listName={this.state.currentList}
              //         sightWords={remainingSightWords}
              //         urls={remainingUrls}
              //         handleClick = {this.handleClick.bind(this)}
              //         usedWords={this.state.usedWords}
              //         incorrectWords={this.state.incorrectWords}
              //         lastWord={this.state.currentWord}
              //         lastInputCorrect={this.state.correctInput}
              //         stats={[this.state.correct, this.state.completed]}
              //       />
              //     );
              //   }
              // }
              return (
                <WordList
                  listName={this.state.currentList}
                  sightWords={remainingSightWords}
                  urls={remainingUrls}
                  handleClick = {this.handleClick.bind(this)}
                  usedWords={this.state.usedWords}
                  incorrectWords={this.state.incorrectWords}
                  lastWord={this.state.currentWord}
                  lastInputCorrect={this.state.correctInput}
                  stats={[this.state.correct, this.state.completed]}
                />
              );
            } else {
              return (<WordPractice
                word={currentWord}
                url={this.state.currentUrl}
                handleSubmit={this.handleSubmit.bind(this)}
                />);
              }
            }


  handleSubmit(tag) {
    const refreshPage = this.pageSelector.bind(this);
    const id = tag.target.children[1].id;
    if (id === 'answer') {
      const submittedAnswer = tag.target.children[1].value;
      if (submittedAnswer === this.state.currentWord) {
        this.setState((state) => {
          console.log('state', state);
          return {
            correctInput: true,
            usedWords: state.usedWords.concat(submittedAnswer),
            correct: state.correct + 1,
            completed: state.completed + 1
          }
        }, () => {
          console.log('state', this.state);
        });
      } else {
        this.setState((state) => {
          return {
            usedWords: state.usedWords.concat(submittedAnswer),
            incorrectWords: state.usedWords.concat(submittedAnswer),
            completed: state.completed + 1,
            correctInput: false,
          }
        }, () => {
          console.log('state', this.state);
        });
      }
    }
  }

  render () {
    let select = this.pageSelector();
    return (
      <div>
        {select}
      </div>
      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// return (<WordPractice
//   word={this.state.currentWord}
//   url={this.state.currentUrl}
//   handleSubmit={this.handleSubmit.bind(this)}
//   correct={this.state.correctInput}
//   usedWords={this.state.usedWords}
//   incorrectWords={this.state.incorrectWords}
//   stats={[this.state.correct, this.state.completed]}
//   />