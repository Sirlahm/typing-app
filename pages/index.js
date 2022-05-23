import { useState, useEffect, useRef } from "react";
import Modal from "../component/Modal/Modal";
import Button from "../component/Button/Button";
import Select from "../component/Select/Select";
import TextArea from "../component/TextArea/Text";
import classes from "./index.module.css";
function App() {
    
const string =
"This is a simple app for users to test and improve their typing skills. The app will present the user with a random text paragraph or the user can c/p his own choice of the paragraph. We will call it a challenge. Then the user will select the time duration of the test it can be 1 m, 2m 5m, or custom. Once the test is set up he can start the test and hence the timer. The user needs to type the paragraph in another text box as it is. For each correct word he will get 1 point, for each incorrect word he types he will receive 0 points. Total points will be the total no of words in the paragraph. At the end of the test, the user will be presented with his score which is his typing accuracy and speed.";
const [words, setWords] = useState(string);
  const [seconds, setSeconds] = useState(60);
  const [count, setCount] = useState(seconds);
  const [inputText, setInputText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [CharIndex, setCharIndex] = useState(-1);
  const [Char, setChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [status, setStatus] = useState("");
  const [compose, setCompose] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  function start() {
    if (status === "finished") {
      setWordIndex(0);
      setCorrect(0);
      setCharIndex(-1);
      setChar("");
      setWpm(0)
    }

    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCount((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setInputText("");
            setWords(string)
            
            return seconds;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function getWpm(e) {
    setInputText(e.target.value);
    setWpm(Math.round((inputText.length / 5 / seconds) * seconds));
  }

  function getCountDown(e) {
    setCount(e.target.value);
    setSeconds(e.target.value);
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch(key);
      setWordIndex(wordIndex + 1);
      setCharIndex(CharIndex + 1);
      // caplock
    } else if (keyCode === 20) {
      setChar("");
      // backspace
    } else if (keyCode === 8) {
      checkMatch(key);
      setWordIndex(wordIndex - 1);
      setCharIndex(CharIndex - 1);
      setChar("");
    } else {
      setCharIndex(CharIndex + 1);
      setChar(key);
    }
  }

  function checkMatch(KEY) {
    const inputWord = inputText.trim().split(" ");
    const splitedWords = words.trim().split(" ");

    splitedWords.find((char, i) => {
      if (splitedWords[i] === inputWord[wordIndex] && KEY !== "Backspace") {
        setCorrect(correct + 1);
      }
    });
  }

  function getCharClass(charIdx, char) {
    if (charIdx === CharIndex && Char && status !== "finished") {
      if (char === Char) {
        return classes.success;
      } else {
        return classes.danger;
      }
    } else {
      return "";
    }
  }

  function close() {
    setCompose((prev) => !prev);
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.header}> TEST AND IMPROVE YOUR TYPING SKILLS.</h1>
      {compose && (
        <Modal
          compose={compose}
          close={close}
          words={words}
          setWords={setWords}
        />
      )}
      <div>
        <div className={classes.words}>
          {status === "started" &&
            words
              .trim()
              .split("")
              .map((char, idx) => (
                <span className={getCharClass(idx, char)} key={idx}>
                  {char}
                </span>
              ))}
        </div>
      </div>
      <div>
        <div className={classes.set}>
          <h2 className={classes.count}>Timer: {count}</h2>
          <Select handleChange={getCountDown} />
          {status === "started" ? null : (
            <Button data-cy="button-compose" handleClick={close}>
              Compose Paragraph
            </Button>
          )}
        </div>
      </div>
      <div>
        <TextArea
          dataCy="text-area-1"
          placeholder={
            "Click The Start Button to show a Paragraph and Start Typing Here..."
          }
          width={"100%"}
          className={classes.area}
          rows={1}
          cols={20}
          REF={textInput}
          status={status}
          value={inputText}
          handleChange={getWpm}
          bg={"lightgray"}
          color={"#ffffff"}
          keyDown={handleKeyDown}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button data-cy="button-start" handleClick={start}>
          Start
        </Button>
      </div>

      {status === "finished" && (
        <div>
          <h2 data-cy="h1-1" className={classes.count}>
            Wpm: {wpm}
          </h2>
          <h2 data-cy="h1-2" className={classes.count}>
              
            Typing Accuracy: {`${correct} / ${words.split(" ").length - 1}`}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;


// length - 1 in sense that  the user might not  space the last word.