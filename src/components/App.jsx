import React, { useEffect, useRef, useState } from "react";
import "./main.scss";
import music from "../assets/music";
import { FaStepBackward, FaPause, FaPlay, FaStepForward } from "react-icons/fa";

function App() {
  const [dark, setDark] = useState(false);
  const soundRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentMusic, setCurrentMusic] = useState(music[0]);
  const [countdown, setCountdown] = useState(0);
  const [selectedTime, setSelectedTime] = useState("5");

  useEffect(() => {
    if (play) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [play, index]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    } else if (countdown === 0) {
      setPlay((prevPlay) => {
        if (prevPlay) {
          return !prevPlay;
        }
      });
    }
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

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
      if (!play) {
        setPlay(!play);
      }
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => +prevIndex - 1);
      setCurrentMusic(music[index - 1]);
      if (!play) {
        setPlay(!play);
      }
    }
  };

  const handleTimer = (e) => {
    e.preventDefault();
    setCountdown(+selectedTime * 60);
    if (!play) {
      setPlay(!play);
    }
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
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
          <img
            className={`${play ? "rotate" : ""}`}
            src={music[index].image}
            alt="mainpic"
          ></img>
          <div className="img-center-outer"></div>
          <div className="img-center-inner"></div>
        </div>
      </div>

      <div className="label-container">{currentMusic.title}</div>

      <div className="controller-container">
        <div className="controllers">
          <FaStepBackward size={"4em"} onClick={handlePrev} />
          {play ? (
            <FaPause size={"4em"} onClick={handlePlayPause} />
          ) : (
            <FaPlay size={"4em"} onClick={handlePlayPause} />
          )}

          <FaStepForward size={"4em"} onClick={handleNext} />
        </div>
      </div>

      <div className="timer-container">
        <form className="form-section" onSubmit={handleTimer}>
          <select value={parseInt(selectedTime)} onChange={handleTimeChange}>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
            <option value="25">25 mins</option>
            <option value="30">30 mins</option>
            <option value="35">35 mins</option>
            <option value="40">40 mins</option>
          </select>
          <button type="submit">Set Timer</button>
        </form>

        {countdown !== 0 ? (
          <div className="time-countdown">
            Time left: {String(parseInt(countdown / 60)).padStart(2, "0")}:
            {String(countdown % 60).padStart(2, "0")}
          </div>
        ) : (
          ""
        )}
      </div>

      <audio ref={soundRef} src={currentMusic.url} loop />
    </div>
  );
}

export default App;
