// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsQHKzHjTqK1YtnQSnGiwSNUsxIR_VdcQ",
  authDomain: "falcon-246c0.firebaseapp.com",
  projectId: "falcon-246c0",
  storageBucket: "falcon-246c0.appspot.com",
  messagingSenderId: "402231017641",
  appId: "1:402231017641:web:03f16e8960576e8da669b8",
  measurementId: "G-LWNYG7W35T",
};

// Initialize Firebase connection between firbase and our project
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, storage };
