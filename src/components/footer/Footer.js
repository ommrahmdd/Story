import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-md-3 d-flex justify-content-center align-items-center footer__first mb-md-1 mb-5">
          <span>ST</span>
          <img src={require("./../../assest/bat-mid.png")} className="w-5" />
          <span>RY</span>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center footer__second mb-md-1 mb-5">
          <h5>Listen with story</h5>
          <ul>
            <li>
              <Link className="footer__link">Your Account</Link>
            </li>
            <li>
              <Link className="footer__link">Your Favorites</Link>
            </li>
            <li>
              <Link className="footer__link">Your Playlists & Tracks</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center footer__second mb-md-1 mb-5">
          <h5>STORY</h5>
          <ul>
            <li>
              <Link className="footer__link">Terms And Conditions</Link>
            </li>
            <li>
              <Link className="footer__link">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center footer__second mb-md-1 mb-5">
          <h5>Contact us</h5>
          <p>010-26271970</p>
        </div>
      </div>
      <div className="mt-5 w-100 d-flex justify-content-center">
        <p>
          Created By <span className="fs-2 text-light">Omar</span> | &copy;2022
        </p>
      </div>
    </footer>
  );
}
