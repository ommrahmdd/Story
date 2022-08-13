import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../firebase/users";
import "./../createPlaylist/createPlaylist.css";
import "./profile.css";
export default function Profile() {
  let { id } = useParams();
  let [user, setUser] = useState({});
  useEffect(() => {
    getUserById(id).then((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);
  return (
    <div className="row createPlaylist">
      <div className="col-md-4 createPlaylist__left">
        <h2>My Profile</h2>
      </div>
      <div className="col-md-8 userData">
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
        </div>
      </div>
    </div>
  );
}
