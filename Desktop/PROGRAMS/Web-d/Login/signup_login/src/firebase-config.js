import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCpxrnqWu9_h2osmTdpvDFgwLuwD0QfOZU",
  authDomain: "auth-trial0001.firebaseapp.com",
  projectId: "auth-trial0001",
  storageBucket: "auth-trial0001.appspot.com",
  messagingSenderId: "328473057687",
  appId: "1:328473057687:web:92482db05a0e519c228cd2",
  measurementId: "G-EXG7882CN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
