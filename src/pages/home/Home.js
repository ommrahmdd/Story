import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPlaylists } from "../../firebase/playlists";
import { useHistory } from "react-router-dom";
import "./home.css";
export default function Home() {
  let [playlists, setPlaylists] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getAllPlaylists().then((data) => {
      setPlaylists(data);
      console.log(data);
    });
  }, []);
  return (
    <div className="home">
      {playlists?.length ? (
        <div className="container py-5">
          <div className="row g-4">
            {playlists.map((playlist, index) => (
              <div
                className="col-md-3 d-flex justify-content-center align-items-center"
                key={index}
              >
                <div
                  className="customCard"
                  onClick={() =>
                    history.push(`/${playlist.playlist_id}/tracks`)
                  }
                >
                  <p className="customCard__number">
                    {index < 10 ? `0${index + 1}` : index + 1}
                  </p>
                  <img src={playlist.image} />
                  <p className="customCard__name">{playlist.name}</p>
                  <span>{playlist.tracks.length} Track</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            minHeight: 650,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="spinner-grow text-warning "
            role="status"
            style={{ width: 100, height: 100 }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
