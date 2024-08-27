import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAOY1QTsaOYCks0GGX97zJx7ABaCDhDj_Y",

  authDomain: "zapzap-b0767.firebaseapp.com",

  projectId: "zapzap-b0767",

  storageBucket: "zapzap-b0767.appspot.com",

  messagingSenderId: "313165574682",

  appId: "1:313165574682:web:ca34fb17d86caa56bb57a3",

  measurementId: "G-Y6L96N50QQ"

};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};