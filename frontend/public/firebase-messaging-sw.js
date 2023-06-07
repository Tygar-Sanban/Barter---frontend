importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyD8m9jOBA9E3ClgiscDD1hhKeqMu_8tCw0",
  authDomain: "barter-765cf.firebaseapp.com",
  projectId: "barter-765cf",
  storageBucket: "barter-765cf.appspot.com",
  messagingSenderId: "835521589628",
  appId: "1:835521589628:web:ead8154ce26f862c9af4f9",
  measurementId: "G-JC9GZXZ93Z",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
