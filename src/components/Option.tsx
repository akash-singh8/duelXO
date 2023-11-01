import style from "@/styles/Option.module.css";

type OptionProps = {
  title: string;
  head: string;
  image: string;
  child?: any;
};

const Option = ({ title, head, image, child }: OptionProps) => {
  return (
    <div className={style.option}>
      <div className={style.main}>
        <div>
          <p>.{title}</p>
          <h1>{head}</h1>
        </div>
        <img src={image} alt="device" />
      </div>

      <div className={style.extra}>{child}</div>
    </div>
  );
};

export default Option;
