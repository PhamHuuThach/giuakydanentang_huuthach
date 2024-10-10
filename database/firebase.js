import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ8x2F8gmxaGU_B8E1RdzoNMTVj_n_Sz0",
  authDomain: "giuaky-9cceb.firebaseapp.com",
  projectId: "giuaky-9cceb",
  storageBucket: "giuaky-9cceb.appspot.com",
  messagingSenderId: "1002911272855",
  appId: "1:1002911272855:web:eabac15cea1caed82afed2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
