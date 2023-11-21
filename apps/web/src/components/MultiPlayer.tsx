import style from "@/styles/Multiplayer.module.css";

const MultiPlayer = () => {
  function createRoom() {
    const roomId = generateKey();

    // send a ws request to join the room

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

  const roomIdHandler = () => {
    const inputBtn = document.querySelector(
      `.${style.detail} button`
    ) as HTMLButtonElement;
    const input = document.querySelector(
      `.${style.detail} input`
    ) as HTMLInputElement;

    if (inputBtn.innerText !== "join") {
      inputBtn.innerText = "copied!";
      navigator.clipboard.writeText(input.value);
    } else {
      if (input.value.length !== 8) {
        alert("Invalid room id!");
      } else {
        console.log("joining room...");
      }
    }
  };

  const roomHandler = () => {
    const mainBtn = document.querySelector(
      `.${style.container} > button`
    ) as HTMLButtonElement;

    if (mainBtn.innerText === "START") {
      console.log("starting game...");
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
