import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDo7Djj6qWMpnrfMYSET8xPjFxBs0bitW0",
  authDomain: "doclone-f8e62.firebaseapp.com",
  projectId: "doclone-f8e62",
  storageBucket: "doclone-f8e62.appspot.com",
  messagingSenderId: "534729343062",
  appId: "1:534729343062:web:e9cf762f6d5e97c1083bf7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
