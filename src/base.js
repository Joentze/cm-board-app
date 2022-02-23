import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArh4KGIvW0VyEFAYdg4EaS1qSeGLx8oZU",
  authDomain: "cos-fb.firebaseapp.com",
  projectId: "cos-fb",
  storageBucket: "cos-fb.appspot.com",
  messagingSenderId: "265524330915",
  appId: "1:265524330915:web:1555cd04c1420170961a16",
  measurementId: "G-CYQ84KEJTZ",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();
