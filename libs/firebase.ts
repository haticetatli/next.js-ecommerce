// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSbVH60WDj6tujjXZLHzr1PimVcrxDMKk",
  authDomain: "tatlicom-d37b4.firebaseapp.com",
  projectId: "tatlicom-d37b4",
  storageBucket: "tatlicom-d37b4.firebasestorage.app",
  messagingSenderId: "543597338292",
  appId: "1:543597338292:web:73111e553b5cb159dd01e1",
  measurementId: "G-QELWPKFHG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;