import style from "@/styles/Play.module.css";
import Game, { checkWinner } from "../components/Game";
import { Winner } from "ui/components";
import { useEffect, useState } from "react";
import { messageType } from "common/src";

export const getServerSideProps = async ({ req }: any) => {
  const url = new URL(req.url, "http://localhost:3000");
  const room = url.searchParams.get("room");

  return {
    props: {
      room,
    },
  };
};

const multiplay = ({ room }: { room: string }) => {
  let ws: WebSocket;
  const [winner, setWinner] = useState("");

  // game variables
  const game = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  let steps = 0;
  let currMove = false;
  let currPlayer = true;
  let timer: any = undefined;

  useEffect(() => {
    ws = new WebSocket(`ws://localhost:3053?room=${room}`);

    ws.onopen = () => {
      console.log("Connected to websocket server");
    };

    ws.onmessage = (event) => {
      const data: messageType = JSON.parse(event.data);

      if (data.error.status !== 200) {
        alert(data.error.message);
        return;
      }

      const item = document.querySelectorAll(`.${style.box}`)[
        data.move.row * 3 + data.move.col
      ] as HTMLSpanElement;

      updateGame(item, data.move.row, data.move.col);
      currPlayer = true;
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket server");
    };
  }, []);

  const updateGame = (item: HTMLSpanElement, row: number, col: number) => {
    if (!item) return;

    const turn = document.querySelector(
      `.${style.turn} h2`
    ) as HTMLHeadingElement;
    const time = document.querySelector(
      `.${style.time} h2`
    ) as HTMLHeadingElement;

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
    steps += 1;

    if (steps > 4) {
      const isWinner = checkWinner(game, row, col);

      if (isWinner) {
        clearInterval(timer);
        setWinner(currMove ? "X" : "O");
        return;
      }
    }

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

    currMove = !currMove;
  };

  const gameHandler = () => {
    const items = document.querySelectorAll(`.${style.box}`);

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

        if (!currPlayer) {
          item.style.cursor = "not-allowed";
        }
      });

      item.addEventListener("mouseout", () => {
        if (game[row][col] !== -1) return;

        if (currMove) {
          item.innerText = "";
        } else {
          item.innerText = "";
        }

        if (!currPlayer) {
          item.style.cursor = "pointer";
        }
      });

      item.addEventListener("click", () => {
        if (game[row][col] !== -1 || !currPlayer) {
          item.style.backgroundColor = "rgba(255, 82, 82, 0.28)";

          setTimeout(() => {
            item.style.backgroundColor = "transparent";
          }, 280);
          return;
        }

        if (currPlayer) {
          // send ws message to other client
          ws.send(JSON.stringify({ row, col }));

          updateGame(item, row, col);
          currPlayer = false;
        }
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

export default multiplay;
