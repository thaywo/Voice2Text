import "./App.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Editor from "./Components/Editor/Editor.jsx";
import Options from "./Components/Options/Options.jsx";
import Details from "./Components/Details/Details";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";

const appId = 'a1e6781b-494b-4a88-adfc-599724a002f0';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function App() {
  const [text, setText] = useState("");
  const [words, setWords] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [special, setSpecial] = useState(0);
  const [stars, setStars] = useState(0);
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let localcount = 0;

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });

  useEffect(() => {
    let displayText = text;
    if (listening && transcript) {
      const liveTranscript = transcript.toLowerCase();
      if (text.length > 0) {
        displayText = text.endsWith(' ') ? text + liveTranscript : text + " " + liveTranscript;
      } else {
        displayText = liveTranscript;
      }
    }

    if (displayText) {
      setCharacters(displayText.length);
      setWords(displayText.split(" ").length);

      localcount = 0;
      for (let index = 0; index < displayText.length; index++) {
        if (format.test(displayText.charAt(index))) {
          localcount += 1;
        }
      }
      setSpecial(localcount);
    } else {
      setCharacters(0);
      setWords(0);
      setSpecial(0);
    }
  }, [text, transcript, listening]);

  useEffect(() => {
    if (!listening && transcript.length > 0) {
      setText(prevText => {
        const newTranscript = transcript.toLowerCase();
        if (prevText.length > 0) {
          return prevText.endsWith(' ') ? prevText + newTranscript : prevText + " " + newTranscript;
        } else {
          return newTranscript;
        }
      });
      resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  useEffect(() => {
    fetch(`https://api.github.com/repos/thaywo/Voice2Text`)
      .then((res) => res.json())
      .then((data) => {
        setStars(data.stargazers_count);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Editor text={text} setText={setText} stars={stars} transcript={transcript} listening={listening} />
        <Details
          words={words}
          characters={characters}
          special={special}
          listening={listening}
          browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
        />
      </div>
      <div className="buttons">
        <a href="https://github.com/thaywo/Voice2Text" target="_blank">
          <button className="pribtn">
            {stars} Stars <i class="fi fi-brands-github"></i>
          </button>
        </a>

        <a href="https://www.linkedin.com/in/taiwo-hassan-531919175/" target="_blank">
          <button className="secbtn">
            Connect on LinkedIn <i class="fi fi-brands-linkedin"></i>
          </button>
        </a>

      
      </div>

      <Options setText={setText} listening={listening} text={text} startListening={startListening} resetTranscript={resetTranscript} />
    </div>
  );
}

export default App;
