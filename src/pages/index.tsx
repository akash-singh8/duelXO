import style from "@/styles/Home.module.css";
import Option from "@/components/Option";

export default function Home() {
  return (
    <main className={style.home}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <img src="raw_xo.png" alt="tic tac toe" className={style.rawxo} />

      <div className={style.options}>
        <Option
          title={"PLAY ON"}
          head={"SAME DEVICE"}
          image={"/samedevice.png"}
        />
        <Option
          title={"PLAY"}
          head={"MULTIPLAYER"}
          image={"/multiplayer.png"}
        />
      </div>
    </main>
  );
}
