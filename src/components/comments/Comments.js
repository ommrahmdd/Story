import React, { useState } from "react";
import "./comments.css";
export default function Comments() {
  let stars = new Array(5).fill(0);
  let [rateValue, setRateValue] = useState(0);
  return (
    <div className="comments">
      <h3>Comments</h3>
      {/* HANDLE: Comments */}
      <div className="d-flex flex-column align-items-start w-100">
        {/* HANDLE: single comment */}
        <div className="d-flex flex-column align-items-start w-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4>Name</h4>
            <div className="d-flex align-items-center comments__stars">
              {stars.map((star, index) => (
                <i className="fa-solid fa-star" key={index}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
