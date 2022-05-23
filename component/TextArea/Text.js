import classes from "./Text.module.css";

function TextArea({
    dataCy,
  handleChange,
  rows,
  cols,
  value,
  keyDown,
  status,
  REF,
  width,
  bg,
  color,
  placeholder,
}) {
  return (
    <textarea
    data-cy={dataCy}
      placeholder={placeholder}
      ref={REF}
      className={classes.textarea}
      disabled={status === false ? status : status !== "started"}
      rows={rows ? rows : "10"}
      cols={cols ? cols : "50"}
      onKeyDown={keyDown}
      value={value}
      onChange={handleChange}
      style={{ width: width, backgroundColor: bg, color: color }}
    ></textarea>
  );
}

export default TextArea;
