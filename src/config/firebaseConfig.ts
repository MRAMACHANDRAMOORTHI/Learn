// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);