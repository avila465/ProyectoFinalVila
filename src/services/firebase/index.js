import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBLUbIJNbX5F6YwtFg3C669L96mANvg9-4",
  authDomain: "ecommerce-react-61cd1.firebaseapp.com",
  projectId: "ecommerce-react-61cd1",
  storageBucket: "ecommerce-react-61cd1.appspot.com",
  messagingSenderId: "952372427252",
  appId: "1:952372427252:web:8bbddb8ca8873d2906e1a1"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
