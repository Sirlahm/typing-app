import classes from "./Select.module.css";

function Select({ handleChange }) {
  return (
    <select className={classes.select} name="count" onChange={handleChange}>
      <option value={60}>60s</option>
      <option value={120}>120s</option>
      <option value={180}>180s</option>
      <option value={300}>300s</option>
    </select>
  );
}

export default Select;
