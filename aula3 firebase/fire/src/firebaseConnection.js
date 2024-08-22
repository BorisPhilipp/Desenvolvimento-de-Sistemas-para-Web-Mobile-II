import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig ={
    apiKey: "AIzaSyBBzODWRtFbLdStRNwfpGDG43n_XkDDi44",
  authDomain: "capybara-firebase.firebaseapp.com",
  projectId: "capybara-firebase",
  storageBucket: "capybara-firebase.appspot.com",
  messagingSenderId: "379178745760",
  appId: "1:379178745760:web:f97f06b952a53191e22ec5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};