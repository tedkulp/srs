import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './components/home/index';
import Reviews from './components/reviews/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Home />
          <Reviews />
        </div>
      </div>
    );
  }
}

export default App;
