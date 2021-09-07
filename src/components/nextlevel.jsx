import React, { Component } from "react";

class NextLevel extends Component {
  render() {
    return (
      <div id="wrapper" className="game wrapper">
        <div className="levelbg">
          <div className="inner">
            <div className="head">Well Done !</div>
            <div className="again" onClick={() => this.props.nextlevel()}>
              Next level
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default NextLevel;
