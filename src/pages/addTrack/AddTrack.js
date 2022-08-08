import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  addTrackToPlaylist,
  getPlaylistByName,
  getUserPlaylists,
} from "../../firebase/playlists";
import { v4 } from "uuid";
import "./addTrack.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";

export default function AddTrack() {
  let [customTrack, setCustomTrack] = useState({});
  let [userPlaylists, setUserPlaylists] = useState([]);
  let [progress, setProgress] = useState("");
  let userId = useParams().id;
  let validate = (values) => {
    let erros = {};
    if (!values.name) {
      erros.name = "*Name is required";
    }
    if (!values.fakeTrack) {
      erros.fakeTrack = "*Audio is required";
    }
    if (!values.description) {
      erros.description = "*Description is required";
    }
    if (!values.playlist) {
      erros.playlist = "*Playlist is required";
    }
    return erros;
  };
  let audioRef = ref(storage, `/playlist/${userId}/${customTrack.name + v4()}`);
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      fakeTrack: "",
      playlist: "",
    },
    validate,
    onSubmit: async (values) => {
      setProgress("Please Wait ..");
      let uploadedBytes = await uploadBytes(audioRef, customTrack);
      let trackURL = await getDownloadURL(uploadedBytes.ref);
      let playlist_ID = await getPlaylistByName(values.playlist);
      let updated = await addTrackToPlaylist(playlist_ID[0].playlistID, {
        name: values.name,
        description: values.description,
        trackURL,
      });
      setProgress("Track has been added successfully.");
      setTimeout(() => {
        formik.resetForm();
        setProgress("");
        setCustomTrack({});
      }, 2000);
    },
  });
  useEffect(() => {
    getUserPlaylists(userId).then((data) => {
      let dump = data.map((playlist) => playlist.name);
      setUserPlaylists(dump);
    });
  }, []);
  return (
    <div className="d-flex flex-column align-items-center createPlaylist">
      {/* <img src={require("./../../assest/bat-mid.png")} className=" my-5" /> */}
      <h3 className="createPlaylist___header">Add New Track</h3>
      <form
        className="w-25 mt-5 createPlaylist__form"
        onSubmit={(e) => {
          e.preventDefault();
          return formik.handleSubmit();
        }}
      >
        <div className="mb-3">
          <label>Track Name</label>
          <input
            type="text"
            className="form-control w-100"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Track Description</label>
          <textarea
            type="text"
            className="form-control w-100"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Add To Playlist</label>
          <select
            name="playlist"
            value={formik.values.playlist}
            onChange={formik.handleChange}
          >
            <option defaultValue disabled={true}>
              Select
            </option>
            {userPlaylists.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Track Audio</label>
          <input
            type="file"
            className="form-control w-100"
            name="fakeTrack"
            value={formik.values.fakeTrack}
            onChange={(e) => {
              setCustomTrack(e.target.files[0]);
              formik.handleChange(e);
            }}
          />
        </div>

        <button type="submit" className="customBtn secondaryCustomBtn mt-5">
          Add
        </button>
        <small className="createPlaylist__error">
          {formik.errors.name ||
            formik.errors.fakeTrack ||
            formik.errors.description ||
            formik.errors.playlist}
        </small>
      </form>
    </div>
  );
}
