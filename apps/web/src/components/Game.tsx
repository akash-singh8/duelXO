import style from "@/styles/Play.module.css";
import { useEffect } from "react";

const Game = (props: { gameHandler: any }) => {
  useEffect(props.gameHandler, []);

  return (
    <main className={style.play}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <div className={style.turn}>
        <h2>O's</h2>
        <p>TURN</p>
      </div>

      <div className={style.xo}>
        <span
          data-pos="00"
          className={`${style.box} ${style.top} ${style.left}`}
        ></span>
        <span data-pos="01" className={`${style.box} ${style.top}`}></span>
        <span
          data-pos="02"
          className={`${style.box} ${style.top} ${style.right}`}
        ></span>
        <span data-pos="10" className={`${style.box} ${style.left}`}></span>
        <span data-pos="11" className={`${style.box}`}></span>
        <span data-pos="12" className={`${style.box} ${style.right}`}></span>
        <span
          data-pos="20"
          className={`${style.box} ${style.bottom} ${style.left}`}
        ></span>
        <span data-pos="21" className={`${style.box} ${style.bottom}`}></span>
        <span
          data-pos="22"
          className={`${style.box} ${style.bottom} ${style.right}`}
        ></span>
      </div>

      <div className={style.time}>
        <h2>00:08</h2>
        <p>TIME LEFT</p>
      </div>

      <button
        className={style.restart}
        onClick={() => {
          window.location.reload();
        }}
      >
        Restart
      </button>
    </main>
  );
};

export const checkWinner = (
  game: number[][],
  currRow: number,
  currCol: number
) => {
  const currMove = game[currRow][currCol];
  const x = game.length;
  let flag = true;

  // check for the first diagonal
  if (currRow === currCol) {
    for (let i = 0; i < x; i++) {
      if (game[i][i] !== currMove) {
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }

  // check for the other diagonal
  if (currRow + currCol === x - 1) {
    flag = true;
    for (let i = 0; i < 3; i++) {
      if (game[2 - i][i] !== currMove) {
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }

  // check for rows
  flag = true;
  for (let col = 0; col < x; col++) {
    if (game[currRow][col] !== currMove) {
      flag = false;
      break;
    }
  }
  if (flag) return true;

  // check for columns
  for (let row = 0; row < x; row++) {
    if (game[row][currCol] !== currMove) {
      return false;
    }
  }
  return true;
};

export default Game;
