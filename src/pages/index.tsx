import style from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={style.home}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <img src="raw_xo.png" alt="tic tac toe" className={style.rawxo} />
    </main>
  );
}
