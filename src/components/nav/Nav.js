import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { logout } from "../../firebase/users";
import { useHistory } from "react-router-dom";
import "./nav.css";
export default function Nav() {
  let [userId, setUserId] = useState("");
  let menuRef = React.createRef();
  let history = useHistory();
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
              <Link to="/" className="customNav__logo-link  ">
                ST
                <span>
                  <img
                    src={require("./../../assest/bat-mid.png")}
                    className=" customNav__logo-img"
                  />
                </span>
                RY
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
            <li onClick={handleMenuClose}>
              <Link to={``} className="customName__menu-link">
                Favorites
              </Link>
            </li>
            <li onClick={handleMenuClose}>
              <Link to={`/${userId}/profile`} className="customName__menu-link">
                Profile
              </Link>
            </li>
            <li
              onClick={() => {
                handleMenuClose();
                logout();
                window.location.reload();
                history.push("/");
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
