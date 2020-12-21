class Game {
  constructor(display, numbers, message) {
    this.display = display;
    this.numbers = numbers;
    this.message = message;
    this.huPlayer = "";
    this.randomNumbers = "";
    this.reset();
  }

  generateNumbers() {
    // get 4 random numbers between 0 -9
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 9);
      this.randomNumbers += randomNumber;
    }
  }

  async randomizeClicks() {
    for (let i = 0; i < this.randomNumbers.length; i++) {
      const randomNumber = this.randomNumbers[i];
      const button = this.findnumber(randomNumber);
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      //simulate a click
      button.style.background = "#808080";
      await timer(500);
      button.style.background = "#d3d3d3";
      await timer(500);
    }
  }

  findnumber(randomNumber) {
    for (const number of this.numbers) {
      if (number.textContent.includes(randomNumber)) {
        return number;
      }
    }
  }

  reset() {
    //reset the display to empty string
    this.display.innerText = "";

    //add event listener to number buttons

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
      this.message.innerText = "Congrats you win!";
      this.disableButtons();
    }

    if (
      this.huPlayer.length === this.randomNumbers.length &&
      this.huPlayer != this.randomNumbers
    ) {
      this.message.innerText = `You lost the right answer was ${this.randomNumbers}`;
      this.disableButtons();
    }
  }

  enableButtons() {
    this.numbers.forEach((number) => {
      number.disabled = false;
    });
  }
  disableButtons() {
    this.numbers.forEach((number) => {
      number.disabled = true;
    });
  }
}

// const variables

const startButton = document.getElementById("start");
const display = document.getElementById("display");
const message = document.getElementById("message");
const numbers = document.querySelectorAll("[data-number]");

const start = async () => {
  startButton.disabled = true;
  const game = new Game(display, numbers, message);
  game.generateNumbers();
  await game.randomizeClicks();
  startButton.disabled = false;
  game.enableButtons();
};

startButton.addEventListener("click", () => {
  start();
});
