import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { logout } from "../../firebase/users";
import "./nav.css";
export default function Nav() {
  let [userId, setUserId] = useState("");
  let menuRef = React.createRef();
  // useEffect(() => {
  //   setUserId(localStorage.getItem("uID"));
  // }, [localStorage.getItem("uID")]);
  onAuthStateChanged(auth, (user) => {
    if (user != "null" || user != null) setUserId(localStorage.getItem("uID"));
    else setUserId("");
  });
  let handleMenuClose = () => {
    menuRef.current.classList.add("close-Menu");
  };
  let handleMenuOpen = () => {
    menuRef.current.classList.remove("close-Menu");
  };
  return (
    <>
      <nav className="customNav">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center w-100 px-4">
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

            {userId ? (
              <i
                className="fa-solid fa-bars fs-1 customNav__menu-open"
                onClick={handleMenuOpen}
              ></i>
            ) : (
              <Link to="/login" className="nav__login-link">
                <button className=" customBtn primaryBtn">Login</button>
              </Link>
            )}
          </div>
        </div>
        <div
          className="menu d-flex justify-content-center align-items-center close-Menu"
          ref={menuRef}
        >
          <i className="fa-solid fa-xmark" onClick={handleMenuClose}></i>
          <ul>
            <li onClick={handleMenuClose}>
              <Link to={`/${userId}/track`} className="customName__menu-link">
                Add Track
              </Link>
            </li>
            <li onClick={handleMenuClose}>
              <Link
                to={`/${userId}/playlist`}
                className="customName__menu-link"
              >
                Add Playlist
              </Link>
            </li>
            <li
              onClick={() => {
                handleMenuClose();
                logout();
                window.location.reload();
              }}
              className="customName__menu-link"
            >
              logout
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
