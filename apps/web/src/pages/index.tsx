import style from "@/styles/Home.module.css";
import { Option } from "ui/components";
import Link from "next/link";
import { useEffect } from "react";
import MultiPlayer from "../components/MultiPlayer";

export default function Home() {
  useEffect(() => {
    const single = document.querySelector(".single") as HTMLDivElement;
    const multi = document.querySelector(".multi") as HTMLDivElement;

    multi.addEventListener("click", () => {
      single.style.display = "none";
      multi.classList.add(style.expand);

      const expand = document.querySelector(
        `.${style.expand} div div:last-child`
      ) as HTMLDivElement;

      expand.style.display = "flex";
    });
  }, []);

  return (
    <main className={style.home}>
      <img src="/logo.svg" alt="duelxo" className="logo" />

      <img src="raw_xo.png" alt="tic tac toe" className={style.rawxo} />

      <div className={style.options}>
        <div className="single">
          <Link href={"/play"} className="link">
            <Option
              title={"PLAY ON"}
              head={"SAME DEVICE"}
              image={"/samedevice.png"}
            />
          </Link>
        </div>

        <div className="multi">
          <Option
            title={"PLAY"}
            head={"MULTIPLAYER"}
            image={"/multiplayer.png"}
            child={<MultiPlayer />}
          />
        </div>
      </div>
    </main>
  );
}
