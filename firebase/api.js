
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVFZhwOP_DrnLW_ST08BvzkXNvL8_OCh4",
  authDomain: "shopping-7f223.firebaseapp.com",
  projectId: "shopping-7f223",
  storageBucket: "shopping-7f223.appspot.com",
  messagingSenderId: "823943530552",
  appId: "1:823943530552:web:25d711066bfe3c81623ecd",
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc };
