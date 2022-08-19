import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTracksByID } from "../../firebase/playlists";
import { getUserById } from "../../firebase/users";
import "./../createPlaylist/createPlaylist.css";
import "./singleTrack.css";
export default function SingleTrack() {
  let params = useLocation();
  let userId = new URLSearchParams(params.search).get("user");
  let trackId = new URLSearchParams(params.search).get("track");
  let [currentTrack, setCurrentTrack] = useState({});
  let [playing, setPlaying] = useState(false);
  let [progress, setProgress] = useState({});
  let [favTracks, setFavTracks] = useState([]);
  let [repeat, setRepeat] = useState(localStorage.getItem("repeat") || false);
  let audioRef = React.createRef();
  let customAudioRef = React.createRef();
  useEffect(() => {
    getTracksByID(trackId).then((data) => {
      console.log(data);
      setCurrentTrack(data);
    });
    getUserById(userId).then((user) => {
      user.fav_tracks?.map((trackID) => {
        getTracksByID(trackID).then((track) => {
          setFavTracks((prevState) => {
            return [...prevState, track];
          });
        });
      });
    });
  }, []);

  // HANDLE: play button
  let handlePLay = () => {
    setPlaying(true);
    audioRef.current.play();
  };
  // HANDLE: Pause Button
  let handlePause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };
  // HANDLE: audio time change
  let handleTimeChange = (e) => {
    let currentTime = audioRef.current.currentTime;
    let duration = audioRef.current.duration;

    if (audioRef.current.currentTime == duration) {
      setPlaying(false);
      setProgress({});
      audioRef.current.currentTime = 0;
    }
    console.log(duration - audioRef.current.currentTime);

    setProgress((prevState) => {
      return {
        ...prevState,
        currentTime: ((currentTime / duration) * 100).toFixed(0),
        duration,
      };
    });
  };
  // HANDLE: click on the progress
  let handleProgressClick = (e) => {
    let currentWidth = e.nativeEvent.offsetX;
    let width = customAudioRef.current.clientWidth;
    let currentTime = ((currentWidth / width) * 100).toFixed(0);
    audioRef.current.currentTime = (currentTime / 100) * progress.duration;

    setProgress((prevState) => {
      return {
        ...prevState,
        currentTime,
      };
    });
  };
  // HANDLE: click on other tracks
  let handleTrackClick = (trackID) => {
    getTracksByID(trackID).then((data) => {
      setCurrentTrack(data);
    });
    // setPlaying(false)
    setProgress({});
    audioRef.current.currentTime = 0;
  };
  // HANDLE: repeat btn
  // let handleRepeatBtn = () => {
  //   if (repeat) {
  //     setRepeat(false);
  //     localStorage.setItem("repeat", false);
  //   } else {
  //     localStorage.setItem("repeat", true);
  //     setRepeat(true);
  //     if (audioRef.current.currentTime == progress.duration) {
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play();
  //       // setPlaying(false);
  //       console.log("True");
  //     }
  //   }
  // };
  return (
    <div className="row createPlaylist">
      <div className="col-md-4 createPlaylist__left">
        <h2>Playing Now</h2>
      </div>
      <div className="col-md-8">
        <div className="d-flex flex-column align-items-center singleTrack__audioBox">
          <i className="fa-solid fa-headphones-simple "></i>
          <audio
            src={currentTrack.url}
            ref={audioRef}
            onTimeUpdate={(e) => handleTimeChange(e)}
          />
          <p className="singleTrack__audioBox-trackName">{currentTrack.name}</p>
          <div className="singleTrack__audioBox-customAudio">
            <div
              className="progress "
              ref={customAudioRef}
              onClick={(e) => handleProgressClick(e)}
            >
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: `${progress.currentTime}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-center customAudio__playPause">
              {playing ? (
                <i className="fa-solid fa-pause" onClick={handlePause}></i>
              ) : (
                <i className="fa-solid fa-play" onClick={handlePLay}></i>
              )}
            </div>
          </div>
        </div>
        {/* HANDLE: The remain tracks in favorites */}
        <div className="d-flex flex-column align-items-center pb-5">
          {favTracks.length != 0 ? (
            favTracks?.map((track, index) =>
              track.track_ID === currentTrack?.track_ID ? (
                <div
                  className="d-flex align-items-center opacity-25 track__box"
                  key={index}
                >
                  <i
                    className="fa-solid fa-headphones-simple "
                    style={{
                      fontSize: "8rem",
                    }}
                  ></i>
                  <div className="ms-5">
                    <h4>{track.name}</h4>
                    <p>{track.description}</p>
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center track__box"
                  key={index}
                  onClick={() => handleTrackClick(track.track_ID)}
                >
                  <i
                    className="fa-solid fa-headphones-simple "
                    style={{
                      fontSize: "8rem",
                    }}
                  ></i>
                  <div className="ms-5">
                    <h4>{track.name}</h4>
                    <p>{track.description}</p>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="d-flex justify-content-center align-items-center py-5 w-100">
              <div
                className="spinner-grow text-light"
                role="status"
                style={{
                  height: "5rem",
                  width: "5rem",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
