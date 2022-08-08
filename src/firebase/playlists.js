import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
let playlistsRef = collection(db, "playlists");
//HANDLE: Get playlists
export let getAllPlaylists = async () => {
  let docs = await (await getDocs(playlistsRef)).docs;
  let playlists = docs.map((doc) => {
    return {
      ...doc.data(),
      playlist_id: doc.id,
    };
  });
  return playlists;
};
//HANDLE: add new playlist
export let addPlaylist = async (data, userId) => {
  let doc = await addDoc(playlistsRef, {
    ...data,
    userId,
  });
  return doc.id;
};
//HANDLE: get user's playlists
export let getUserPlaylists = async (userId) => {
  let q = query(playlistsRef, where("userId", "==", userId));
  let docs = await getDocs(q);
  let playlists = docs.docs.map((playlist) => playlist.data());
  return playlists;
};
//HANDLE: get playlist by name
export let getPlaylistByName = async (name) => {
  let q = query(playlistsRef, where("name", "==", name));
  let docs = await (await getDocs(q)).docs;
  return docs.map((doc) => {
    return {
      ...doc.data(),
      playlistID: doc.id,
    };
  });
};
//HANDLE: get playlist by Id
export let getPlaylistById = async (playlist_id) => {
  let docRef = doc(db, "playlists", playlist_id);
  let snapShot = await getDoc(docRef);
  return {
    ...snapShot.data(),
    playlist_ID: snapShot.id,
  };
};
//HANDLE: Add Track to playlist
export let addTrackToPlaylist = async (playlist_id, data) => {
  let docRef = doc(db, "playlists", playlist_id);
  await updateDoc(docRef, {
    tracks: arrayUnion({
      name: data.name,
      description: data.description,
      url: data.trackURL,
      comments: [],
    }),
  });
};
