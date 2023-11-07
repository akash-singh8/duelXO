import style from "@/styles/Winner.module.css";

type WinnerProps = {
  winner: string;
};

const Winner = ({ winner }: WinnerProps) => {
  return (
    <div className={style.winner}>
      <div className={style.pop}>
        <h2 style={{ color: winner === "X" ? "#58c2ff" : "#ffbb48" }}>
          {winner}
        </h2>
        <p>wins</p>

        <div>
          <button
            style={{ backgroundColor: winner === "X" ? "#58c2ff" : "#ffbb48" }}
          >
            Restart
          </button>
          <button>close</button>
        </div>
      </div>
    </div>
  );
};

export default Winner;
