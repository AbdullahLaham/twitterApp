// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcxpzuxqS7V2gGcren54B89z5Ht8OkTnI",
  authDomain: "challenge-63366.firebaseapp.com",
  projectId: "challenge-63366",
  storageBucket: "challenge-63366.appspot.com",
  messagingSenderId: "90758238522",
  appId: "1:90758238522:web:b23e140fe32e1d19024003",
  measurementId: "G-FR5RD8K334"
};
// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// database

//auth
const auth = getAuth(app);

export { app, auth };

