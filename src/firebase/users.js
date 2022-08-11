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
} from "firebase/firestore";

let userRef = collection(db, "users");
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
