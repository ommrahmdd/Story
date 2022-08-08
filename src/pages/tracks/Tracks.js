import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../../firebase/playlists";
import "./tracks.css";
export default function Tracks() {
  let params = useParams().playlist_id;
  let [playlist, setPlaylist] = useState({});
  let [currentTrack, setCurrentTrack] = useState({});
  let [pausePlay, setPausePlay] = useState(true);
  let [audioProgress, setAudioProgress] = useState({});
  let [currentIndex, setCurrentIndex] = useState(0);
  let audioRef = React.createRef();
  let customAudioRef = React.createRef();
  // HANDLE: time in MM:SS
  var minutesCurrent = "0" + Math.floor(audioProgress.progress / 60);
  var secondsCurrent = "0" + (audioProgress.progress - minutesCurrent * 60);
  var durCurrent = minutesCurrent.substr(-2) + ":" + secondsCurrent.substr(-2);

  var minutesFull = "0" + Math.floor(audioProgress.duration / 60);
  var secondsFull = "0" + (audioProgress.duration - minutesFull * 60);
  var durFull = minutesFull.substr(-2) + ":" + secondsFull.substr(-2);

  useEffect(() => {
    getPlaylistById(params).then((data) => {
      console.log(data);
      setPlaylist(data);
      setCurrentTrack(data.tracks[currentIndex]);
    });
  }, []);
  let handlePausePlay = (e) => {
    setPausePlay(!pausePlay);
    if (pausePlay) audioRef.current.play();
    else audioRef.current.pause();
  };
  let handleAudoTimeChange = (e) => {
    let duration = audioRef.current.duration;
    let currentTime = audioRef.current.currentTime;
    setAudioProgress((prevState) => {
      return {
        ...prevState,
        progress: ((currentTime * 100) / duration).toFixed(0),
        duration,
      };
    });
    if (audioProgress.progress == 100) {
      setPausePlay(!pausePlay);
    }
  };
  let handleClickOnProgress = (e) => {
    let width = customAudioRef.current.clientWidth;
    let offset = e.nativeEvent.offsetX;
    let currentPostion = ((offset / width) * 100).toFixed(0);
    audioRef.current.currentTime =
      (currentPostion / 100) * audioProgress.duration;
    setAudioProgress((prevState) => {
      return {
        ...prevState,
        progress: currentPostion,
      };
    });
  };
  let handleTrackClick = (e, index) => {
    setCurrentTrack(playlist.tracks[index]);
    setAudioProgress({
      duration: 0,
      progress: 0,
    });
    setPausePlay(true);
    setCurrentIndex(index);
  };
  let handleForword = () => {
    if (playlist.tracks[currentIndex + 1]) {
      setCurrentIndex((prevState) => prevState + 1);
      setCurrentTrack(playlist.tracks[currentIndex + 1]);
    } else {
      setCurrentIndex(0);
      setCurrentTrack(playlist.tracks[0]);
    }
    setAudioProgress({
      duration: 0,
      progress: 0,
    });
  };
  let handleBackward = () => {
    if (playlist.tracks[currentIndex - 1]) {
      setCurrentIndex((prevState) => prevState - 1);
      setCurrentTrack(playlist.tracks[currentIndex - 1]);
    } else {
      setCurrentIndex(playlist.tracks.length - 1);
      setCurrentTrack(playlist.tracks[playlist.tracks.length - 1]);
    }
    setAudioProgress({
      duration: 0,
      progress: 0,
    });
  };
  return (
    <div className="tracks">
      <div className="container">
        <div className="row">
          {/* HANDLE: left side */}
          <div className="col-md-8 tracks__left">
            <h2 className="tracks__name">
              &ldquo;
              {playlist.name}&rdquo; <span>Playlist</span>
            </h2>
            <div className="tracks__currentAudio">
              <h4>{currentTrack.name}</h4>
              <audio
                src={currentTrack.url}
                className="tracks__currentAudio-audio"
                ref={audioRef}
                onTimeUpdate={handleAudoTimeChange}
              />
              {/* HANDLE: progress bar */}
              <div className="tracks__currentAudio-customAudio d-flex flex-column align-items-start">
                <div
                  className="progress w-100 my-2 "
                  onClick={handleClickOnProgress}
                  ref={customAudioRef}
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${audioProgress.progress}%` }}
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {/* HANDLE: audio time */}
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <span className="fs-4">{durCurrent}</span>
                  <span className="fs-4">{durFull}</span>
                </div>
                {/* HANDLE: controls */}
                <div className="controls w-25 d-flex align-items-center justify-content-around mt-2">
                  <i
                    className="fa-solid fa-backward-step"
                    onClick={handleBackward}
                  ></i>

                  {pausePlay ? (
                    <i
                      className="fa-solid fa-play"
                      onClick={handlePausePlay}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-pause"
                      onClick={handlePausePlay}
                    ></i>
                  )}
                  <i
                    className="fa-solid fa-forward-step"
                    onClick={handleForword}
                  ></i>
                </div>
              </div>
              {/* HANDLE: description */}
              <div className="mt-5">
                <h6>About {currentTrack.name}</h6>
                <p>&ldquo;{currentTrack.description}&rdquo;</p>
              </div>
            </div>
          </div>
          {/* HANDLE: right section => More in playlist */}
          <div className="col-md-4 tracks__right d-flex flex-column align-items-center">
            <h3>More In Playlist</h3>
            {playlist.tracks &&
              playlist.tracks.map((track, index) => (
                <div
                  className="d-flex align-items-center tracks__right-track w-75"
                  key={index}
                  onClick={(e) => handleTrackClick(e, index)}
                >
                  <i className="fa-solid fa-headphones-simple"></i>
                  <div className="d-felx flex-column align-items-start justify-content-center">
                    <h5>{track.name}</h5>
                    <p>
                      {track.description.split(" ").splice(0, 4).join(" ")}...
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}