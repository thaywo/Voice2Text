import React from "react";
import "./Editor.css";

const Editor = ({ text, setText, stars, transcript, listening }) => {
  const getDisplayText = () => {
    if (listening && transcript) {
      const liveTranscript = transcript.toLowerCase();
      if (text.length > 0) {
        return text.endsWith(' ') ? text + liveTranscript : text + " " + liveTranscript;
      } else {
        return liveTranscript;
      }
    }
    return text;
  };

  const handleChange = (e) => {
    if (!listening) {
      setText(e.target.value);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          type="text"
          className="textarea"
          placeholder="Click the microphone icon to start recording, or type manually!"
          onChange={handleChange}
          value={getDisplayText()}
          readOnly={listening}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
