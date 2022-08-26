import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getTracksByID, getUserPlaylists } from "./../../firebase/playlists";
import "./editProfile.css";
export default function EditProfile() {
  let [playlists, setPlaylists] = useState([]);
  let [tracks, setTracks] = useState([]);
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    getUserPlaylists(id).then((data) => {
      setPlaylists(data);
      data.forEach((playlist) => {
        playlist.tracks?.forEach((trackId) => {
          getTracksByID(trackId).then((track) => {
            setTracks((prevState) => {
              return [...prevState, track];
            });
          });
        });
      });
    });
  }, []);
  return (
    <div className="editProfile row">
      <div className="col-md-2"></div>
      <div className="col-md-8 editProfile__left">
        <h3>playlists</h3>
        <div className="row">
          {playlists &&
            playlists.map((playlist, index) => (
              <div
                className="col-12 d-flex align-items-center position-relative editProfile__left-box"
                key={index}
                onClick={() => {
                  history.push(`/playlist/${playlist.playlist_id}`);
                }}
              >
                <p className="position-absolute numbering__box">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
                <img src={playlist.image} />
                <div>
                  <h4>{playlist.name}</h4>
                  <p>{playlist.tracks?.length} track</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="col-md-2 editProfile__right">
        {/* <h3>Tracks</h3>
        <div className="row">
          {tracks?.map((track, index) => (
            <div className="col-md-3"></div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
