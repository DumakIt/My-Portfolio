import style from "./spinner.module.css";

export default function Spinner({ background }: { background?: string }) {
  return <div className={style.spinner} style={{ background }} />;
}
