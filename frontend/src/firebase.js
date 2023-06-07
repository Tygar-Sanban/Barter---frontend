import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD8m9jOBA9E3ClgiscDD1hhKeqMu_8tCw0",
  authDomain: "barter-765cf.firebaseapp.com",
  projectId: "barter-765cf",
  storageBucket: "barter-765cf.appspot.com",
  messagingSenderId: "835521589628",
  appId: "1:835521589628:web:ead8154ce26f862c9af4f9",
  measurementId: "G-JC9GZXZ93Z",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BHuhnMmJUpeesPSXISnDnpLJDxe5CarfsxFODTpwsHAlx7XYHEYgBLmqJSMv8_XUaO6KapYh6bLqS5ZekqipKJ0",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
