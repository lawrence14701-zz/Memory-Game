class MemorizeGame {
  constructor(numbers, display, message) {
    this.numbers = numbers;
    this.display = display;
    this.message = message;

    //human player and randomNumbers always gets reset when new game is created
    this.reset();
  }

  reset() {
    this.huPlayer = "";
    this.randomNumbers = "";
    // set display text to empty string
    this.display.innerText = "";
    this.message.innerText = "";

    // add event listener for every button
    this.numbers.forEach((number) => {
      number.addEventListener("click", () => {
        this.updateDisplay(number.innerText);
      });
    });
  }

  updateDisplay(number) {
    this.huPlayer += number;
    this.display.innerText = this.huPlayer;
    this.checkWin();
  }

  checkWin() {
    if (this.huPlayer === this.randomNumbers) {
      this.message.innerText = "Congrats You Win!";
      //disable the buttons until the user starts again
      this.disabledButtons();
    }

    if (
      this.huPlayer.length === this.randomNumbers.length &&
      this.huPlayer != this.randomNumbers
    ) {
      this.message.innerText = `You lose, real answer was ${this.randomNumbers}!`;
      this.disabledButtons();
    }
  }

  generateNumbers() {
    // get 4 random numbers between 0 - 9
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 9);
      this.randomNumbers += randomNumber;
    }
  }
  async randomizeClicks() {
    for (let i = 0; i < this.randomNumbers.length; i++) {
      const randomNumber = this.randomNumbers[i];
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      const button = this.findNumber(randomNumber);
      //simulate a click
      button.style.background = "#808080 ";
      await timer(1000);
      //simulate a click
      button.style.background = "#d3d3d3 ";
    }
  }

  findNumber(randomNumber) {
    for (const number of this.numbers) {
      if (number.textContent.includes(randomNumber)) {
        return number;
      }
    }
  }

  disabledButtons() {
    this.numbers.forEach((number) => {
      number.disabled = true;
    });
  }

  enableButtons() {
    this.numbers.forEach((number) => {
      number.disabled = false;
    });
  }
}

// constant variables

const numbers = document.querySelectorAll("[data-number]");
const startButton = document.getElementById("start");
const display = document.getElementById("display");
const message = document.getElementById("message");

let isStarted;

const start = async () => {
  // prevent user from starting a new game when the game is in motion
  startButton.disabled = true;
  //start a new instance of the game, pass in the variables the game depends on
  const game = new MemorizeGame(numbers, display, message);

  //generate a random set of numbers the user needs to memorize and match
  game.generateNumbers();
  console.log(game.randomNumbers);
  // we use async await becuase we want to wait till the computer finishes processing this line before executing the next
  await game.randomizeClicks();
  game.enableButtons();
  startButton.disabled = false;
};

startButton.addEventListener("click", () => {
  start();
});
