import React, { Component } from "react";
import "./App.css";
import Game from "./components/game.jsx"; // The default
import Menu from "./components/menu.jsx"; // The default

class App extends Component {
  constructor() {
    super();
    this.state = {
      playing: false
    };
  }
  startgame = () => {
    console.log("starting game");
    this.setState({
      playing: true
    });
  };
 

  render() {
    if (this.state.playing) {
      return <Game  />;
    }
    if (!this.state.playing ) {
      return <Menu startgame={this.startgame} />;
    }
    
  }
}

export default App;
