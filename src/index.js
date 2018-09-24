import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './styles.css';

class App extends Component {
  state = {
    programmerHumor: null,
  };

  async componentDidMount() {
    const { data } = await axios.get('https://www.reddit.com/r/ProgrammerHumor.json');
    const posts = data.data.children;

    this.setState({
      programmerHumor: posts,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.programmerHumor &&
          this.state.programmerHumor.map(post => <div>{post.data.title}</div>)}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
