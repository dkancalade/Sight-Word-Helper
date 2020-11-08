/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import HomePage from './components/HomePage.jsx';
import WordList from './components/WordList.jsx';
import WordPractice from './components/WordPractice.jsx';
import CreateWordList from './components/CreateWordList.jsx';
import DevelopWordList from './components/DevelopWordList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sightWords: ['and', 'get', 'hi', 'how', 'it', 'set', 'the', 'we', 'who', 'you'],
      urls: [],
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
      // isCurrentList: false,
      newListSize: 0,
      newList:[],
      newListName: null,
      // newListUrls: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
  }

  componentDidMount() {
    fetch('/graphql', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: "{ default }"})
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }

  // fetchData(info) {
  //   fetch(`http://localhost:3000/type an endpoint here`,
  //     {
  //       method: 'PUT',
  //       body: `${info}`
  //     }
  //   );
  //     .then((data) => {
  //   })
  //     .catch((error) => {
  //       console.log('error', error);
  //     })
  // }

  // how to handle new lists
  handleListSubmission(tag) {
    // if you submit the name and size of the list
    if (tag.target.value === 'Start New List') {

      const listSize = tag.target.closest('div').childNodes[1].childNodes[1].value;
      const listName = tag.target.closest('div').childNodes[0].childNodes[1].value;
      this.setState(() => {
        return {newListName: listName, newListSize:listSize }
      }, () => {
        console.log('newState', this.state.newListName, this.state.listSize);
      });
    }
    // if you submit the words in the list
    if (tag.target.value === 'Complete List') {
      const wordContainers = document.getElementsByClassName('formElements');
      this.setState((state) => {
        const obj = {
          newList: state.newList
        };
        for (const node of wordContainers) {
          obj.newList.push(node.childNodes[1].value);
        }
        return obj;
      }, console.log('newList', this.state.newList, this.state.newListName));
    }
  }


  handleClick(tag) {
    // if you click on Sight Word Lists
    // to be refactored when other lists are available
    if (tag.id === 'lists') {
      this.setState({currentList: 'default', currentPage: 'practice'}, () => {
        console.log('lists', tag);
      });
    }

    // if you click on Create Custom List
    if (tag.id === 'create') {
      this.setState({currentPage: 'createNewList'});
    }

    // if you click on a word on Word Practice Page
    if (tag.className === 'word') {
      const {url} = tag.dataset;
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

    // get audio files for words

    // if (tag.id === 'audioFile') {
    //   let newList = this.state.newList
    //   fetchData(newList);
    // }
  };


  // evaluation progress and statistics of activities
  handleAnswerSubmission(tag) {
    const {id} = tag.target.children[1];

    if (id === 'answer') {
      const submittedAnswer = tag.target.children[1].value;

      if (submittedAnswer === this.state.currentWord) {
        // correct answer provided
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
        // incorrect answer provided
        this.setState((state) => {
          return {
            usedWords: state.usedWords.concat(submittedAnswer),
            incorrectWords: state.usedWords.concat(submittedAnswer),
            completed: state.completed + 1,
            correctInput: false,
            currentPage: 'practice'
          };
        }, () => {
          console.log('currentPage', this.state.currentPage);
        });
      }
    } else {
      // in case of unexpected anomaly
      console.error('The current id is', id);
    }
  }

  pageSelector() {
    // const {currentList} = this.state;
    const {currentPage} = this.state;
    const {currentWord} = this.state;
    // const {currentUrl} = this.state;
    const evalResult = this.state.correctInput;
    const {newList} = this.state;


    // default page
    if (currentPage === 'home') {
      return (
        <HomePage handleClick={this.handleClick}/>
        );
    }

    // activity page
    if (currentPage === 'practice') {
      // no words have been answered yet
      if (evalResult === null) {
        return (
          <WordList
            listName={this.state.currentList}
            sightWords={this.state.sightWords}
            urls={this.state.urls}
            handleClick = {this.handleClick}
          />
        );
      }

      // a word has just been answered and evaluated
      console.log('evalResult', evalResult)
      if (evalResult === true || evalResult === false) {
        const remainingSightWords = this.state.sightWords.filter(word => this.state.usedWords.indexOf(word) === -1);
        const remainingUrls = this.state.urls.filter(url => this.state.usedWords.indexOf(url.split('/')[4].split('.')[0]) === -1);

        return (
          <WordList
            listName={this.state.currentList}
            sightWords={remainingSightWords}
            urls={remainingUrls}
            handleClick = {this.handleClick}
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
             handleAnswerSubmission={this.handleAnswerSubmission}
             />);
    }

    // create a new sight word list page
    if (currentPage === 'createNewList') {
       // for the current list
      return newList.length
        ?
          < DevelopWordList
            newList={this.state.newList}
            newListName={this.state.newListName}
            newListSize={this.state.newListSize}
          />
        :
          <CreateWordList
            newList={this.state.newList}
            newListName={this.state.newListName}
            newListSize={this.state.newListSize}
            handleListSubmission={this.handleListSubmission}
          />;
    }

  }

  render () {
    // renders appropriate Component
    const select = this.pageSelector();
    return (
      <div>
        {select}
      </div>
      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));
