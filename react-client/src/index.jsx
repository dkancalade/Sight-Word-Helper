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
      currentList: null,
      currentPage: 'home',

      // state for evaluation
      currentWord: null,
      currentUrl: null,
      usedWords: [],
      incorrectWords: [],
      correctInput: null,
      correct: 0,
      completed: 0,
      // constructing new lists
      isCurrentList: false,
      newListSize: 0,
      newList:[],
      newListName: null
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

  handleListSubmission(tag) {
    //if you submit a word from the create word list page
    if (tag.target.value === 'Start New List') {

      const listSize = tag.target.closest('div').childNodes[1].childNodes[1].value;
      const listName = tag.target.closest('div').childNodes[0].childNodes[1].value;
      this.setState((state, props) => (
        {newListName: listName, newListSize:listSize }
      ), () => {
        console.log('newState', this.state.newListName, this.state.listSize);
      });
    } else {
      let wordContainers = document.getElementsByClassName('formElements');
      this.setState((state,props) => {
        let obj = {
          newList: state.newList
        };
        for (let node of wordContainers) {
          obj.newList.push(node.childNodes[1].value);
        }
        console.log('obj', obj.newList);
        return obj;

      }, console.log('newList', this.state.newList, this.state.newListName));
    }

  }


  handleClick(tag) {
    // if you click on Sight Word Lists
    if (tag.id === 'lists') {
      this.setState({currentList: 'default', currentPage: 'practice'}, () => {
      });
    }

    // if you click on Create Custom List
    if (tag.id === 'create') {
      this.setState({currentPage: 'createNewList'}, () => {
        console.log('newstate', this.state.currentPage);
      });
    }

    // if you click on a word on Word Practice Page
    if (tag.className === 'word') {
      const url = tag.dataset.url;
      const word = tag.innerText;
      this.setState(
        {
          correctInput: null,
          currentWord: word,
          currentUrl: url,
          currentPage: 'practiceWord'
        });
    }

    // if you click on restart after finishing reviewing all the words in the list
    if (tag.id === 'restart') {
      this.setState({
        usedWords: [],
        incorrectWords: [],
        currentWord: null,
        currentUrl: null,
        correctInput: null,
        correct: 0,
        completed: 0
      });
    }
  }

  pageSelector() {
    const currentList = this.state.currentList;
    const currentPage = this.state.currentPage;
    const currentWord = this.state.currentWord;
    const currentUrl = this.state.currentUrl;
    const evalResult = this.state.correctInput;


    //default page
    if (currentPage === 'home') {
      return (
        <HomePage handleClick={this.handleClick.bind(this)}/>
        );
    }

    if (currentPage === 'practice') {
      //no words have been answered yet
      if (evalResult === null) {
        return (
          <WordList
            listName={this.state.currentList}
            sightWords={this.state.sightWords}
            urls={this.state.urls}
            handleClick = {this.handleClick.bind(this)}
          />
        );
      }

      //a word has just been answered and evaluated
      if (evalResult) {
        const remainingSightWords = this.state.sightWords.filter(word => -1 === this.state.usedWords.indexOf(word));
        const remainingUrls = this.state.urls.filter(url => -1 === this.state.usedWords.indexOf(url.split('/')[4].split('.')[0]));

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
      }
    }

    // listen to audio and give answer
    if (currentPage === 'practiceWord') {
           return (<WordPractice
             word={currentWord}
             url={this.state.currentUrl}
             handleAnswerSubmission={this.handleAnswerSubmission.bind(this)}
             />);
    }

    // create a new sight word list
    if (currentPage === 'createNewList') {
       //for the current list
        return (
          <CreateWordList
            newList={this.state.newList}
            newListName={this.state.newListName}
            newListSize={this.state.newListSize}
            handleListSubmission={this.handleListSubmission.bind(this)}
          />
          );
    }


  }

  handleAnswerSubmission(tag) {
    const id = tag.target.children[1].id;

    if (id === 'answer') {
      const submittedAnswer = tag.target.children[1].value;

      if (submittedAnswer === this.state.currentWord) {
        //correct answer provided
        this.setState((state) => {
          return {
            correctInput: true,
            usedWords: state.usedWords.concat(submittedAnswer),
            correct: state.correct + 1,
            completed: state.completed + 1,
            currentPage: 'practice'
          }
        });
      } else {
        //incorrect answer provided
        this.setState((state) => {
          return {
            usedWords: state.usedWords.concat(submittedAnswer),
            incorrectWords: state.usedWords.concat(submittedAnswer),
            completed: state.completed + 1,
            correctInput: false,
            currentPage: 'practice'
          }
        });
      }
    } else {
      //anomaly
      console.error('The current id is', id);
    }
  }

  render () {
    // renders appropriate Component
    let select = this.pageSelector();
    return (
      <div>
        {select}
      </div>
      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));
