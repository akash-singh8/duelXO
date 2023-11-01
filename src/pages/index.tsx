import style from "@/styles/Home.module.css";
import Option from "@/components/Option";
import Link from "next/link";

export default function Home() {
  return (
    <main className={style.home}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <img src="raw_xo.png" alt="tic tac toe" className={style.rawxo} />

      <div className={style.options}>
        <Link href={"/play"} className="link">
          <Option
            title={"PLAY ON"}
            head={"SAME DEVICE"}
            image={"/samedevice.png"}
          />
        </Link>
        <Option
          title={"PLAY"}
          head={"MULTIPLAYER"}
          image={"/multiplayer.png"}
        />
      </div>
    </main>
  );
}
