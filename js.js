class PinNumber {
  constructor(numberButtons, display, message) {
    this.numberButtons = numberButtons;
    this.display = display;
    this.message = message;
    this.reset();
  }

  async randomize() {
    //get random number to initiate amount for game
    const amount = Math.floor(Math.random() * 9 + 1);
    for (let num = 0; num < amount; num++) {
      //random numbers between 0-9
      const randNum = Math.floor(Math.random() * 9);
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      this.aiPlayer.push(randNum);
      this.click(randNum);
      await timer(500);
      this.unClick(randNum);
    }
    this.message.innerText = "Now its your turn to try and match it";
  }

  click(number) {
    for (const ele of this.numberButtons) {
      if (ele.textContent.includes(number)) {
        ele.id = "click";
      }
    }
  }

  unClick(number) {
    for (const ele of this.numberButtons) {
      if (ele.textContent.includes(number)) {
        ele.id = "";
      }
    }
  }

  reset() {
    this.huPlayer = "";
    this.aiPlayer = [];
  }
  checkWin() {
    const winningNums = this.aiPlayer.join("");
    if (this.display.innerText === winningNums) {
      this.message.innerText = "Congrats You Win!";
      this.disableButtons();
      this.reset();
      return;
    }

    if (this.display.innerText.length === winningNums.length) {
      this.message.innerText = "You Lose Try Again!";
      this.disableButtons();
      this.reset();
      return;
    }
  }

  enableButtons() {
    this.numberButtons.forEach((button) => {
      button.disabled = false;
      button.addEventListener("click", () => {
        this.updateDisplay(button.innerText);
      });
    });
  }

  disableButtons() {
    this.numberButtons.forEach((button) => {
      button.disabled = true;
    });
  }

  updateDisplay(number) {
    this.huPlayer += number;
    this.display.innerText = this.huPlayer;
    this.checkWin();
  }
}

//Main functions

const numberButtons = document.querySelectorAll("[data-number]");
const startButton = document.querySelector("[data-start]");
const display = document.querySelector("[data-display]");
const message = document.querySelector("[data-message");

let gameStarted;

const start = async () => {
  startButton.disabled = true;
  const pinNumberGame = new PinNumber(numberButtons, display, message);
  pinNumberGame.disableButtons();
  await pinNumberGame.randomize();
  startButton.disabled = false;
  pinNumberGame.enableButtons();
};

startButton.addEventListener("click", () => {
  display.innerText = "";
  gameStarted = false;
  start();
});
