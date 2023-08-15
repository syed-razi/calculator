// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuRSLmj0hmznXwofM4fOSG2Q8cxT6ISAo",
  authDomain: "calculator-38df3.firebaseapp.com",
  projectId: "calculator-38df3",
  storageBucket: "calculator-38df3.appspot.com",
  messagingSenderId: "160077895089",
  appId: "1:160077895089:web:8664be77d08074fb125990",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
