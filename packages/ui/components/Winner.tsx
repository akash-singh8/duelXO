import "../styles/winner.css";

type WinnerProps = {
  winner: string;
};

export const Winner = ({ winner }: WinnerProps) => {
  return (
    <div className="winner">
      <div className="pop">
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
