import "../styles/option.css";
import { useEffect } from "react";

type OptionProps = {
  title: string;
  head: string;
  image: string;
  child?: any;
};

export const Option = ({ title, head, image, child }: OptionProps) => {
  useEffect(() => {
    const options = document.querySelectorAll(".option");

    function showChild() {
      const childElement = document.querySelector(
        ".child > div"
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
    <div className="option">
      <div className="main">
        <div>
          <p>.{title}</p>
          <h1>{head}</h1>
        </div>
        <img src={image} alt="device" />
      </div>

      <div className="child">{child}</div>
    </div>
  );
};
