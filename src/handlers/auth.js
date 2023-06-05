import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const FirebaseAuth = {
  signIn: () => {
    return new Promise((resolve) => {
      signInWithPopup(auth, provider)
        .then((responce) => resolve(responce.user))
        .catch(console.error);
    });
  },
  signOut: () => {
    return new Promise((resolve) => {
      signOut(auth)
        .then(() => {
          console.log("user logged out");
        })
        .catch(console.error);
    });
  },
  getCurrentUser: () => {
    return new Promise((resolve) => {
      return onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });
  },
};

export default FirebaseAuth;
