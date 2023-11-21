import style from "@/styles/Play.module.css";
import Game, { checkWinner } from "../components/Game";
import { Winner } from "ui/components";
import { useState } from "react";

const index = () => {
  const [winner, setWinner] = useState("");

  const gameHandler = () => {
    let steps = 0;
    let timer: any = undefined;
    let currMove = false;
    const game = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    const items = document.querySelectorAll(`.${style.box}`);
    const turn = document.querySelector(
      `.${style.turn} h2`
    ) as HTMLHeadingElement;
    const time = document.querySelector(
      `.${style.time} h2`
    ) as HTMLHeadingElement;

    for (let i = 0; i < 9; i++) {
      const item = items[i] as HTMLSpanElement;
      const position = item.dataset.pos as String;
      const row = parseInt(position[0]);
      const col = parseInt(position[1]);

      item.addEventListener("mouseenter", () => {
        if (game[row][col] !== -1) return;

        if (currMove) {
          item.style.color = "rgba(87, 193, 255, 0.5)";
          item.innerText = "X";
        } else {
          item.style.color = "rgba(255, 188, 71, 0.5)";
          item.innerText = "O";
        }
      });

      item.addEventListener("mouseout", () => {
        if (game[row][col] !== -1) return;

        if (currMove) {
          item.innerText = "";
        } else {
          item.innerText = "";
        }
      });

      item.addEventListener("click", () => {
        if (game[row][col] !== -1) {
          item.style.backgroundColor = "rgba(255, 82, 82, 0.28)";

          setTimeout(() => {
            item.style.backgroundColor = "transparent";
          }, 280);
          return;
        }

        steps += 1;

        if (timer) {
          clearInterval(timer);
          time.innerText = "00:08";
        }

        let timeLimit = 8;
        timer = setInterval(() => {
          time.innerText = `00:0${--timeLimit}`;
          if (timeLimit === 0) {
            setWinner(currMove ? "O" : "X");
            clearInterval(timer);
          }
        }, 1000);

        if (currMove) {
          time.style.color = "#ffbb48";
          item.style.color = "#58C2FF";
          item.innerText = "X";
          turn.innerText = "O's";
          turn.style.color = "#ffbb48";
        } else {
          time.style.color = "#58C2FF";
          item.style.color = "#ffbb48";
          item.innerText = "O";
          turn.innerText = "X's";
          turn.style.color = "#58C2FF";
        }

        item.style.backgroundColor = "transparent";
        item.style.cursor = "not-allowed";

        game[row][col] = currMove ? 1 : 0;

        if (steps > 4) {
          const isWinner = checkWinner(game, row, col);

          if (isWinner) {
            clearInterval(timer);
            setWinner(currMove ? "X" : "O");
          }
        }

        currMove = !currMove;
      });
    }
  };

  return (
    <>
      {winner ? <Winner winner={winner} /> : ""}
      <Game gameHandler={gameHandler} />;
    </>
  );
};

export default index;
