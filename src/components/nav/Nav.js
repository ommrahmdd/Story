import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
export default function Nav() {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("uID");
  return (
    <div className="customNav">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center ">
          <h4 className="customNav__logo">
            <Link to="/" className="customNav__logo-link">
              PODCAST
            </Link>
          </h4>
          {userId && (
            <div>
              <Link to={`/${userId}/track`} className="nav__login-link me-2">
                <button className=" customBtn primaryBtn">Add Track</button>
              </Link>
              <Link to={`/${userId}/playlist`} className="nav__login-link">
                <button className=" customBtn primaryBtn">Add Playlist</button>
              </Link>
            </div>
          )}
          {!userId && (
            <Link to="/login" className="nav__login-link">
              <button className=" customBtn primaryBtn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
