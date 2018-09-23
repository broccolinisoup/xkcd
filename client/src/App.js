import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      comics:[]
    };
  }

  componentDidMount = () => {
    this.handleAPICalls();
  }

  numberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max-min + 1)) + min;
  }

  // Handles multiple API calls
  handleAPICalls = () => {
    // generating 9 numbers to be used as a xkcd id
    const xkcd_id_list = [...Array(9)].map((_, i) => this.numberGenerator(1, 2050));
    let comics = [];
    for (const xkcd_id of xkcd_id_list) {
      const result = this.callApi(xkcd_id).then(res => res);
      comics.push(result);
    }

    Promise.all(comics).then( values => {
      this.setState({comics : values},() => {
        console.log(this.state.comics)
      });
    });
  }

  // async call to the specific end point with the given xkcd id
  callApi = async (xkcd_id) => {
    const response = await fetch(`/${xkcd_id}/info.0.json`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">XKCD Gambling - Do you feel lucky today? </h1>
          <div className="container">{this.state.comics.map(comic =>
            <div className="box" key={comic.num}><img src={comic.img} alt="comic" /></div>
          )}
          </div>
          <button className="action-btn" onClick={this.handleAPICalls}>Reload</button>
        </header>
      </div>
    );
  }
}

export default App;
