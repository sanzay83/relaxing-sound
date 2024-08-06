import React, { useState } from "react";

function aa() {
  const [imagee, setImagee] = useState("");
  const musicData = [
    {
      image: "../assets/img1.jpg",
      title: "Deep Sleep Music",
      url: "https://cdn.pixabay.com/audio/2024/03/10/audio_f05893f23c.mp3", // Adjusted file name
    },
    {
      image: "../assets/img2.jpg",
      title: "Deep Relaxing Music",
      url: "https://cdn.pixabay.com/audio/2023/03/26/audio_90cdd5fa53.mp3", // Adjusted file name
    },
    {
      image: "../assets/img3.png",
      title: "Calm Meditation and Deep Relaxation",
      url: "https://cdn.pixabay.com/audio/2023/01/29/audio_580d2c877d.mp3", // Adjusted file name
    },
  ];

  const handleNextImage = () => {
    setImagee(musicData[x].image);
  };
  return (
    <div>
      <img src={imagee} alt="mainpic"></img>
      <button onClick={handleNextImage}></button>
    </div>
  );
}

export default aa;
