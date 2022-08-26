import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deletePlaylist,
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
  let history = useHistory();
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
              toast.dismiss(t.id);
              deleteTrackFromPlaylist(playlistId, track_id).then((data) => {
                console.log(data);
                // window.location.reload();
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
  let handleUpdate = () => {
    updatePlaylist(playlistId, {
      name: playlistName,
      tracks: tracks.map((track) => track.track_ID),
    }).then(() => {
      console.log("Updated");
    });
  };
  let handleDeletePlaylist = () => {
    toast(
      (t) => (
        <span className="playlist__toast">
          Are You Sure you want to delete the playlist ?
          <button
            className="fs-5 mt-4 me-3 "
            onClick={() => {
              toast.dismiss(t.id);
              deletePlaylist(playlistId).then(() => {
                history.back();
              });
            }}
          >
            Yes
          </button>
          <button
            className="fs-5 mt-2"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            Dismiss
          </button>
        </span>
      ),
      {
        style: {
          fontSize: "1.6rem",
        },
      }
    );
  };
  return (
    <div className="row playlist">
      <div className="col-md-4 d-flex justify-items-center flex-column align-items-center playlist__left">
        <img src={playlist.image} className="mb-md-2 mb-4" />
        <button className="customBtn primaryBtn" onClick={handleDeletePlaylist}>
          Delete Playlist
        </button>
      </div>
      <div className="col-md-8 d-flex justify-content-center  playlist__right">
        <div className="w-75">
          <form
            className="playlist__right-form"
            onSubmit={(e) => {
              e.preventDefault();
              return handleUpdate();
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
            <button type="submit" className="customBtn primaryBtn">
              Update
            </button>
          </form>
          <div className="mb-5 playlist__right-tracks w-100">
            <label>Tracks</label>
            <div>
              {tracks.length > 0 &&
                tracks.map((track, index) => (
                  <div
                    className="d-flex w-100 justify-content-between align-items-center flex-md-row "
                    key={index}
                  >
                    <div className="playlist__right-track d-flex align-items-center mb-4">
                      <i
                        className="fa-solid fa-headphones-simple "
                        style={{
                          fontSize: "8rem",
                        }}
                      />
                      <div>
                        <h4>{track.name}</h4>
                        <p>{track.description}</p>
                      </div>
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
        </div>
      </div>
    </div>
  );
}
