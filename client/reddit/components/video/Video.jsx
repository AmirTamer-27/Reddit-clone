import React, { useState, useEffect, useRef } from "react";

import "./Video.css";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VolumeOff from "@mui/icons-material/VolumeOff";

export default function Video({ src, duration }) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video-player");

    const slider = document.getElementById("video-slider");

    video.addEventListener("timeupdate", (e) => {
      let time = (100 / video.duration) * video.currentTime;

      setTime(Math.round(video.currentTime));

      slider.value = `${time}`;
    });

    slider.addEventListener("change", (e) => {
      let sliderValue = parseInt(slider.value);

      let time = sliderValue / (100 / video.duration);

      video.currentTime = time;
    });
  }, []);

  useEffect(() => {
    const video = document.getElementById("video-player");

    if (video) {
      if (!playing) {
        video.pause();
      } else {
        video.play();
      }
    }
  }, [playing]);

  return (
    <div id="video-container">
      <video id="video-player" src={src} />
      <div id="video-controls">
        <div className="video-controls-background"></div>
        <button className="video-button video-control">
          <img className="reddit-logo" src="assets/images/reddit_logo.jpg" />
        </button>
        <button onClick={(e) => setPlaying((value) => !value)} className="video-button video-control">
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <span className="video-control">{time}</span>
        <input id="video-slider" className="video-control" type="range"></input>
        <span className="video-control">{duration}</span>
        <button className="video-button video-control">
          <SettingsIcon />
        </button>
        <button className="video-button video-control">
          <FullscreenIcon />
        </button>
        <button className="video-button video-control-always-present">
          <VolumeOff />
        </button>
      </div>
    </div>
  );
}
