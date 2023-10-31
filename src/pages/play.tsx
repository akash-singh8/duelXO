import style from "@/styles/Play.module.css";

const play = () => {
  return (
    <main className={style.play}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <div className={style.turn}>
        <h2>O's</h2>
        <p>TURN</p>
      </div>

      <div className={style.xo}>
        <span className={`${style.box} ${style.top} ${style.left}`}></span>
        <span className={`${style.box} ${style.top}`}></span>
        <span className={`${style.box} ${style.top} ${style.right}`}></span>
        <span className={`${style.box} ${style.left}`}></span>
        <span className={`${style.box}`}></span>
        <span className={`${style.box} ${style.right}`}></span>
        <span className={`${style.box} ${style.bottom} ${style.left}`}></span>
        <span className={`${style.box} ${style.bottom}`}></span>
        <span className={`${style.box} ${style.bottom} ${style.right}`}></span>
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
