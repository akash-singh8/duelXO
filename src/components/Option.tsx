import style from "@/styles/Option.module.css";

type OptionProps = {
  title: string;
  head: string;
  image: string;
};

const Option = ({ title, head, image }: OptionProps) => {
  return (
    <div className={style.option}>
      <div>
        <p>.{title}</p>
        <h1>{head}</h1>
      </div>

      <img src={image} alt="device" />
    </div>
  );
};

export default Option;
