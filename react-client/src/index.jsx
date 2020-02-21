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
  handleSubmit(tag) {
    const id = tag.target.children[1].id;
    if (id === 'answer') {
      const submittedAnswer = tag.target.children[1].value;
      if (submittedAnswer === this.state.currentWord) {
        this.setState((state) => {
          return {
            correct: state.correct + 1,
            completed: state.completed + 1
          }
        }, () => {
          console.log('state', this.state);
        });
      } else {
        this.setState((state) => {
          return {
            completed: state.completed + 1
          }
        }, () => {
          console.log('state', this.state);
        });
      }
    }
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
            currentWord: word,
            currentUrl: url
          }, () => {
            console.log('newState', this.state);
          }
      );
    }
  }

  pageSelector() {
    const currentWord = this.state.currentWord;
    const currentUrl = this.state.currentUrl;
    const currentList = this.state.currentList;
    if (currentWord === null && currentList === null) {
      return (
        <HomePage handleClick={this.handleClick.bind(this)}/>
      );
    } else if (currentWord === null && currentList){
      if (currentList === 'default') {
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

    } else {
        return (<WordPractice
          word={currentWord}
          url={this.state.currentUrl}
          handleSubmit={this.handleSubmit.bind(this)}
        />);
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