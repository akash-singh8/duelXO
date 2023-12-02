import style from "@/styles/Multiplayer.module.css";
import { useRouter } from "next/router";

const MultiPlayer = () => {
  const router = useRouter();

  function createRoom() {
    const roomId = generateKey();

    const input = document.querySelector(
      `.${style.detail} input`
    ) as HTMLInputElement;
    const inputBtn = document.querySelector(
      `.${style.detail} button`
    ) as HTMLButtonElement;

    const orElement = document.querySelector(
      `.${style.container} p`
    ) as HTMLParagraphElement;

    const mainBtn = document.querySelector(
      `.${style.container} > button`
    ) as HTMLButtonElement;

    input.value = roomId;
    inputBtn.innerText = "copy id";
    orElement.innerText = "--- AND ---";
    mainBtn.innerText = "START";
  }

  const roomIdHandler = async () => {
    const inputBtn = document.querySelector(
      `.${style.detail} button`
    ) as HTMLButtonElement;
    const input = document.querySelector(
      `.${style.detail} input`
    ) as HTMLInputElement;

    if (inputBtn.innerText !== "join") {
      try {
        input.select();
        input.setSelectionRange(0, 8, "forward");
        await navigator.clipboard.writeText(input.value);
        inputBtn.innerText = "copied!";
      } catch (err) {
        console.error(err);
        alert("Can't copy room id!\nPlease try to select and copy.");
      }
    } else {
      if (input.value.length !== 8) {
        alert("Invalid room id!");
      } else {
        router.push(`multiplayer?room=${input.value}`);
      }
    }
  };

  const roomHandler = () => {
    const mainBtn = document.querySelector(
      `.${style.container} > button`
    ) as HTMLButtonElement;

    if (mainBtn.innerText === "START") {
      const input = document.querySelector(
        `.${style.detail} input`
      ) as HTMLInputElement;

      router.push(`multiplayer?room=${input.value}`);
    } else {
      createRoom();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.detail}>
        <input type="text" placeholder="enter id to join" />
        <button onClick={roomIdHandler}>join</button>
      </div>

      <p>--- OR ---</p>

      <button onClick={roomHandler}>Create Room</button>
    </div>
  );
};

const generateKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * 62);
    uniqueId += characters[randomIndex];
  }

  return uniqueId;
};

export default MultiPlayer;
