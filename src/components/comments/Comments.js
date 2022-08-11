import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./comments.css";
export default function Comments({ trackId }) {
  let stars = new Array(5).fill(0);
  let [rateValue, setRateValue] = useState(0);
  let [comments, setComments] = useState([]);
  //HANDLE: subscribe the comments;
  useEffect(() => {
    if (trackId) {
      let docRef = doc(db, "tracks", trackId);
      onSnapshot(docRef, (data) => {
        setComments(data.data().comments);
      });
    }
  });
  return (
    <div className="comments">
      <h3>Comments</h3>
      {/* HANDLE: Comments */}
      <div className="d-flex flex-column align-items-start w-100">
        {/* HANDLE: single comment */}
        {comments &&
          comments.map((comment, index) => (
            <div
              className="d-flex flex-column align-items-start w-100 comments__commentBox"
              key={index}
            >
              <div className="d-flex justify-content-between align-items-center w-100 ">
                <h4 className="comments__commentBox-name">
                  {comment.userName}
                </h4>
                <div className="d-flex align-items-center comments__stars">
                  {stars.map((star, index) => (
                    <i
                      className={`fa-solid fa-star ${
                        comment.rate > index
                          ? "addComment__yellow"
                          : "addComment__grey"
                      }`}
                      key={index}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="comments__commentBox-comment">
                &ldquo;{comment.comment}&rdquo;
              </p>
              <div className="w-100 d-flex justify-content-end">
                <p className="comments__commentBox-time">{comment.createdAt}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
