const percentage = 1 - 230 / window.innerHeight;
const Level = [
  {
    interval: 3000,
    speed: 4000,
    break: 4000 * percentage,
    ticks: 7,
    error: 2,
    setting: 1
  },
  {
    interval: 1500,
    speed: 3500,
    break: 3500 * percentage,
    ticks: 20,
    error: 3,
    setting: 2
  },
  {
    interval: 1000,
    speed: 3000,
    break: 3000 * percentage,
    ticks: 30,
    error: 5,
    setting: 3
  },
  {
    interval: 1000,
    speed: 3000,
    break: 3000 * percentage,
    ticks: 40,
    error: 5,
    setting: 2
  },
  {
    interval: 500,
    speed: 2000,
    break: 2000 * percentage,
    ticks: 50,
    error: 5,
    setting: 1
  },
  {
    interval: 400,
    speed: 1300,
    break: 1300 * percentage,
    ticks: 5000,
    error: 5,
    setting: 1
  }
];

export default Level;
