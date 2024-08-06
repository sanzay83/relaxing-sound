import React, { useEffect, useRef, useState } from "react";
import "./main.scss";
import image from "../assets/img1.jpg";
import sleepMusic from "../assets/sleep-music.mp3";

function App() {
  const [dark, setDark] = useState(false);
  const soundRef = useRef(null);

  const handleButtonDark = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (dark) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  });
  return (
    <div className={`main-container ${dark ? "dark" : "light"}`}>
      <div className="sub-container">
        <div className="header-title">Header</div>
        <div className={`dark-mode-switch `}>
          <button
            className={`${dark ? "btn-dark" : ""}`}
            onClick={handleButtonDark}
          >
            <span className={`slider ${dark ? "slide-end" : "slide-start"}`} />
          </button>
        </div>
      </div>
      <div className="sub-container">
        <div className="card">
          <img src={image} alt="mainpic"></img>
          <div className="img-center-outer"></div>
          <div className="img-center-inner"></div>
        </div>
      </div>
      <div className="sub-container">This</div>
      <audio ref={soundRef} src={sleepMusic} />
    </div>
  );
}

export default App;
