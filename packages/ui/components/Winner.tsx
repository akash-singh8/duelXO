import "../styles/winner.css";

type WinnerProps = {
  winner: string;
};

export const Winner = ({ winner }: WinnerProps) => {
  return (
    <div className="winner">
      <div className="pop">
        <h2 style={{ color: winner === "X" ? "#58c2ff" : "#ffbb48" }}>
          {winner === "N" ? "Draw" : winner}
        </h2>
        <p>{winner === "N" ? "_______________" : "wins"}</p>

        <div>
          <button
            style={{ backgroundColor: winner === "X" ? "#58c2ff" : "#ffbb48" }}
            // can be optimized by resetting the game variables
            onClick={() => {
              window.location.reload();
            }}
          >
            Restart
          </button>
          <button
            // can be optimized by using useRouter hook
            onClick={() => {
              window.location.href = "/";
            }}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
