import React, { Component } from "react";
import Draggable from "react-draggable"; // The default
import Data from "../data/data.jsx";
import Level from "../data/level.jsx";

class Fallitem extends Component {
  constructor(props) {
    const type = Math.floor(Math.random() * Data.length);
    const random = Math.floor(Math.random() * (window.innerWidth * 0.8));
    super();
    this.state = {
      error: false,
      points: 0,
      controlledPosition: {
        x: random,
        y: 0
      },
      type: type,
      item: Data[type],
      fallen: false,
      random: random,
      speed: Level[props.level - 1].speed / 1000
    };
  }
  componentDidMount() {
    
    let endposition = this.state.random + 50;
    this.setState({
      startposition: endposition,
      endposition: endposition
    });
    
    this.timeoutID = this.timer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  timer = () =>
    setTimeout(() => {
      //this.setState({}, () => {});
      const endpoint = this.state.endposition;
      this.checkPoint(endpoint);
    }, Level[this.props.level - 1].break);
    
  checkPoint(endpoint) {
    if (!this.props.showerror && !this.props.shownextlevel) {
      const firstbreak = window.innerWidth / 3;
      const secondbreak = (window.innerWidth / 3) * 2;
      const thirdbreak = window.innerWidth;
      if (endpoint > window.innerWidth) {
        endpoint = window.innerWidth - 50;
      }
      if (endpoint <= 0) {
        endpoint = 50;
      }

      if (this.state.item.kat === 1) {
        if (endpoint > 0 && endpoint < firstbreak) {
          this.setState({ fallen: true });
          this.props.addpoints();
        } else {
          this.setState({ error: true });
          this.props.adderror();
        }
      }
      if (this.state.item.kat === 2) {
        if (endpoint > firstbreak && endpoint < secondbreak) {
          this.setState({ fallen: true });
          this.props.addpoints();
        } else {
          this.setState({ error: true });
          this.props.adderror();
        }
      }
      if (this.state.item.kat === 3) {
        if (endpoint > secondbreak && endpoint < thirdbreak) {
          this.setState({ fallen: true });
          this.props.addpoints();
        } else {
          this.setState({ error: true });
          this.props.adderror();
        }
      }
    }
  }

  onControlledDrag = (e, position) => {
    window.addEventListener("touchmove", this.preventDefault, {
      passive: false
    });

    this.setState({
      endposition: position.x + 50,
      controlledPosition: {
        y: 0,
        x: position.x
      }
    });
  };


  render() {
    
    if (this.props.showerror || this.props.shownextlevel) {
      clearTimeout(this.timeoutID);
    }
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    //const imgUrl = require(`../img/${this.state.item.background}`);
    //console.log(imgUrl);
    let itemclassname = "item";
    if (this.state.error) {
      itemclassname = "item itemerror";
    }
    if (this.state.fallen) {
      itemclassname = "item fallen";
    }
    return (
      
      <div className="itemwrapper" style={{ animation: "falling +" + this.state.speed + "s linear forwards", }}>
        <Draggable position={this.state.controlledPosition} {...dragHandlers} onDrag={this.onControlledDrag}  axis="x">
          <div style={{
              backgroundImage:"url("+this.state.item.background+")"
            }} className={itemclassname}/>
        </Draggable>
      </div>
    );
  }
}

export default Fallitem;
