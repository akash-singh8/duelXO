import style from "@/styles/Option.module.css";
import { useEffect } from "react";

type OptionProps = {
  title: string;
  head: string;
  image: string;
  child?: any;
};

const Option = ({ title, head, image, child }: OptionProps) => {
  useEffect(() => {
    const options = document.querySelectorAll(`.${style.option}`);

    function showChild() {
      const childElement = document.querySelector(
        `.${style.child} > div`
      ) as HTMLDivElement;

      childElement.style.display = "flex";

      setTimeout(() => {
        childElement.style.transform = "translateY(0)";
        childElement.style.opacity = "1";
      }, 10);

      options[1].removeEventListener("click", showChild);
    }

    if (child) {
      options[1].addEventListener("click", showChild);
    }
  }, []);

  return (
    <div className={style.option}>
      <div className={style.main}>
        <div>
          <p>.{title}</p>
          <h1>{head}</h1>
        </div>
        <img src={image} alt="device" />
      </div>

      <div className={style.child}>{child}</div>
    </div>
  );
};

export default Option;
