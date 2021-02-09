import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseKey = {
  apiKey: "AIzaSyDc3wZfSGOHscW6z452EpC9-6AqJmXQZN4",
  authDomain: "kenmo-reader.firebaseapp.com",
  projectId: "kenmo-reader",
  storageBucket: "kenmo-reader.appspot.com",
  messagingSenderId: "21439748687",
  appId: "1:21439748687:web:7fdb218fa694e7f8b9283a",
  measurementId: "G-5KSL2G6T5L"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseKey);
  }

const dbh = firebase.firestore();

export default dbh