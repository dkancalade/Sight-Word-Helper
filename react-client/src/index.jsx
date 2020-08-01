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
      sightWords: ['and', 'get', 'hi', 'how', 'it', 'set', 'the', 'we', 'who', 'you'],
      listName: 'default',
      currentList: null,
      urls: [
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/and.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/get.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/hi.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/how.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/it.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/set.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/the.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/we.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/who.mp3',
        'https://site-words-helper.s3-us-west-1.amazonaws.com/sight_words_audio/you.mp3'
      ],
      usedWords: [],
      incorrectWords: [],
      currentWord: null,
      currentUrl: null,
      correctInput: null,
      correct: 0,
      completed: 0,
      newList: []
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/retrieveList',
    //   success: (data) => {
    //     this.setState({
    //       sightWords: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }


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
          console.log('state, Tag:Word', this.state);
        }
        );
    }
    if (tag.id === 'restart') {
      this.setState({
        usedWords: [],
        incorrectWords: [],
        currentWord: null,
        currentUrl: null,
        correctInput: null,
        correct: 0,
        completed: 0
      }, () => {
        // console.log('state', this.state);
      })
    }

    if (tag.id === 'listCreator') {
      console.log('tag', tag);
      const input = tag.innerText;
      this.setState((state, props) => (
        {newList: state.newList.concat(tag.innerText)}
      ));
    }
  }

    pageSelector() {
      const currentWord = this.state.currentWord;
      const currentUrl = this.state.currentUrl;
      const currentList = this.state.currentList;
      const evalResult = this.state.correctInput;


      if (currentWord === null && currentList === null) {
        return (
          <HomePage handleClick={this.handleClick.bind(this)}/>
          );
      } else if (currentWord === null && currentList){
          if (currentList === 'default'  && evalResult === null) {
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
                <CreateWordList
                  newList={this.state.newList}
                  handleClick={this.handleClick.bind(this)}
                />
               );
            }
      } else if (evalResult !== null) {
          const remainingSightWords = this.state.sightWords.filter(word => -1 === this.state.usedWords.indexOf(word));
          // remove the url that is not included in the remaining sight words
          const remainingUrls = this.state.urls.filter(url => -1 === this.state.usedWords.indexOf(url.split('/')[4].split('.')[0]));
          // console.log('remainingSightWords', remainingSightWords);
          // console.log('remainingUrls', remainingUrls);
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
