import classes from "./Modal.module.css";
import { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import TextArea from "../TextArea/Text";

function Modal({ compose, close, words, setWords, ...props }) {
  const [text, setText] = useState("");
  function modal() {
    if (text.length > 0) {
      setWords(text);
      close();
    }
  }
  return (
    <div data-cy="modal" className={classes.container}>
      <div className={classes.modal}>
        <TextArea
          dataCy="text-area-2"
          placeholder={"Compo0se Paragraph Here..."}
          value={text}
          handleChange={(e) => setText(e.target.value)}
          status={false}
        />

        <div className={classes.buttons}>
          <Button data-cy="button-submit" handleClick={modal}>
            Submit
          </Button>
          <Button data-cy="button-cancel" handleClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
