import { auth } from "./config";
import { signInWithEmailAndPassword } from "firebase/auth";
export let login = async (email, password) => {
  let logged = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("uID", logged.user.uid);
  return logged.user.uid;
};
