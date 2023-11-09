import style from "@/styles/Multiplayer.module.css";

function MultiPlayer() {
  function generateKey() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueId = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * 62);
      uniqueId += characters[randomIndex];
    }

    return uniqueId;
  }

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

  return (
    <div className={style.container}>
      <div className={style.detail}>
        <input type="text" placeholder="enter id to join" />
        <button>join</button>
      </div>

      <p>--- OR ---</p>

      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}

export default MultiPlayer;
