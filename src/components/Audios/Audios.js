import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

export default function Audios() {
  let [audios, setAudios] = useState([]);

  useEffect(() => {
    let audioRef = collection(db, "audio");
    getDocs(audioRef).then((data) => {
      let docs = data.docs.map((song) => song.data());
      setAudios(docs);
    });
  }, []);
  return (
    <div>
      {audios &&
        audios.map((aud, index) =>
          aud.songs.map((singleSong, indexs) => (
            <audio src={singleSong.audioUrl} key={indexs} controls />
          ))
        )}
    </div>
  );
}
