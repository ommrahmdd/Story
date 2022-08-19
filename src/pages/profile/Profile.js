import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserPlaylists } from "../../firebase/playlists";
import { getUserById } from "../../firebase/users";
import { Swiper, SwiperSlide } from "swiper/react";
import "./../createPlaylist/createPlaylist.css";
import "swiper/css";
import "./profile.css";
export default function Profile() {
  let history = useHistory();
  let { id } = useParams();
  let [user, setUser] = useState({});
  let [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    getUserById(id).then((data) => {
      setUser(data);
      getUserPlaylists(id).then((playData) => {
        console.log(playData);
        setPlaylists(playData);
      });
    });
  }, []);
  return (
    <div className="row createPlaylist">
      {/* HANDLE: left */}
      <div className="col-md-4 createPlaylist__left">
        <h2>My Profile</h2>
      </div>
      {/* HANDLE: right */}
      <div className="col-md-8 userData position-relative">
        <div className="mb-5 position-absolute userData__editProfile ">
          <button
            className="customBtn secondaryCustomBtn"
            onClick={() => {
              history.push(`/${id}/editProfile`);
            }}
          >
            Edit Information
          </button>
        </div>
        <div className="d-flex flex-column align-items-start userData__box">
          <div className="mb-5">
            <label>Name</label>
            <p>{user.name}</p>
          </div>
          <div className="mb-5">
            <label>E-mail</label>
            <p>{user.email}</p>
          </div>
          <div className="mb-5">
            <label>Password</label>
            <p>{"*".repeat(user.password?.length)}</p>
          </div>

          <div className="mb-5">
            <label>My PLaylists</label>
            <Swiper
              slidesPerView={4}
              centeredSlides={true}
              spaceBetween={30}
              grabCursor={true}
            >
              {playlists.map((playlist, index) => (
                <SwiperSlide key={index}>
                  <img src={playlist.image} />
                  <p className="fs-3">{playlist.name}</p>
                  <span>
                    {playlist.tracks?.length > 0
                      ? `${playlist.tracks.length} tracks`
                      : "No Tracks"}
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
