// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmStUCP8oCh7Cyw-qxS7DSSaeP5SNMgs4",
  authDomain: "samplefirebase-eaf8f.firebaseapp.com",
  projectId: "samplefirebase-eaf8f",
  storageBucket: "samplefirebase-eaf8f.firebasestorage.app",
  messagingSenderId: "564835739364",
  appId: "1:564835739364:web:6cf9002ca51895bdb3eef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app