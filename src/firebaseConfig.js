import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Adicionado Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBkZo2pa8V5Jq6BfOWn2sbTraFPqb94h5U",
  authDomain: "unimove-f7712.firebaseapp.com",
  databaseURL: "https://unimove-f7712-default-rtdb.firebaseio.com/", // Adicionado Realtime Database URL
  projectId: "unimove-f7712",
  storageBucket: "unimove-f7712.appspot.com",
  messagingSenderId: "524858934679",
  appId: "1:524858934679:android:0fc72935942698f69eb0d2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app); // Inicializando o Realtime Database

export { auth, db, storage, database };
