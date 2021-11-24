import React, { useState, useEffect } from 'react';
import board from './assets/board.jpeg';
import { model } from './game';

const isSunk = (hits) => {
  for (let hit of hits) {
    if (hit !== 'hit') {
      return false;
    }
  }
  return true;
};

function Board() {
  const [gameStatus, setGameStatus] = useState(model);
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [shipsSunk, setShipsSunk] = useState(0);
  const numShips = 3;

  useEffect(() => {
    if (shipsSunk === numShips) {
      alert(`You sank all my battleships, in ${guesses}  guesses`);
    }
  }, [shipsSunk, numShips, guesses]);
  useEffect(() => {
    if (shipsSunk) {
      alert(`You sank my battleship`);
    }
  }, [shipsSunk]);
  const fire = (guess) => {
    for (let shipIndex = 0; shipIndex < gameStatus.ships.length; shipIndex++) {
      const ship = { ...gameStatus.ships[shipIndex] };
      let index = ship.locations.indexOf(guess);
      if (ship.hits[index] === 'hit') {
        alert('Oops, you already hit that location!');
        return true;
      } else if (index >= 0) {
        setGameStatus((prev) => {
          let newShips = [...prev.ships];
          newShips[shipIndex].hits[index] = 'hit';
          if (isSunk(newShips[shipIndex].hits)) {
            setShipsSunk((previous) => ++previous);
            return {
              ...prev,
              ships: newShips,
            };
          }
          return {
            ...prev,
            ships: newShips,
          };
        });
        // display Hit in guessed area
        alert('HIT!');
        return true;
      }
    }
    alert('You missed.');
    return false;
  };

  const handleGuess = (e) => {
    setGuessInput(e.target.value);
  };

  const handleFire = (e) => {
    e.preventDefault();
    // validate Guess
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (!guessInput || guessInput.length !== 2) {
      alert('Oops, please enter a letter and a number on the board.');
    } else {
      const firstChar = guessInput.charAt(0);
      const row = alphabet.indexOf(firstChar);
      const column = guessInput.charAt(1);
      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board.");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("Oops, that's off the board!");
      } else {
        // hit something in board check!!
        setGuesses((prev) => ++prev);
        fire(row + column);
      }
    }
  };
  return (
    <div
      style={{
        position: 'relative',
        width: '1024px',
        height: '863px',
        margin: 'auto',
        background: `url('${board}') no-repeat`,
      }}
      id="board"
    >
      <div
        id="messageArea"
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          color: 'rgb(83, 175, 19)',
        }}
      ></div>
      <table>
        <tbody>
          <tr>
            <td id="00"></td>
            <td id="01"></td>
            <td id="02"></td>
            <td id="03"></td>
            <td id="04"></td>
            <td id="05"></td>
            <td id="06"></td>
          </tr>
          <tr>
            <td id="10"></td>
            <td id="11"></td>
            <td id="12"></td>
            <td id="13"></td>
            <td id="14"></td>
            <td id="15"></td>
            <td id="16"></td>
          </tr>
          <tr>
            <td id="20"></td>
            <td id="21"></td>
            <td id="22"></td>
            <td id="23"></td>
            <td id="24"></td>
            <td id="25"></td>
            <td id="26"></td>
          </tr>
          <tr>
            <td id="30"></td>
            <td id="31"></td>
            <td id="32"></td>
            <td id="33"></td>
            <td id="34"></td>
            <td id="35"></td>
            <td id="36"></td>
          </tr>
          <tr>
            <td id="40"></td>
            <td id="41"></td>
            <td id="42"></td>
            <td id="43"></td>
            <td id="44"></td>
            <td id="45"></td>
            <td id="46"></td>
          </tr>
          <tr>
            <td id="50"></td>
            <td id="51"></td>
            <td id="52"></td>
            <td id="53"></td>
            <td id="54"></td>
            <td id="55"></td>
            <td id="56"></td>
          </tr>
          <tr>
            <td id="60"></td>
            <td id="61"></td>
            <td id="62"></td>
            <td id="63"></td>
            <td id="64"></td>
            <td id="65"></td>
            <td id="66"></td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleFire}>
        <input
          type="text"
          id="guessInput"
          placeholder="A0"
          value={guessInput}
          onChange={handleGuess}
        />
        <input type="submit" id="fireButton" value="Fire!" />
      </form>
    </div>
  );
}

export default Board;
