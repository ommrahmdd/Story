import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
export default function Nav() {
  let token = localStorage.getItem("token");
  let [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("uID"));
  }, []);
  return (
    <>
      <nav className="customNav bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center w-100 ">
            <h4 className="customNav__logo">
              <Link to="/" className="customNav__logo-link">
                P
                <span className="mx-1">
                  <img
                    src={require("./../../assest/bat-mid.png")}
                    className="w-25"
                  />
                </span>
                DCAST
              </Link>
            </h4>

            {userId && (
              <div>
                <Link to={`/${userId}/track`} className="nav__login-link me-2">
                  <button className=" customBtn primaryBtn">Add Track</button>
                </Link>
                <Link to={`/${userId}/playlist`} className="nav__login-link">
                  <button className=" customBtn primaryBtn">
                    Add Playlist
                  </button>
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
      </nav>
    </>
  );
}
