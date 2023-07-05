import { firebase } from "./init";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebase);

export const loginWithGoogle = function () {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const logout = function () {
  return signOut(auth);
};

export const currentUserConnected = function () {
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};
