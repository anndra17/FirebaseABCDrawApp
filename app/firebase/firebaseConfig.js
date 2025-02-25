// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgH9vfd5vdxc2vT9y6tqj_szSEsgIyxIw",
  authDomain: "abcdraw-ba71d.firebaseapp.com",
  projectId: "abcdraw-ba71d",
  storageBucket: "abcdraw-ba71d.firebasestorage.app",
  messagingSenderId: "67826128504",
  appId: "1:67826128504:web:3846e8ebccf819a5bb7f8d"
};

// Initialize Firebase
export default  app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
