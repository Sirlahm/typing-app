import classes from "./Button.module.css";

function Button({ children, handleClick, ...props }) {
  return (
    <button className={classes.button} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
