import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var firebaseConfig = {
  apiKey: "AIzaSyBZcA-p_Niz4cGEyVxeqkc-xOpb_c2Ej3Q",
  authDomain: "tools-for-thought.firebaseapp.com",
  databaseURL: "https://tools-for-thought.firebaseio.com",
  projectId: "tools-for-thought",
  storageBucket: "tools-for-thought.appspot.com",
  messagingSenderId: "199638026850",
  appId: "1:199638026850:web:e95319ee93213434addf3b",
  measurementId: "G-0RQH88HJ0E"
};

firebase.initializeApp({
  apiKey: "AIzaSyBZcA-p_Niz4cGEyVxeqkc-xOpb_c2Ej3Q",
  authDomain: "tools-for-thought.firebaseapp.com",
  databaseURL: "https://tools-for-thought.firebaseio.com",
  projectId: "tools-for-thought",
  storageBucket: "tools-for-thought.appspot.com",
  messagingSenderId: "199638026850",
  appId: "1:199638026850:web:e95319ee93213434addf3b",
  measurementId: "G-0RQH88HJ0E"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
