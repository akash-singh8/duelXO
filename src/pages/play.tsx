import style from "@/styles/Play.module.css";
import { useEffect } from "react";

const play = () => {
  useEffect(() => {
    let currMove = false;
    const game = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    const items = document.querySelectorAll(`.${style.box}`);

    for (let i = 0; i < 9; i++) {
      const item = items[i] as HTMLSpanElement;
      const position = item.dataset.pos as String;
      const row = parseInt(position[0]);
      const col = parseInt(position[1]);

      item.addEventListener("click", () => {
        if (game[row][col] !== -1) {
          item.style.backgroundColor = "rgba(255, 82, 82, 0.28)";

          setTimeout(() => {
            item.style.backgroundColor = "transparent";
          }, 400);
          return;
        }

        if (currMove) {
          item.style.color = "#58C2FF";
          item.innerText = "X";
        } else {
          item.style.color = "#ffbb48";
          item.innerText = "O";
        }

        item.style.backgroundColor = "transparent";
        item.style.cursor = "not-allowed";

        game[row][col] = currMove ? 1 : 0;
        currMove = !currMove;
      });
    }
  }, []);

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

      <button className={style.restart}>Restart</button>
    </main>
  );
};

export default play;
