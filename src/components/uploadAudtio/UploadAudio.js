import React, { useState } from "react";
import { storage, db } from "./../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
export default function UploadAudio() {
  let [audioFile, setAudioFile] = useState({});
  let handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };
  let handleAddAudioFile = () => {
    let audioRef = ref(storage, `audio/user1/${audioFile.name}${v4()}`);
    uploadBytes(audioRef, audioFile).then((data) => {
      console.log(data);
      getDownloadURL(data.ref).then((audioUrl) => {
        let audioColl = collection(db, "audio");
        let docRef = doc(db, "audio", "fNi1O2ouQ0MSOFyn3HBK");
        updateDoc(docRef, {
          songs: arrayUnion({
            name: "Fares Abbad",
            category: "Quran",
            audioUrl: audioUrl,
          }),
        }).then(() => {
          console.log("Updated");
        });
      });
    });
  };
  return (
    <div>
      <h2>Upload Image</h2>
      <input
        type="file"
        name="audioFile"
        value={""}
        onChange={handleAudioFileChange}
      />
      <button type="button" onClick={handleAddAudioFile}>
        Add
      </button>
    </div>
  );
}
