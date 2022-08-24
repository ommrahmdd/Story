import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteTrackFromPlaylist,
  getPlaylistById,
  getTracksByID,
  updatePlaylist,
} from "../../firebase/playlists";
import toast, { Toaster } from "react-hot-toast";
import "./playlist.css";
export default function Playlist() {
  let { playlistId } = useParams();
  let [playlist, setPlaylist] = useState({});
  let [tracks, setTracks] = useState([]);
  let [playlistName, setPlaylistName] = useState("");
  let [updateResponse, setUpdateResponse] = useState(false);
  useEffect(() => {
    getPlaylistById(playlistId).then((data) => {
      setPlaylist(data);
      setPlaylistName(data.name);
      data.tracks?.map((trackID) => {
        getTracksByID(trackID).then((track) => {
          console.log(track);
          setTracks((prevState) => {
            return [...prevState, track];
          });
        });
      });
    });
  }, []);
  let handleDeleteTrack = (index, track_id) => {
    toast(
      (t) => (
        <span className="playlist__toast">
          Are You Sure you want to delete this track ?
          <button
            className="fs-5 mt-4 me-3 "
            onClick={() => {
              // setUpdateResponse(true);
              toast.dismiss(t.id);
              // ad5TVOK1oSWcga3ZiS9g
              deleteTrackFromPlaylist(playlistId, track_id).then(() => {
                window.location.reload();
              });
            }}
          >
            Yes
          </button>
          <button
            className="fs-5 mt-2"
            onClick={() => {
              setUpdateResponse(false);
              toast.dismiss(t.id);
            }}
          >
            Dismiss
          </button>
        </span>
      ),
      {
        style: {
          // width: "auto",
          // height: "10rem",
          fontSize: "1.6rem",
        },
      }
    );
    // if (updateResponse) {
    //   // tracks.splice(index, 1);
    //   // setTracks(tracks);
    //   ;
    // }
  };
  // let handleUpdate = () => {
  //   updatePlaylist(playlistId, {
  //     name: playlistName,
  //     tracks: tracks.map((track) => track.track_ID),
  //   }).then(() => {
  //     console.log("Updated");
  //   });
  // };
  return (
    <div className="row playlist">
      <div className="col-md-4 d-flex justify-items-center playlist__left">
        <img src={playlist.image} />
      </div>
      <div className="col-md-8 d-flex justify-items-center playlist__right">
        <form
          className="playlist__right-form"
          onSubmit={(e) => {
            e.preventDefault();
            // handleUpdate();
          }}
        >
          <div className="mb-5">
            <label>Playlist Name</label>
            <input
              type="text"
              name="name"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
          </div>
          <div className="mb-5 playlist__right-tracks">
            <label>Tracks</label>
            <div>
              {tracks.length > 0 &&
                tracks.map((track, index) => (
                  <div className="d-flex align-items-center" key={index}>
                    <i
                      className="fa-solid fa-headphones-simple "
                      style={{
                        fontSize: "8rem",
                      }}
                    />
                    <div className="playlist__right-track">
                      <h4>{track.name}</h4>
                      <p>{track.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteTrack(index, track.track_ID)}
                    >
                      Delete
                    </button>
                    <Toaster />
                  </div>
                ))}
            </div>
          </div>
          <button type="submit" className="customBtn primaryBtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
