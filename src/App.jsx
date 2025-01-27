import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(() => generateAllnewNumbers());
  var gameWon = false;
  if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  ) {
    gameWon = true;
    console.log("Game won!");
  }

  function getRandom() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function generateAllnewNumbers() {
    var res = [];
    for (var i = 0; i < 10; i++) {
      var random = getRandom();
      res.push({ value: random, isHeld: false, id: nanoid() });
    }
    return res;
  }

  function hold(id) {
    setDice(
      dice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else return die;
      })
    );
  }

  function roll() {
    if (gameWon) {
      setDice(generateAllnewNumbers());
      gameWon = false;
    } else {
      setDice(
        dice.map((die) => {
          if (!die.isHeld) {
            return { ...die, value: getRandom() };
          } else return die;
        })
      );
    }
  }
  return (
    <>
      {gameWon && <ReactConfetti />}
      <main className="mainContainer">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="diceContainer">
          {dice.map((die) => (
            <Die
              value={die.value}
              key={die.id}
              id={die.id}
              isHeld={die.isHeld}
              hold={hold}
            />
          ))}
        </div>
        <button className="rollButton" onClick={roll}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
