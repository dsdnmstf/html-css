import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS7sL8ZLu8g-wz9s66xZvBeowi1O9vLEY",
  authDomain: "movieapp-inclass.firebaseapp.com",
  projectId: "movieapp-inclass",
  storageBucket: "movieapp-inclass.appspot.com",
  messagingSenderId: "923237506425",
  appId: "1:923237506425:web:524075ec4c93c0c0ad23a8",
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);

//!Initialize Firebase Authentication and get auth info
const auth = getAuth(app);
console.log(auth);

export const userStateChecker = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};
//! Sign Up with Google Provider
export const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

//!Logout
export const logOut = () => {
  signOut(auth);
};

//! Creating New User (Register)
export const createUser = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: displayName });
  } catch (error) {
    console.log(error);
  }
};

//!Sign in with email and password
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};