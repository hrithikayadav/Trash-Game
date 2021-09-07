import React, { Component } from "react";
import Fallitem from "../components/fallitem.jsx";
import NextLevel from "../components/nextlevel.jsx";
import Failed from "../components/failed.jsx";
import Level from "../data/level.jsx";
// import SuccessSound from "../sounds/success.mp3";
// import SoundError from "../sounds/error.mp3";
// import SoundMusic from "../sounds/music.mp3";
// import SoundMusic2 from "../sounds/music2.mp3";
// import SoundMusic3 from "../sounds/music3.mp3";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      ticks: 0,
      endlesspoints: 0,
      error: 0,
      count: [1],
      level: 1,
      running: true,
      perfect: 0,
      perfecttext: "",
      showerror: false,
      shownextlevel: false
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      let count = this.state.count;
      count.push([this.state.count.length + 1]);
      this.setState({
        count: count
      });
    }, Level[this.state.level - 1].interval);
    this.targetElement = document.querySelector("#wrapper");
  }

  addPoints() {
    
    var SoundSuccess = document.getElementById("SoundSuccess");
    let pointbonus = 1;
    if (this.state.perfect >= 4) {
      this.setState({
        perfecttext: "Top"
      });
      pointbonus = 2;
    }
    if (this.state.perfect >= 9) {
      this.setState({
        perfecttext: "Super"
      });
      pointbonus = 4;
    }
    if (this.state.perfect >= 14) {
      this.setState({
        perfecttext: "Awesome !"
      });
      pointbonus = 6;
    }

    if (this.state.perfect >= 19) {
      this.setState({
        perfecttext: "Perfect"
      });
      pointbonus = 8;
    }
    this.setState(
      {
        perfect: this.state.perfect + 1,
        ticks: this.state.ticks + 1,
        endlesspoints: this.state.endlesspoints + pointbonus
      },
      () => {
        if (this.state.ticks < Level[this.state.level - 1].ticks) {
          if (SoundSuccess) {
            SoundSuccess.play();
          }
        } else {
          this.setState({
            shownextlevel: true
          });
        }
        if (
          this.state.perfect === 5 ||
          this.state.perfect === 10 ||
          this.state.perfect === 15 ||
          this.state.perfect === 20
        ) {
          this.setState({ perfectshow: true });
        } else {
          this.setState({ perfectshow: false });
        }
      }
    );
  }
  addError() {
    var SoundError = document.getElementById("SoundError");
    this.setState(
      {
        perfect: 0,
        ticks: this.state.ticks + 1,
        error: this.state.error + 1
      },
      () => {
        if (this.state.error < Level[this.state.level - 1].error) {
          this.setState({
            running: false
          });
          if (SoundError) {
            SoundError.play();
          }
        } else {
          this.setState({
            showerror: true
          });
        }
      }
    );
  }
  resetError = () => {
    clearInterval(this.interval);
    this.setState(
      {
        error: 0,
        count: [1],
        level: 1,
        endlesspoints: 0,
        points: 0,
        ticks: 0,
        running: true,
        showerror: false,
        perfect:0
      },
      () => {
        this.interval = setInterval(() => {
          let count = this.state.count;
          count.push([this.state.count.length + 1]);
          this.setState({
            count: count
          });
        }, Level[this.state.level - 1].interval);
      }
    );
  };
  wrapperClass() {
    if (Level[this.state.level - 1].setting === 1) {
      return "game wrapper";
    }
    if (Level[this.state.level - 1].setting === 2) {
      return "game mid wrapper";
    }
    if (Level[this.state.level - 1].setting === 3) {
      return "game night wrapper";
    }
  }

//   gameMusic() {
//     if (Level[this.state.level - 1].setting === 1) {
//       return SoundMusic;
//     }
//     if (Level[this.state.level - 1].setting === 2) {
//       return SoundMusic2;
//     }
//     if (Level[this.state.level - 1].setting === 3) {
//       return SoundMusic3;
//     }
//   }

  nextLevel = () => {
    clearInterval(this.interval);
    let nextlevel = this.state.level + 1;
    if (nextlevel > Level.length) {
      nextlevel = this.state.level;
    }
    this.setState({
      count: [1],
      level: nextlevel,
      points: 0,
      error: 0,
      ticks: 0,
      running: true,
      shownextlevel: false
    });
    this.interval = setInterval(() => {
      let count = this.state.count;
      count.push([this.state.count.length + 1]);
      this.setState({
        count: count
      });
    }, Level[this.state.level - 1].interval);
    this.targetElement = document.querySelector("#wrapper");
  };

  render() {
    if (this.state.showerror) {
      return (
        <Failed
          endlesspoints={this.state.endlesspoints}
          reseterror={this.resetError}
        />
      );
    }
    if (this.state.shownextlevel) {
      return <NextLevel nextlevel={this.nextLevel} />;
    }

    if (!this.state.showerror && !this.state.shownextlevel) {
      let perfectshow = <div className="perfect">{this.state.perfecttext}</div>;
      if (this.state.perfectshow) {
        perfectshow = (
          <div className="perfect show">{this.state.perfecttext}</div>
        );
      }
      let elements = this.state.count.map(count => {
        return (
          <Fallitem
            showerror={this.state.showerror}
            shownextlevel={this.state.shownextlevel}
            level={this.state.level}
            adderror={() => this.addError()}
            addpoints={() => this.addPoints()}
            key={count}
          />
        );
      });
      return (
        <div id="wrapper" className={this.wrapperClass()}>
          <div className="level">Level: {this.state.level}</div>
          <div className="points">{this.state.endlesspoints}</div>
          {perfectshow}
          {elements}
          <div className="street" />
          <div className="green" />
          <div className="m1">
            <div className="m blue" />
            <div className="m yellow" />
            <div className="m grey" />
          </div>
          {/* <div className="sounds">
            <audio id="SoundSuccess" ref="success" src={SuccessSound} />
            <audio id="SoundError" ref="success" src={SoundError} />

            <audio
              id="SoundMusic"
              ref="success"
              src={this.gameMusic()}
              autoPlay
            />
          </div> */}
        </div>
      );
    }
  }
}

export default Game;
