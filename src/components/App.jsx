import React, { useEffect, useRef, useState } from "react";
import "./main.scss";
//import image from "../assets/img1.jpg";
import music from "../assets/music";
import { FaStepBackward, FaPause, FaPlay, FaStepForward } from "react-icons/fa";

function App() {
  const [dark, setDark] = useState(false);
  const soundRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentMusic, setCurrentMusic] = useState(music[0]);

  useEffect(() => {
    if (play) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [play, index]);

  const handleButtonDark = () => {
    setDark(!dark);
  };

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleNext = () => {
    if (index < music.length - 1) {
      setIndex((prevIndex) => +prevIndex + 1);
      setCurrentMusic(music[index + 1]);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => +prevIndex - 1);
      setCurrentMusic(music[index - 1]);
    }
  };

  return (
    <div className={`main-container ${dark ? "dark" : "light"}`}>
      <div className="header-container">
        <div className="header-elements">
          <div className="header-title">Relaxing Sounds</div>
          <div className={`dark-mode-switch `}>
            <button
              className={`${dark ? "btn-dark" : ""}`}
              onClick={handleButtonDark}
            >
              <span
                className={`slider ${dark ? "slide-end" : "slide-start"}`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div
          className="card"
          style={{
            backgroundImage: `url(${music[index].image})`,
          }}
        >
          <img src={music[index].image} alt="mainpic"></img>
          <div className="img-center-outer"></div>
          <div className="img-center-inner"></div>
        </div>
      </div>

      <div className="label-container">{currentMusic.title}</div>

      <div className="controller-container">
        <div className="controllers">
          <FaStepBackward size={"5em"} onClick={handlePrev} />
          {play ? (
            <FaPause size={"5em"} onClick={handlePlayPause} />
          ) : (
            <FaPlay size={"5em"} onClick={handlePlayPause} />
          )}

          <FaStepForward size={"5em"} onClick={handleNext} />
        </div>
      </div>

      <audio ref={soundRef} src={currentMusic.url} loop />
    </div>
  );
}

export default App;
