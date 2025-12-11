import React, { useState } from "react";
import "./Options.css";

import ReactConfirmAlert, { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import SpeechRecognition from "react-speech-recognition";

const Options = ({ setText, listening, text, startListening, resetTranscript }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <div className="options-container">
        <div className="options">
          {(() => {
            if (!listening) {
              return (
                <i
                  title="Start Recording"
                  className="fi fi-rr-microphone option"
                  onClick={startListening}
                ></i>
              );
            } else {
              return (
                <i
                  title="Stop Recording"
                  className="fi fi-sr-microphone option"
                  onClick={SpeechRecognition.stopListening}
                ></i>
              );
            }
          })()}

          <i
            title="Clear Text"
            className="fi fi-rr-trash option"
            onClick={() => {
              if (text.length > 0) {
                setShowDialog(true);
              }
            }}
          ></i>
          <a target="_blank" href="https://github.com/thaywo/Voice2Text">
            <i title="Give a Star" className="fi fi-rr-star option"></i>
          </a>
        </div>
      </div>

      <div>
        {text.length > 0 &&
          showDialog &&
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="modal-container">
                  <p className="mheading">Are you sure?</p>
                  <p className="mtagline">You want to delete this Text?</p>
                  <div className="mbtns">
                    <button className="mno" onClick={onClose}>
                      No
                    </button>
                    <button
                      className="myes"
                      onClick={() => {
                        setShowDialog(false);
                        setText("");
                        resetTranscript();
                        onClose();
                      }}
                    >
                      Yes, Delete it!
                    </button>
                  </div>
                </div>
              );
            },
          })}
      </div>
    </>
  );
};

export default Options;
