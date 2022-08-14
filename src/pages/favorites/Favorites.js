import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./../createPlaylist/createPlaylist.css";
import "swiper/css";
import "./favorites.css";
import { getUserById, getUserFav } from "../../firebase/users";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getPlaylistById,
  getTracksByID,
  getUserPlaylists,
} from "../../firebase/playlists";
export default function Favorites() {
  let [user, setUser] = useState({});
  let [playlists, setPlaylists] = useState([]);
  let [tracks, setTracks] = useState([]);
  let { userId } = useParams();
  let history = useHistory();
  // HANDLE: effect
  useEffect(() => {
    getUserById(userId).then((data) => setUser(data));
    getUserFav(userId).then((data) => {
      data.fav_playlist.map((playlist) => {
        getPlaylistById(playlist).then((playlistData) => {
          setPlaylists((prevState) => {
            return [...prevState, playlistData];
          });
        });
      });
      data.fav_tracks.map((trackID) => {
        getTracksByID(trackID).then((track) => {
          console.log(track);
          setTracks((prevState) => {
            return [...prevState, track];
          });
        });
      });
    });
  }, []);
  // HANDLE: playlist click
  let handlePlaylist = (id) => {
    history.push(`/${id}/tracks`);
  };
  return (
    <div className="row createPlaylist">
      <div className="col-md-4 createPlaylist__left">
        <h2>My Favorites</h2>
      </div>
      <div className="col-md-8 fav__right">
        {/* HANDLE: playlists */}
        <div className="mb-5">
          <h3>Favorite Playlists</h3>
          {playlists.length != 0 ? (
            <Swiper
              slidesPerView={4}
              centeredSlides={true}
              spaceBetween={30}
              grabCursor={true}
              className="mt-5"
            >
              {playlists?.map((playlist, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handlePlaylist(playlist.playlist_ID)}
                >
                  <img src={playlist.image} />
                  <p>{playlist.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="d-flex justify-content-center align-items-center py-5 w-75">
              <div
                className="spinner-grow text-light "
                style={{ width: "5rem", height: "5rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/* HANDLE: tracks */}
        <div className="mb-5">
          <h3 className="mb-5">Favorite Tracks</h3>
          <div className="d-flex flex-column align-items-start">
            {tracks.length != 0 ? (
              tracks?.map((track, index) => (
                <div
                  className="d-flex align-items-center track__box"
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
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center py-5 w-100">
                <div
                  class="spinner-grow text-light"
                  role="status"
                  style={{
                    height: "5rem",
                    width: "5rem",
                  }}
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
