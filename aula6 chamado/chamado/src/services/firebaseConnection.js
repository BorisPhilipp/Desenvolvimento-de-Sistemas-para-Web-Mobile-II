
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIUcvODPjHrYh0gwuUVGRNuya9mEhJ8mg",
  authDomain: "ticketsb-1e88c.firebaseapp.com",
  projectId: "ticketsb-1e88c",
  storageBucket: "ticketsb-1e88c.appspot.com",
  messagingSenderId: "880011276798",
  appId: "1:880011276798:web:25334c9c5fa8f9f84a10af"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };