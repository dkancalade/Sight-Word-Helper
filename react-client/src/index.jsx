import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WordList from './components/WordList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightWords: ['hi', 'you', 'we', 'get', 'set', 'how', 'who', 'it', 'the', 'and']
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

  render () {
    return (<div>
      <h1>Sight Word List</h1>
      <WordList sightWords={this.state.sightWords}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));