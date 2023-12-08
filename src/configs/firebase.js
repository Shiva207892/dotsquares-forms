// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr1CKWw3AFWlUbPPwaASML--WX5qw5ZwA",
  authDomain: "dotsquares-forms.firebaseapp.com",
  projectId: "dotsquares-forms",
  storageBucket: "dotsquares-forms.appspot.com",
  messagingSenderId: "315021620291",
  appId: "1:315021620291:web:db38699fc1f9ec395b50f6",
  measurementId: "G-J52NTT69XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);