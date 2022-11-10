// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDZXZ_qgoPEan3JJH_cG8YWOiLlCC4CaQ",
  authDomain: "rentmyroom-dd7bf.firebaseapp.com",
  projectId: "rentmyroom-dd7bf",
  storageBucket: "rentmyroom-dd7bf.appspot.com",
  messagingSenderId: "171526397696",
  appId: "1:171526397696:web:10d565d3db465c24269de5",
  measurementId: "G-WW6WJ1LKZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);