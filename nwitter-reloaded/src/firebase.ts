import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHb03V-OV7Ti-oUEL4QajlQzFzyIae4gY",
  authDomain: "nwitter-reloaded-942d4.firebaseapp.com",
  projectId: "nwitter-reloaded-942d4",
  storageBucket: "nwitter-reloaded-942d4.appspot.com",
  messagingSenderId: "315046805881",
  appId: "1:315046805881:web:58da6d81cf5f561429afa8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);