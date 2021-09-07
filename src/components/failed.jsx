import React, { Component } from "react";

class Failed extends Component {
  
  
  render() {
    return (
      <div id="wrapper" className="game wrapper">
        <div className="error">
          <div className="inner">
            <div className="head">Oops ...</div>
            <div className="hs_form">
              <div className="hs_points_error">
                Points: {this.props.endlesspoints}
              </div>
              
            </div>
            <div className="again" onClick={this.props.reseterror}>Play Again?
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Failed;
