// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKjf468SKGo9xlkOWfSi5ncIbxSCSd1fE",
  authDomain: "arbazmurme-bfa87.firebaseapp.com",
  projectId: "arbazmurme-bfa87",
  storageBucket: "arbazmurme-bfa87.firebasestorage.app",
  messagingSenderId: "294116507824",
  appId: "1:294116507824:web:d0025b8a7ddac982417b75",
  measurementId: "G-KN5HZSR0SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);