import style from "@/styles/Multiplayer.module.css";

function MultiPlayer() {
  return (
    <div className={style.container}>
      <div className={style.detail}>
        <input type="text" placeholder="enter id to join" />
        <button>join</button>
      </div>

      <p>--- OR ---</p>

      <button>Create Room</button>
    </div>
  );
}

export default MultiPlayer;
