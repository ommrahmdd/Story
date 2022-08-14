import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export let userRef = collection(db, "users");
//HANDLE: login
export let login = async (email, password) => {
  let logged = await signInWithEmailAndPassword(auth, email, password);
  console.log(logged.user.uid);
  let q = query(userRef, where("userAuthId", "==", logged.user.uid));
  let users = await getDocs(q);
  let user = {
    ...users.docs[0].data(),
    userId: users.docs[0].id,
  };
  localStorage.setItem("uID", user.userId);
};
//HANDLE: logout
export let logout = async () => {
  let loggedOut = await signOut(auth);
  localStorage.removeItem("uID");
  return loggedOut;
};

//HANDLE: signup
export let signup = async (data) => {
  let userAuth = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  let user = await addDoc(userRef, {
    ...data,
    userAuthId: userAuth.user.uid,
  });
  localStorage.setItem("uID", user.id);
};
// HANDLE: get user by id
export let getUserById = async (userId) => {
  let docRef = doc(db, "users", userId);
  let userDoc = await getDoc(docRef);
  let userData = {
    _id: userDoc.id,
    ...userDoc.data(),
  };
  return userData;
};
// HANDLE: favorites
// HANDLE: add playlist to favorite
export let addPlaylistToFav = async (user_id, playlist_id) => {
  let docRef = doc(db, "users", user_id);
  await updateDoc(docRef, {
    fav_playlist: arrayUnion(playlist_id),
  });
};
// HANDLE: remove playlist from favorites
export let removePlaylistFromFav = async (user_id, playlist_id) => {
  let docRef = doc(db, "users", user_id);
  await updateDoc(docRef, {
    fav_playlist: arrayRemove(playlist_id),
  });
};

// HANDLE: add track to favorite
export let addTrackToFav = async (user_id, track_id) => {
  let docRef = doc(db, "users", user_id);
  await updateDoc(docRef, {
    fav_tracks: arrayUnion(track_id),
  });
};

// HANDLE: remove track from favorite
export let addRmoveTrackFromFav = async (type, user_id, track_id) => {
  let docRef = doc(db, "users", user_id);
  if (type == "add") {
    await updateDoc(docRef, {
      fav_tracks: arrayUnion(track_id),
    });
  } else if (type == "remove") {
    await updateDoc(docRef, {
      fav_tracks: arrayRemove(track_id),
    });
  }
};

// HANDLE: get user fav playlists
export let getUserFav = async (userId) => {
  let docRef = doc(db, "users", userId);
  let user = await getDoc(docRef);
  return {
    fav_playlist: user.data().fav_playlist,
    fav_tracks: user.data().fav_tracks,
  };
};
