/** @format */

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyBZcA-p_Niz4cGEyVxeqkc-xOpb_c2Ej3Q",
	authDomain: "tools-for-thought.firebaseapp.com",
	databaseURL: "https://tools-for-thought.firebaseio.com",
	projectId: "tools-for-thought",
	storageBucket: "tools-for-thought.appspot.com",
	messagingSenderId: "199638026850",
	appId: "1:199638026850:web:e95319ee93213434addf3b",
	measurementId: "G-0RQH88HJ0E",
};

// Initialize Firebase
export const initializeFirebase = () => {
	firebase.initializeApp(firebaseConfig);
};
