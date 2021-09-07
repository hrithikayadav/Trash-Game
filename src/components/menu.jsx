import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div id="wrapper" className="wrapper menu">
        <div className="inner">
          <div className="logo" />
          <div className="menuitems">
            <div onClick={() => this.props.startgame()}>Start game</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
