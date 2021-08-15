import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5gefYW--QFVinOYQbGfI9aF2yIv4bOYI",
  authDomain: "clone-96799.firebaseapp.com",
  projectId: "clone-96799",
  storageBucket: "clone-96799.appspot.com",
  messagingSenderId: "553264525924",
  appId: "1:553264525924:web:d70f0f103774fcdf9b6571",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
