// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa8bJzLQ5LRf3sRe-2OT5dAifaLXBVil8",
  authDomain: "cict-ecbf9.firebaseapp.com",
  projectId: "cict-ecbf9",
  storageBucket: "cict-ecbf9.firebasestorage.app",
  messagingSenderId: "1075774675451",
  appId: "1:1075774675451:web:c42ba6c86186b5168f135e",
  measurementId: "G-GE0FD5GBGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
