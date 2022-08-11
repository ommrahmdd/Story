import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { addNewComment } from "../../firebase/playlists";
import { getUserById } from "../../firebase/users";
import "./addComment.css";
export default function AddComment(props) {
  let stars = new Array(5).fill(0);
  let [rate, setRate] = useState(0);
  let [rateHover, setRateHover] = useState(0);
  let [comment, setComment] = useState("");

  let { trackId } = props;
  let [currentUser, setCurrentUser] = useState({});
  //HANDLE: use Effect
  useEffect(() => {
    getUserById(localStorage.getItem("uID")).then((user) => {
      setCurrentUser(user);
    });
  }, []);

  //HANDLE: click and hover events
  let handleRateClick = (index) => {
    setRate(index);
  };
  let handleRateHover = (index) => {
    setRateHover(index);
  };
  let handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  let handleAddComment = () => {
    addNewComment(trackId, {
      rate,
      comment,
      userId: currentUser._id,
      userName: currentUser.name,
    }).then((data) => {
      setComment("");
      setRate(0);
    });
  };
  return (
    <div className="addComment">
      {/* HANDLE: rating */}
      <div className="d-flex justify-content-between align-items-center w-75 mt-4 mb-2">
        <h4>Add New Comment</h4>
        <div className="d-flex align-items-center addComment__rating">
          {stars.map((star, index) => (
            <i
              className={`fa-solid fa-star ${
                rate > index || rateHover > index
                  ? "addComment__yellow"
                  : "addComment__grey"
              }`}
              key={index}
              onClick={() => handleRateClick(index + 1)}
              onMouseOver={() => handleRateHover(index + 1)}
              onMouseLeave={() => {
                setRateHover(0);
              }}
            ></i>
          ))}
        </div>
      </div>
      <textarea
        className=" w-75"
        value={comment}
        onChange={(e) => handleCommentChange(e)}
      />
      <button
        className="customBtn secondaryCustomBtn d-block mt-4"
        onClick={handleAddComment}
      >
        Add
      </button>
    </div>
  );
}
