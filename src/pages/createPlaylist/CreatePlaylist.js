import React from "react";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";
import "./createPlaylist.css";
import { addDoc, collection } from "firebase/firestore";
import { addPlaylist } from "../../firebase/playlists";
import { useHistory } from "react-router-dom";
export default function CreatePlaylist() {
  let [customImg, setCustomImg] = useState({});
  let history = useHistory();
  let userId = useParams().id;
  let validate = (values) => {
    let erros = {};
    if (!values.name) {
      erros.name = "*Name is required";
    }
    if (!values.fakeImg) {
      erros.fakeImg = "*Image is required";
    }
    return erros;
  };
  let imgRef = ref(storage, `playlist/${userId}/${customImg.name + v4()}`);
  let fomrik = useFormik({
    initialValues: {
      name: "",
      fakeImg: "",
    },
    validate,
    onSubmit: (values) => {
      uploadBytes(imgRef, customImg).then((data) => {
        getDownloadURL(data.ref).then((imgUrl) => {
          addPlaylist(
            {
              ...values,
              image: imgUrl,
            },
            userId
          ).then((data) => {
            console.log(data);
            history.push("/");
          });
        });
      });
    },
  });

  return (
    <div className="row createPlaylist">
      <div className="col-md-4 createPlaylist__left">
        <h2>Add New Playlist</h2>
      </div>
      <div className="col-md-8">
        <div className="d-flex flex-column mt-5 ">
          {/* <img src={require("./../../assest/bat-mid.png")} className=" my-5" /> */}
          <h3 className="createPlaylist___header"></h3>
          <form
            className="w-50 mt-5 createPlaylist__form"
            onSubmit={(e) => {
              e.preventDefault();
              return fomrik.handleSubmit();
            }}
          >
            <div className="mb-3">
              <label>Playlist Name</label>
              <input
                type="text"
                className="form-control w-100"
                name="name"
                value={fomrik.values.name}
                onChange={fomrik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Playlist Image</label>
              <input
                type="file"
                className="form-control w-100"
                name="fakeImg"
                value={fomrik.values.fakeImg}
                onChange={(e) => {
                  setCustomImg(e.target.files[0]);
                  fomrik.handleChange(e);
                }}
              />
            </div>
            <button type="submit" className="customBtn secondaryCustomBtn mt-5">
              Add
            </button>
            <small className="createPlaylist__error">
              {fomrik.errors.name || fomrik.errors.fakeImg}
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
