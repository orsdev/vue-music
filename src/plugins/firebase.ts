import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPTpnsAPr2P6C1fNWvH86dtzlTPb2_ViU",

  authDomain: "vue-music-31319.firebaseapp.com",

  projectId: "vue-music-31319",

  storageBucket: "vue-music-31319.appspot.com",

  appId: "1:924958168417:web:e2ea6a42b5afc058206120",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const user_collection = db.collection("users");

export { auth, db, user_collection };